import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state } from "meta3d-action-drop-glb-to-sceneview-protocol"
import { eventName, inputData } from "meta3d-action-drop-glb-to-sceneview-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { service as converterSceneViewService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getState, setState } from "./Utils"
import { List } from "immutable"
import { disposeGameObjectAndAllChildren } from "meta3d-dispose-utils/src/DisposeGameObjectUtils"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { service as loadGLBService } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { uiControlName as assetUIControlName } from "meta3d-ui-control-asset-protocol"
import { dropGlbUIData } from "meta3d-ui-control-scene-view-protocol"
import { GLTF } from "meta3d-load-scene-utils/src/three/GLTFLoader"
import { assertEqual, ensureCheck, test } from "meta3d-ts-contract-utils"

let _import = (meta3dState: meta3dState, api: api, gltf: GLTF) => {
    let data = api.getExtensionService<converterSceneViewService>(meta3dState, "meta3d-scenegraph-converter-three-sceneview-protocol").import(meta3dState, gltf.scene)
    meta3dState = data[0]
    let importedGameObjectForSceneView = data[1]

    data = api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").import(meta3dState, gltf.scene)
    meta3dState = data[0]
    let importedGameObjectForGameView = data[1]

    return ensureCheck([
        importedGameObjectForSceneView,
        importedGameObjectForGameView
    ], ([
        importedGameObjectForSceneView,
        importedGameObjectForGameView
    ]) => {
        test("imported gameObject should equal for both view", () => {
            return assertEqual(
                importedGameObjectForSceneView,
                importedGameObjectForGameView
            )
        })
    }, true)
}

export let getContribute: getContributeMeta3D<actionContribute<dropGlbUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, { fromUIControlName, data }) => {
                    if (fromUIControlName !== assetUIControlName) {
                        return Promise.resolve(meta3dState)
                    }

                    let glbId = data


                    let allGLBAssets = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").getAllGLBAssets(meta3dState)

                    if (allGLBAssets.length == 0) {
                        return Promise.resolve(meta3dState)
                    }

                    let [_glbId, _glbName, glb] = getExn(allGLBAssets.find((asset) => {
                        return asset[0] == glbId
                    }))

                    let { loadGlb } = api.getExtensionService<loadGLBService>(meta3dState, "meta3d-load-glb-protocol")

                    return loadGlb(meta3dState, glb)
                        .then((gltf) => {
                            let [importedGameObjectForSceneView, importedGameObjectForGameView] = _import(meta3dState, api, gltf)

                            let importedGameObject = importedGameObjectForSceneView

                            meta3dState = setElementStateField([
                                (elementState: any) => {
                                    let state = getState(elementState)

                                    return {
                                        ...state,
                                        importedGameObjects:
                                            state.importedGameObjects.push(importedGameObject)
                                    }
                                },
                                setState
                            ], meta3dState, api)

                            return meta3dState
                        })
                }, (meta3dState) => {
                    let {
                        importedGameObjects,
                    } = getActionState<state>(meta3dState, api, actionName)

                    if (isNullable(importedGameObjects.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let disposedGameObject = getExn(importedGameObjects.last())

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                importedGameObjects: state.importedGameObjects.pop()
                            }
                        },
                        setState
                    ], meta3dState, api)

                    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

                    meta3dState = disposeGameObjectAndAllChildren<engineWholeService>(meta3dState, engineWholeService, disposedGameObject)
                    meta3dState = disposeGameObjectAndAllChildren<engineWholeGameViewService>(meta3dState, engineWholeGameViewService, disposedGameObject)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [uiData]
                }))
            })
        },
        createState: () => {
            return {
                importedGameObjects: List(),
            }
        }
    }
}

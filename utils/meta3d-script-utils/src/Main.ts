import { api, state as meta3dState } from "meta3d-type"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as interactService } from "meta3d-interact-protocol/src/service/ServiceType"
import { flatten } from "meta3d-structure-utils/src/ArrayUtils"
import { gameObject } from "meta3d-gameobject-protocol"
import { api as scriptAPI, viewService } from "./type/APIType"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { service as webRenderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"
import { userData } from "meta3d-event-protocol/src/service/EventType.gen"

export let getErrorEventName = () => "meta3d_scriptErrorEvent"

let _eval = (value: string) => {
    return eval('(' + value + ')')
}

let _exec = (meta3dState: meta3dState, api: scriptAPI, eventFileStrData: Array<[gameObject, string]>, eventHandleName: string): Promise<meta3dState> => {
    let _func = (meta3dState: meta3dState, index: number) => {
        if (index >= eventFileStrData.length) {
            return Promise.resolve(meta3dState)
        }

        let [gameObject, eventFileStr] = eventFileStrData[index]

        try {
            return _eval(eventFileStr)[eventHandleName](meta3dState, api, gameObject).then((meta3dState: meta3dState) => {
                return _func(meta3dState, index + 1)
            })
        } catch (e) {
            // e.errorType = "script"

            // return new Promise((resolve, reject) => {
            //     reject(e)
            // })

            let { createCustomEvent, triggerCustomGlobalEvent3 } = api.getEventService(meta3dState)

            return triggerCustomGlobalEvent3(meta3dState, "meta3d-event-protocol",
                createCustomEvent(getErrorEventName(), api.nullable.return([e, eventHandleName] as any as userData))
            )
        }
    }

    return _func(meta3dState, 0)
}

let _buildScriptAPI = (api: api, viewService: viewService): scriptAPI => {
    return {
        getEngineSceneService: (meta3dState) => {
            return api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))
        },
        getEventService: (meta3dState) => {
            return api.nullable.getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))
        },
        getInteractService: (meta3dState) => {
            return api.nullable.getExn(api.getPackageService<interactService>(meta3dState, "meta3d-interact-protocol"))
        },
        view: viewService,
        nullable: api.nullable,
        immutable: api.immutable
    }
}

export let execEventHandle = (meta3dState: meta3dState, api: api, eventHandleName: string, viewService: viewService) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    let eventFileStrData = flatten(engineSceneService.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return engineSceneService.gameObject.hasScript(meta3dState, gameObject)
    }).map(gameObject => {
        return [gameObject, engineSceneService.gameObject.getScript(meta3dState, gameObject)]
    }).filter(([_, script]) => {
        return !api.nullable.isNullable(engineSceneService.script.getAllAssetData(meta3dState, script)) && api.nullable.getExn(engineSceneService.script.getAllAssetData(meta3dState, script)).length > 0
    }).map(([gameObject, script]) => {
        return api.nullable.getExn(engineSceneService.script.getAllAssetData(meta3dState, script)).map(assetData => {
            return [gameObject, assetData.eventFileStr] as [gameObject, string]
        })
    }))

    return _exec(meta3dState, _buildScriptAPI(api, viewService), eventFileStrData, eventHandleName)
}

export let getViewServiceForEditor = (meta3dState: meta3dState, api: api): viewService => {
    let { getViewRect, setSelectedObjects } = api.nullable.getExn(api.getPackageService<gameViewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol"))

    return { getViewRect, setSelectedObjects }
}

export let getViewServiceForEngine = (meta3dState: meta3dState, api: api): viewService => {
    let { getViewRect, setSelectedObjects } = api.nullable.getExn(api.getPackageService<webRenderService>(meta3dState, "meta3d-engine-web-render-protocol"))

    return { getViewRect, setSelectedObjects }
}
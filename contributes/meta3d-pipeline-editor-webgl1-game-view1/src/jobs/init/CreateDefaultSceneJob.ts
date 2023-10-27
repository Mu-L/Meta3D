import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType";
import { service as engineWholeService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { addDefaultGameObjects, createUnUseGameObjectsForGameViewForUnifyGameObject } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils"
import { activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"

type canvasSize = [number, number]

let _addDefaultGameObjects = (meta3dState: meta3dState, engineWholeService: engineWholeService,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    canvasSize: canvasSize
): meta3dState => {
    // TODO not use arcball
    let data = addDefaultGameObjects<engineWholeService>(meta3dState, engineWholeService, canvasSize)
    meta3dState = data[0]

    meta3dState = createUnUseGameObjectsForGameViewForUnifyGameObject(meta3dState, engineWholeService)

    meta3dState = activeFirstBasicCameraView(meta3dState, engineWholeService)

    return meta3dState
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService,
        // eventService,
        canvas
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("update job");


        meta3dState = _addDefaultGameObjects(meta3dState, engineWholeService,
            // eventService,
            // "meta3d-event-protocol",
            [canvas.width, canvas.height]
        )

        return meta3dState
    })
}
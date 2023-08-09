import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getRenderer, getState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/StateType";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("reset job");

        let renderer = getRenderer(states)
        renderer.resetState()

        return meta3dState
    })
}
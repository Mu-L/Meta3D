import { state, states, pipelineName } from "meta3d-pipeline-editor-webgl1-scene-view1-three-protocol/src/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { pipelineName as threePipelineName, state as threeState } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"

export function getState(states: states): state {
    return states[pipelineName]
}

export function setState(states: states, state: state): states {
    return Object.assign({}, states, {
        [pipelineName]: state
    });
}

export function getRenderer(states: states) {
    return getExn(states[threePipelineName].renderer)
}

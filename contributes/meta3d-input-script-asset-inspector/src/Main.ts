import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { data } from "meta3d-input-window-protocol"
import { inputContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { isSelectScriptAssetNode } from "meta3d-select-inspector-node-utils/src/Main"

export let getContribute: getContributeMeta3D<inputContribute<data>> = (api) => {
    return {
        inputName: "ScriptAssetInspectorInput",
        func: (meta3dState) => {
            return Promise.resolve(isSelectScriptAssetNode(meta3dState, api))
        }
    }
}

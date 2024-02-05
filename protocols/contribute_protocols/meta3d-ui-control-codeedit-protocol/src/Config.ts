import {

    getUIControlSpecificDataFields as getUIControlSpecificDataFieldsMeta3D,
    hasChildren as hasChildrenMeta3D,
    getUIControlSupportedEventNames as getUIControlSupportedEventNamesMeta3D, generateHandleUIControlEventStr as generateHandleUIControlEventStrMeta3D
} from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { isNullable } from "meta3d-commonlib-ts/src/NullableUtils"



export let getUIControlSpecificDataFields: getUIControlSpecificDataFieldsMeta3D = () => [
    {
        name: "label",
        type_: "string",
        value: "代码编辑"
    },
    {
        name: "initialCode",
        type_: "string",
        value: ""
    }
]

export let hasChildren: hasChildrenMeta3D = () => false

export let getUIControlSupportedEventNames: getUIControlSupportedEventNamesMeta3D = () => ["codeedit_submit"]

export let generateHandleUIControlEventStr: generateHandleUIControlEventStrMeta3D = ([submitActionName]) => {
    if (!isNullable(submitActionName)) {
        return `
                if (!api.nullable.isNullable(data[1])) {
                    let { trigger } = api.getExtensionService(meta3dState, "meta3d-event-protocol")

                    return trigger(meta3dState, "meta3d-event-protocol", "${submitActionName}", api.nullable.getExn(data[1]))
                }
                `
    }

    return ""
}
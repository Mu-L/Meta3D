import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-close-select-script-asset-modal-protocol"
import { eventName, inputData } from "meta3d-action-close-select-script-asset-modal-protocol/src/EventType"
import { eventName as openEventName, backwardEventName as closeEventName } from "meta3d-action-operate-select-script-asset-modal-protocol/src/EventType"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, meta3dState => {
                    let { createCustomEvent, triggerCustomGlobalEvent2 } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    return Promise.resolve(triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        createCustomEvent(closeEventName, null)
                    ))
                }, (meta3dState) => {
                    let { createCustomEvent, triggerCustomGlobalEvent2 } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                    return Promise.resolve(triggerCustomGlobalEvent2(meta3dState, "meta3d-event-protocol",
                        createCustomEvent(openEventName, null)
                    ))
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })
        },
        createState: (meta3dState) => {
            return null
        }
    }
}

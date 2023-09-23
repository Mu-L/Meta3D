import { service as eventSourcingService } from "./EventSourcing"
import { createMeta3dState } from "./Meta3dState"
import { push, undo } from "./RedoUndo"
import { eventData, eventName, export_eventData_event_inputData, export_eventData_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

// declare function exportEventData(allEventData): eventData
export declare function exportEventData(allEvents): void

declare function generateSceneGlb(meta3dState): ArrayBuffer

declare function generateWholeAggregate(sceneGlb, allOutsideData): ArrayBuffer

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            export_eventData_event_inputData,
            export_eventData_event_outputData
        >(meta3dState, eventName.export_eventData_event, (meta3dState, { isReset }) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            let allEvents
            if (!isReset) {
                // eventData = exportEventData(
                //     eventSourcingService.sliceEvent(
                //         eventSourcingService.getAllEvents(meta3dState),
                //         eventName.finish_init_event,
                //         null
                //     )
                // )
                allEvents = eventSourcingService.getAllEvents(meta3dState)
            }
            else {
                // eventData = exportEventData(
                //     eventSourcingService.getAllEvents(
                //         eventSourcingService.addEvent(
                //             createMeta3dState(),
                //             {
                //                 name: eventName.import_wholeAggregate_event,
                //                 inputData: [
                //                     generateWholeAggregate(
                //                         generateSceneGlb(meta3dState),
                //                         eventSourcingService.getAllOutsideData(meta3dState)
                //                     )
                //                 ]
                //             }
                //         )
                //     )
                // )
                allEvents = [
                    {
                        name: eventName.import_wholeAggregate_event,
                        inputData: [
                            generateWholeAggregate(
                                generateSceneGlb(meta3dState),
                                eventSourcingService.getAllOutsideData(meta3dState)
                            )
                        ]
                    }
                ]
            }

            exportEventData(allEvents)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }, (meta3dState) => {
            return new Promise((resolve) => {
                resolve(undo(meta3dState))
            })
        }
        )
    },
    exportEventData: exportEventData
}
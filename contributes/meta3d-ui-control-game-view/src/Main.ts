import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, inputFunc, specificData, outputData } from "meta3d-ui-control-game-view-protocol"
import { changeToStrictlyNull, getFBORect } from "meta3d-ui-control-view-utils/src/Main"
import { uiControlContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            rect,
            {
                label,
            }
        ) => {
            let { ui, getPluggablePackageService } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
            let { beginWindow, endWindow, beginChild, endChild, setNextWindowRect, getFBOTexture, addFBOTexture,
                getWindowBarHeight,
                // setUIControlState,
                handleDragDropTarget
            } = ui(meta3dState)


            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label, windowFlags.NoTitleBar)


            // let fboRect = getFBORect(rect, getWindowBarHeight(meta3dState))
            let fboRect = getFBORect(rect, 0)
            // fboRect = {
            //     x: fboRect.x - 2,
            //     y: fboRect.y - 2,
            //     width: fboRect.width + 4,
            //     height: fboRect.height
            // }


            meta3dState = addFBOTexture(meta3dState, changeToStrictlyNull(getFBOTexture, meta3dState, textureID), fboRect)


            meta3dState = endWindow(meta3dState)



            meta3dState = api.nullable.getWithDefault(
                api.nullable.map((renderService) => {
                    return renderService.setViewRect(meta3dState, fboRect)
                }, getPluggablePackageService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol")),
                meta3dState
            )


            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}

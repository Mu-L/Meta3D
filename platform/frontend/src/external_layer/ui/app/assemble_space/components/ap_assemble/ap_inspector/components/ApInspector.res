open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let setIsDebug = (dispatch, isDebug) => {
    dispatch(ApAssembleStoreType.SetIsDebug(isDebug->BoolUtils.stringToBool))
  }

  let setClearColorR = (dispatch, (_, g, b, a), r) => {
    dispatch(ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let setClearColorG = (dispatch, (r, _, b, a), g) => {
    dispatch(ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let setClearColorB = (dispatch, (r, g, _, a), b) => {
    dispatch(ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let setClearColorA = (dispatch, (r, g, b, _), a) => {
    dispatch(ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let buildClearColorField = (dispatch, setClearColorField, clearColor, clearColorField) => {
    <>
      <InputNumber
        value={clearColorField}
        step="0.001"
        min=0.0
        max=1.0
        stringMode=true
        onChange={value => {
          setClearColorField(dispatch, clearColor, value)
        }}
      />
    </>
  }

  let setSkinName = (dispatch, skinName) => {
    SelectUtils.isEmptySelectOptionValue(skinName)
      ? dispatch(ApAssembleStoreType.SetSkinName(None))
      : {
          dispatch(ApAssembleStoreType.SetSkinName(skinName->Some))
        }
  }

  let useSelector = (
    {
      selectedContributes,
      isShowApInspector,
      apInspectorData,
    }: ApAssembleStoreType.state,
  ) => {
    (isShowApInspector, selectedContributes, apInspectorData)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (
    isShowApInspector,
    selectedContributes,
    apInspectorData,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let {isDebug, clearColor, skinName} = apInspectorData

  let (r, g, b, a) = clearColor

  isShowApInspector
    ? <Space direction=#vertical size=#middle>
        {service.ui.buildTitle(. ~level=2, ~children={React.string(`IsDebug`)}, ())}
        {SelectUtils.buildSelect(
          Method.setIsDebug(dispatch),
          isDebug->BoolUtils.boolToString,
          ["true", "false"],
        )}
        {service.ui.buildTitle(. ~level=2, ~children={React.string(`ClearColor`)}, ())}
        <Space direction=#horizontal wrap=true>
          {Method.buildClearColorField(dispatch, Method.setClearColorR, clearColor, r)}
          {Method.buildClearColorField(dispatch, Method.setClearColorG, clearColor, g)}
          {Method.buildClearColorField(dispatch, Method.setClearColorB, clearColor, b)}
          {Method.buildClearColorField(dispatch, Method.setClearColorA, clearColor, a)}
        </Space>
        {service.ui.buildTitle(. ~level=2, ~children={React.string(`Skin`)}, ())}
        {SelectUtils.buildSelect(
          Method.setSkinName(dispatch),
          skinName->Meta3dCommonlib.OptionSt.getWithDefault(
            SelectUtils.buildEmptySelectOptionValue(),
          ),
          selectedContributes
          ->SelectedContributesForElementUtils.getSkins
          ->Meta3dCommonlib.ListSt.toArray
          ->Meta3dCommonlib.ArraySt.map(({data}) => {
            (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["skinName"]
          }),
        )}
      </Space>
    : React.null
}

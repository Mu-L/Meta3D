open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectExtension = (dispatch, protocolIconBase64, _, _, _, protocolConfigStr, extension) => {
    dispatch(
      ApAssembleStoreType.SelectExtension(
        protocolIconBase64,
        protocolConfigStr,
        extension,
      ),
    )
  }

  let useSelector = ({selectedExtensions}: ApAssembleStoreType.state) => {
    selectedExtensions
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromMarket: selectedExtensionsFromMarket) => {
  <ExtensionsUtils
    service
    selectedExtensionsFromMarket
    selectedExtensionNames={ReduxUtils.ApAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({data}) => data.extensionPackageData.name)}
    useDispatch=ReduxUtils.ApAssemble.useDispatch
    selectExtension=Method.selectExtension
  />
}

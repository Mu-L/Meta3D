let getItems = (
  (
    getProtocolFunc,
    getDisplayNameFromResultDataFunc,
    getDisplayNameFromItemFunc,
    getPushedDataFunc,
  ),
  protocols: array<FrontendUtils.BackendCloudbaseType.protocol>,
  selectedItemsFromMarket,
) => {
  protocols
  ->Meta3dCommonlib.ArraySt.sort((a, b) => {
    Meta3d.Semver.gt(a.version, b.version) ? 1 : -1
  })
  ->Meta3dCommonlib.Log.printForDebug
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. result, protocol: FrontendUtils.BackendCloudbaseType.protocol) => {
      let {name, iconBase64, version} = protocol

      selectedItemsFromMarket
      ->Meta3dCommonlib.ListSt.filter(((item, _)) => {
        let protocol: Meta3d.ExtensionFileType.contributeProtocolData = getProtocolFunc(item)

        protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
      })
      ->Meta3dCommonlib.Log.printForDebug
      ->Meta3dCommonlib.ListSt.reduce(result, (result, (item, protocolConfig)) => {
        result->Meta3dCommonlib.ArraySt.includesByFunc(
          data => {
            getDisplayNameFromResultDataFunc(data) == getDisplayNameFromItemFunc(item)
          },
        )
          ? result
          : result->Meta3dCommonlib.ArraySt.push(getPushedDataFunc(item, protocol, protocolConfig))
      })
    },
    [],
  )
}

let getProtocolConfigStr = protocolConfig => {
  protocolConfig->Meta3dCommonlib.OptionSt.map((
    {configStr}: FrontendUtils.CommonType.protocolConfig,
  ) => configStr)
}
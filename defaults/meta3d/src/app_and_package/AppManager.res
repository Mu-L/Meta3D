open Js.Typed_array

open AppAndPackageFileType

let convertAllFileData = (
  allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  allContributeFileData: array<ExtensionFileType.contributeFileData>,
  // allPackageEntryExtensionProtocolData: array<ExtensionFileType.extensionProtocolData>,
  // TODO change to startExtensionProtocolNames
  startExtensionNames: array<Meta3dType.Index.extensionName>,
) => {
  // ManagerUtils.convertAllFileData(
  //   allExtensionFileData,
  //   allContributeFileData,
  //   allPackageEntryExtensionProtocolData,
  //   (allExtensionNewNames, (startExtensionNames, []), allContributeNewNames),
  // )
  // TODO check:allExtensionNewNames.length == allExtensionFileData.length
  // TODO check:allContributeNewNames.length == allContributeFileData.length

  (
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData, extensionFuncData}, i) => {
        // let newName = allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: extensionPackageData.name,
              version: extensionPackageData.version,
              account: extensionPackageData.account,
              displayName: extensionPackageData.displayName,
              repoLink: extensionPackageData.repoLink,
              description: extensionPackageData.description,
              protocol: extensionPackageData.protocol,
              type_: startExtensionNames->Meta3dCommonlib.ArraySt.includes(
                extensionPackageData.name,
              )
                ? Start
                : Default,
              dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
            }: extensionPackageData
          ),
          extensionFuncData,
        ))
      },
      [],
    ),
    allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData, contributeFuncData}, i) => {
        // let newName = allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: contributePackageData.name,
              version: contributePackageData.version,
              account: contributePackageData.account,
              displayName: contributePackageData.displayName,
              repoLink: contributePackageData.repoLink,
              description: contributePackageData.description,
              protocol: contributePackageData.protocol,
              dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
            }: contributePackageData
          ),
          contributeFuncData,
        ))
      },
      [],
    ),
  )
}

let generate = (
  (allExtensionFileData, allContributeFileData),
  allPackageBinaryFiles,
  configData: Js.Nullable.t<Meta3dType.Index.startConfigData>,
) => {
  let encoder = TextEncoder.newTextEncoder()

  ManagerUtils.generate((allExtensionFileData, allContributeFileData))
  ->ManagerUtils.mergeAllPackageBinaryFiles(allPackageBinaryFiles)
  ->Meta3dCommonlib.ArraySt.push(
    TextEncoder.encodeUint8Array(
      configData
      ->Obj.magic
      ->Meta3dCommonlib.NullableSt.getWithDefault([])
      ->Obj.magic
      ->Js.Json.stringify,
      encoder,
    ),
  )
  ->BinaryFileOperator.generate
}

let getExtensionFuncDataStr = extensionFuncData => {
  ManagerUtils.getExtensionFuncDataStr(TextDecoder.newTextDecoder("utf-8"), extensionFuncData)
}

let getExtensionFuncData = extensionFuncDataStr => {
  ManagerUtils.getExtensionFuncData(TextEncoder.newTextEncoder(), extensionFuncDataStr)
}

let getContributeFuncDataStr = contributeFuncData => {
  ManagerUtils.getContributeFuncDataStr(TextDecoder.newTextDecoder("utf-8"), contributeFuncData)
}

let getContributeFuncData = contributeFuncDataStr => {
  ManagerUtils.getContributeFuncData(TextEncoder.newTextEncoder(), contributeFuncDataStr)
}

let execGetContributeFunc = (~contributeFuncData, ()) => {
  (
    ManagerUtils.getContributeFunc(
      contributeFuncData,
      TextDecoder.newTextDecoder("utf-8"),
    )->Obj.magic
  )(ExtensionManager.buildAPI())
}

let load = (appBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<extensionFileData>,
  Meta3dType.Index.startConfigData,
) => {
  let [
    allExtensionBinaryUint8File,
    allContributeBinaryUint8File,
    configData,
  ] = BinaryFileOperator.load(appBinaryFile)

  let decoder = TextDecoder.newTextDecoder("utf-8")

  let (state, allExtensionDataArr) = ManagerUtils.load([
    allExtensionBinaryUint8File,
    allContributeBinaryUint8File,
  ])

  (
    state,
    allExtensionDataArr,
    TextDecoder.decodeUint8Array(configData, decoder)
    ->FileUtils.removeAlignedEmptyChars
    ->Js.Json.parseExn
    ->Obj.magic,
  )
}

let _getStartExtensionProtocolName = (
  allExtensionDataArr
): Meta3dType.Index.extensionProtocolName => {
  switch allExtensionDataArr->Meta3dCommonlib.ArraySt.filter(({extensionPackageData}) => {
    extensionPackageData.type_ === Start
  }) {
  | startExtensions if startExtensions->Meta3dCommonlib.ArraySt.length !== 1 =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title="should only has one type extension",
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  | startExtensions => startExtensions[0].extensionPackageData.protocol.name
  }
}

let start = ((state, allExtensionDataArr, configData)): unit => {
  state->ExtensionManager.startExtension(
    _getStartExtensionProtocolName(allExtensionDataArr),
    configData,
  )
}

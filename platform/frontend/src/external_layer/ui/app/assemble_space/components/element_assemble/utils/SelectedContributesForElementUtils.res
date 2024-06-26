// let _getContributes = (
//   names,
//   contributeType,
// ) => {
//   // selectedContributes->Meta3dCommonlib.ListSt.filter(({data}) => {
//   //   data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
//   //     contributeType
//   // })
// }

let _getContributes = (
  selectedContributes: ApAssembleStoreType.selectedContributes,
  contributeType,
) => {
  selectedContributes->Meta3dCommonlib.ListSt.filter(({data}) => {
    data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
      contributeType
  })
}

let getUIControls = _getContributes(_, Meta3dType.ContributeType.UIControl)

let getActions = _getContributes(_, Meta3dType.ContributeType.Action)

let getElements = _getContributes(_, Meta3dType.ContributeType.Element)

let getSkins = _getContributes(_, Meta3dType.ContributeType.Skin)

let getInputs = _getContributes(_, Meta3dType.ContributeType.Input)

let hasUIControl = (
  selectedContributes: array<PackageAssembleStoreType.contribute>,
) => {
  selectedContributes->Meta3dCommonlib.ArraySt.includesByFunc(({data}) => {
    data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
      Meta3dType.ContributeType.UIControl
  })
}

let hasAction = (selectedContributes: array<PackageAssembleStoreType.contribute>) => {
  selectedContributes->Meta3dCommonlib.ArraySt.includesByFunc(({data}) => {
    data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
      Meta3dType.ContributeType.Action
  })
}

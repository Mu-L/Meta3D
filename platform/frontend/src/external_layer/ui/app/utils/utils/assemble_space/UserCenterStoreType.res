type id = AssembleSpaceCommonType.id

type extension = AssembleSpaceCommonType.extension

type selectedExtensions = list<AssembleSpaceCommonType.extensionData>

type contribute = AssembleSpaceCommonType.contribute

type selectedContributes = list<AssembleSpaceCommonType.contributeData>

type packageData = AssembleSpaceCommonType.packageData

type selectedPackages = list<packageData>

type selectedElements = list<BackendCloudbaseType.elementAssembleData>

// type customData = list<BackendCloudbaseType.elementAssembleData>

// type customInput = AssembleSpaceCommonType.customInput

// type customInputs = list<AssembleSpaceCommonType.customInput>

// type customAction = AssembleSpaceCommonType.customAction

// type customActions = list<AssembleSpaceCommonType.customAction>

type account = string

type name = string

type appName = string

type action =
  | SelectExtension(extension, option<CommonType.protocolConfig>)
  | NotSelectExtension(name, AssembleSpaceCommonType.version)
  | SelectContribute(contribute, option<CommonType.protocolConfig>)
  | NotSelectContribute(name, AssembleSpaceCommonType.version)
  | SelectPackage(packageData)
  // | NotSelectPackage(id)
  | NotSelectPackage(name, AssembleSpaceCommonType.version)
  | SelectElement(BackendCloudbaseType.elementAssembleData)
  | NotSelectElement(BackendCloudbaseType.elementName, BackendCloudbaseType.elementVersion)
  | SelectAllElements(list<BackendCloudbaseType.elementAssembleData>)
  // | SetCustomData(customInputs, customActions)
  | SetAccount(account)
  | ImportPackage(id, selectedExtensions, selectedContributes, selectedPackages)
  | ImportApp(id, appName, selectedExtensions, selectedContributes, selectedPackages)
  | UpdateSelectedPackagesAndExtensionsAndContributes(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    ) // selectedElements,
  | SetContributes(selectedContributes)
  | SelectAllUIControls(selectedContributes)
  | SetPackages(selectedPackages)
  | SetCurrentAppName(appName)
  | Reset

type state = {
  account: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  selectedPackages: selectedPackages,
  selectedElements: selectedElements,
  importedPackageIds: list<id>,
  // importedAppIds: list<id>,
  currentAppName: option<appName>,
  // customInputs: customInputs,
  // customActions: customActions,
}
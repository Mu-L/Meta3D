let registerExtension = ExtensionManager.registerExtension

let initExtension = ExtensionManager.initExtension

let updateExtension = ExtensionManager.updateExtension

let getExtensionService = ExtensionManager.getExtensionServiceExn

let setExtensionState = ExtensionManager.setExtensionState

let getExtensionState = ExtensionManager.getExtensionStateExn

let getPackageService = ExtensionManager.getPackageService

let registerContribute = ExtensionManager.registerContribute

let getContribute = ExtensionManager.getContributeExn

let startExtension = ExtensionManager.startExtension

let generateExtension = ExtensionFileManager.generateExtension

let loadExtension = ExtensionFileManager.loadExtension

let generateContribute = ExtensionFileManager.generateContribute

let loadContribute = ExtensionFileManager.loadContribute

let convertAllFileDataForApp = AppManager.convertAllFileData

let convertAllFileDataForPackage = PackageManager.convertAllFileData

let generateApp = AppManager.generate

let generatePackage = PackageManager.generate

let loadApp = AppManager.load

let loadPackage = PackageManager.load

let getAllDataOfPackage = PackageManager.getAllDataOfPackage

let getAllDataOfApp = AppManager.getAllDataOfApp

let startApp = AppManager.start

let execGetContributeFunc = AppManager.execGetContributeFunc

let getExtensionFuncDataStr = AppManager.getExtensionFuncDataStr

let getExtensionFuncData = AppManager.getExtensionFuncData

let getContributeFuncDataStr = AppManager.getContributeFuncDataStr

let convertContributeFuncData = ManagerUtils.convertContributeFuncData

let getContributeFuncData = AppManager.getContributeFuncData

let serializeUIControlProtocolConfigLib = UIControlProtocolConfig.serializeLib

let getUIControlSpecificDataFields = UIControlProtocolConfig.getUIControlSpecificDataFields

let hasChildren = UIControlProtocolConfig.hasChildren

let getUIControlSupportedEventNames = UIControlProtocolConfig.getUIControlSupportedEventNames

let generateHandleUIControlEventStr = UIControlProtocolConfig.generateHandleUIControlEventStr

let serializeStartPackageProtocolConfigLib = StartPackageProtocolConfig.serializeLib

let getNeedConfigData = StartPackageProtocolConfig.getNeedConfigData

let restore = ExtensionManager.restore

let deepCopy = ExtensionManager.deepCopy

let buildAPI = ExtensionManager.buildAPI

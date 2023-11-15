'use strict';

var AppManager$Meta3d = require("./app_and_package/AppManager.bs.js");
var PackageManager$Meta3d = require("./app_and_package/PackageManager.bs.js");
var ExtensionManager$Meta3d = require("./ExtensionManager.bs.js");
var ExtensionFileManager$Meta3d = require("./file/ExtensionFileManager.bs.js");
var UIControlProtocolConfig$Meta3d = require("./contribute_protocol_config/UIControlProtocolConfig.bs.js");
var StartPackageProtocolConfig$Meta3d = require("./package_protocol_config/StartPackageProtocolConfig.bs.js");

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var initExtension = ExtensionManager$Meta3d.initExtension;

var updateExtension = ExtensionManager$Meta3d.updateExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var getPackageService = ExtensionManager$Meta3d.getPackageService;

var registerContribute = ExtensionManager$Meta3d.registerContribute;

var getContribute = ExtensionManager$Meta3d.getContributeExn;

var startExtension = ExtensionManager$Meta3d.startExtension;

var generateExtension = ExtensionFileManager$Meta3d.generateExtension;

var loadExtension = ExtensionFileManager$Meta3d.loadExtension;

var generateContribute = ExtensionFileManager$Meta3d.generateContribute;

var loadContribute = ExtensionFileManager$Meta3d.loadContribute;

var convertAllFileDataForApp = AppManager$Meta3d.convertAllFileData;

var convertAllFileDataForPackage = PackageManager$Meta3d.convertAllFileData;

var generateApp = AppManager$Meta3d.generate;

var generatePackage = PackageManager$Meta3d.generate;

var loadApp = AppManager$Meta3d.load;

var loadPackage = PackageManager$Meta3d.load;

var getAllDataOfPackage = PackageManager$Meta3d.getAllDataOfPackage;

var getAllDataOfApp = AppManager$Meta3d.getAllDataOfApp;

var startApp = AppManager$Meta3d.start;

var execGetContributeFunc = AppManager$Meta3d.execGetContributeFunc;

var getExtensionFuncDataStr = AppManager$Meta3d.getExtensionFuncDataStr;

var getExtensionFuncData = AppManager$Meta3d.getExtensionFuncData;

var getContributeFuncDataStr = AppManager$Meta3d.getContributeFuncDataStr;

var getContributeFuncData = AppManager$Meta3d.getContributeFuncData;

var serializeUIControlProtocolConfigLib = UIControlProtocolConfig$Meta3d.serializeLib;

var generateUIControlCommonDataStr = UIControlProtocolConfig$Meta3d.generateUIControlCommonDataStr;

var getUIControlSpecificDataFields = UIControlProtocolConfig$Meta3d.getUIControlSpecificDataFields;

var hasChildren = UIControlProtocolConfig$Meta3d.hasChildren;

var getUIControlSupportedEventNames = UIControlProtocolConfig$Meta3d.getUIControlSupportedEventNames;

var generateHandleUIControlEventStr = UIControlProtocolConfig$Meta3d.generateHandleUIControlEventStr;

var serializeStartPackageProtocolConfigLib = StartPackageProtocolConfig$Meta3d.serializeLib;

var getNeedConfigData = StartPackageProtocolConfig$Meta3d.getNeedConfigData;

var restore = ExtensionManager$Meta3d.restore;

var deepCopy = ExtensionManager$Meta3d.deepCopy;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

exports.registerExtension = registerExtension;
exports.initExtension = initExtension;
exports.updateExtension = updateExtension;
exports.getExtensionService = getExtensionService;
exports.setExtensionState = setExtensionState;
exports.getExtensionState = getExtensionState;
exports.getPackageService = getPackageService;
exports.registerContribute = registerContribute;
exports.getContribute = getContribute;
exports.startExtension = startExtension;
exports.generateExtension = generateExtension;
exports.loadExtension = loadExtension;
exports.generateContribute = generateContribute;
exports.loadContribute = loadContribute;
exports.convertAllFileDataForApp = convertAllFileDataForApp;
exports.convertAllFileDataForPackage = convertAllFileDataForPackage;
exports.generateApp = generateApp;
exports.generatePackage = generatePackage;
exports.loadApp = loadApp;
exports.loadPackage = loadPackage;
exports.getAllDataOfPackage = getAllDataOfPackage;
exports.getAllDataOfApp = getAllDataOfApp;
exports.startApp = startApp;
exports.execGetContributeFunc = execGetContributeFunc;
exports.getExtensionFuncDataStr = getExtensionFuncDataStr;
exports.getExtensionFuncData = getExtensionFuncData;
exports.getContributeFuncDataStr = getContributeFuncDataStr;
exports.getContributeFuncData = getContributeFuncData;
exports.serializeUIControlProtocolConfigLib = serializeUIControlProtocolConfigLib;
exports.generateUIControlCommonDataStr = generateUIControlCommonDataStr;
exports.getUIControlSpecificDataFields = getUIControlSpecificDataFields;
exports.hasChildren = hasChildren;
exports.getUIControlSupportedEventNames = getUIControlSupportedEventNames;
exports.generateHandleUIControlEventStr = generateHandleUIControlEventStr;
exports.serializeStartPackageProtocolConfigLib = serializeStartPackageProtocolConfigLib;
exports.getNeedConfigData = getNeedConfigData;
exports.restore = restore;
exports.deepCopy = deepCopy;
exports.buildAPI = buildAPI;
/* AppManager-Meta3d Not a pure module */

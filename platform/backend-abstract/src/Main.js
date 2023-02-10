"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = exports.publishPackage = exports.publishElementContribute = exports.publishElementAssembleData = exports.getElementAssembleData = exports.getAllPublishNewestData = exports.findAllPublishApps = exports.findAllPublishAppsByAccount = exports.findPublishApp = exports.publishApp = exports.findPublishImplement = exports.getAllPublishImplementInfo = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolData = exports.isLoginSuccess = exports.registerUser = exports.checkUserName = exports.handleLoginForWeb3 = exports.init = void 0;
const MarketService = require("./application_layer/market/MarketService");
const LoginService = require("./application_layer/user/LoginService");
const PublishAppService = require("./application_layer/publish/PublishAppService");
const GetElementDataService = require("./application_layer/assemble_space/element_assemble/GetElementDataService");
const PublishElementContributeService = require("./application_layer/assemble_space/element_assemble/PublishElementContributeService");
const PublishPackageService = require("./application_layer/publish/PublishPackageService");
const PackageMarketService = require("./application_layer/market/PackageMarketService");
let init = (init, env) => init(env);
exports.init = init;
let handleLoginForWeb3 = (handleLoginForWeb3, account) => handleLoginForWeb3(account);
exports.handleLoginForWeb3 = handleLoginForWeb3;
let checkUserName = (checkUserName, account) => checkUserName(account);
exports.checkUserName = checkUserName;
let registerUser = (registerUser, account) => registerUser(account);
exports.registerUser = registerUser;
exports.isLoginSuccess = LoginService.isLoginSuccess;
exports.getAllPublishProtocolData = MarketService.getAllPublishProtocolData;
exports.getAllPublishProtocolConfigData = MarketService.getAllPublishProtocolConfigData;
exports.getAllPublishImplementInfo = MarketService.getAllPublishImplementInfo;
exports.findPublishImplement = MarketService.findPublishImplement;
exports.publishApp = PublishAppService.publish;
exports.findPublishApp = PublishAppService.findPublishApp;
exports.findAllPublishAppsByAccount = PublishAppService.findAllPublishAppsByAccount;
exports.findAllPublishApps = PublishAppService.findAllPublishApps;
exports.getAllPublishNewestData = GetElementDataService.getAllPublishNewestData;
exports.getElementAssembleData = GetElementDataService.getElementAssembleData;
exports.publishElementAssembleData = PublishElementContributeService.publishElementAssembleData;
exports.publishElementContribute = PublishElementContributeService.publishElementContribute;
exports.publishPackage = PublishPackageService.publish;
exports.getAllPublishPackageEntryExtensionProtocols = PackageMarketService.getAllPublishPackageEntryExtensionProtocols;
exports.getAllPublishPackageInfos = PackageMarketService.getAllPublishPackageInfos;
exports.findPublishPackage = PackageMarketService.findPublishPackage;

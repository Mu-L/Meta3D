'use strict';

var Curry = require("rescript/lib/js/curry.js");
var LibUtils$Meta3d = require("../file/LibUtils.bs.js");

function serializeLib(protocolConfigStr) {
  return LibUtils$Meta3d.serializeLib(protocolConfigStr, "UIControlProtocolConfig");
}

function getUIControlSpecificDataFields(configLib) {
  return Curry._1(LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSpecificDataFields"), undefined);
}

function hasChildren(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "hasChildren")();
}

function getUIControlSupportedEventNames(configLib) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "getUIControlSupportedEventNames")();
}

function generateHandleUIControlEventStr(configLib, actionNames) {
  return LibUtils$Meta3d.getFuncFromLib(configLib, "generateHandleUIControlEventStr")(actionNames);
}

exports.serializeLib = serializeLib;
exports.getUIControlSpecificDataFields = getUIControlSpecificDataFields;
exports.hasChildren = hasChildren;
exports.getUIControlSupportedEventNames = getUIControlSupportedEventNames;
exports.generateHandleUIControlEventStr = generateHandleUIControlEventStr;
/* No side effect */

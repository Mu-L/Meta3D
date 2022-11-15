'use strict';

var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Main$Meta3dUi2 = require("../../src/Main.bs.js");
var UIManager$Meta3dUi2 = require("../../src/UIManager.bs.js");
var ImguiRendererServiceTool$Meta3dUi2 = require("./ImguiRendererServiceTool.bs.js");

function createState(param) {
  return Main$Meta3dUi2.createExtensionState(undefined);
}

function init(sandbox, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, isDebugOpt, meta3dStateOpt, canvasOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var isDebug = isDebugOpt !== undefined ? isDebugOpt : false;
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  var canvas = canvasOpt !== undefined ? Caml_option.valFromOption(canvasOpt) : 10;
  return UIManager$Meta3dUi2.init(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], isDebug, canvas);
}

function clear(sandbox, clearColor, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  return UIManager$Meta3dUi2.clear(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], clearColor);
}

function render(sandbox, getExtensionServiceOpt, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, uiExtensionNameOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, timeOpt, param) {
  var getExtensionService;
  if (getExtensionServiceOpt !== undefined) {
    getExtensionService = Caml_option.valFromOption(getExtensionServiceOpt);
  } else {
    var __x = Sinon.createEmptyStub(sandbox.contents);
    getExtensionService = Sinon.returns(ImguiRendererServiceTool$Meta3dUi2.buildService(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), __x);
  }
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var uiExtensionName = uiExtensionNameOpt !== undefined ? uiExtensionNameOpt : "uiExtensionName";
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  var time = timeOpt !== undefined ? timeOpt : 0;
  return UIManager$Meta3dUi2.render({
              registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
              getExtensionService: getExtensionService,
              getExtensionState: getExtensionState,
              setExtensionState: setExtensionState,
              registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
              getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
              getAllContributesByType: getAllContributesByType
            }, meta3dState, [
              uiExtensionName,
              imguiRendererExtensionName
            ], time);
}

function registerElement(sandbox, state, elementFunc, elementNameOpt, execOrderOpt, elementStateOpt, reducersOpt, param) {
  var elementName = elementNameOpt !== undefined ? elementNameOpt : "e1";
  var execOrder = execOrderOpt !== undefined ? execOrderOpt : 0;
  var elementState = elementStateOpt !== undefined ? Caml_option.valFromOption(elementStateOpt) : 1;
  var reducers = reducersOpt !== undefined ? Caml_option.valFromOption(reducersOpt) : null;
  return UIManager$Meta3dUi2.registerElement(state, {
              elementName: elementName,
              execOrder: execOrder,
              elementFunc: elementFunc,
              elementState: elementState,
              reducers: reducers
            });
}

var markStateChange = UIManager$Meta3dUi2._markStateChange;

var show = UIManager$Meta3dUi2.show;

var hide = UIManager$Meta3dUi2.hide;

function beginWindow(sandbox, label, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  return UIManager$Meta3dUi2.beginWindow(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], label);
}

function endWindow(sandbox, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  return UIManager$Meta3dUi2.endWindow(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ]);
}

function setNextWindowRect(sandbox, rect, getExtensionService, getAllContributesByTypeOpt, getExtensionStateOpt, setExtensionStateOpt, imguiRendererExtensionNameOpt, meta3dStateOpt, param) {
  var getAllContributesByType = getAllContributesByTypeOpt !== undefined ? Caml_option.valFromOption(getAllContributesByTypeOpt) : Sinon.createEmptyStub(sandbox.contents);
  var getExtensionState = getExtensionStateOpt !== undefined ? Caml_option.valFromOption(getExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var setExtensionState = setExtensionStateOpt !== undefined ? Caml_option.valFromOption(setExtensionStateOpt) : Sinon.createEmptyStub(sandbox.contents);
  var imguiRendererExtensionName = imguiRendererExtensionNameOpt !== undefined ? imguiRendererExtensionNameOpt : "imguiRendererExtensionName";
  var meta3dState = meta3dStateOpt !== undefined ? meta3dStateOpt : 1;
  return UIManager$Meta3dUi2.setNextWindowRect(meta3dState, [
              {
                registerExtension: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getExtensionService: getExtensionService,
                getExtensionState: getExtensionState,
                setExtensionState: setExtensionState,
                registerContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getContribute: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
                getAllContributesByType: getAllContributesByType
              },
              imguiRendererExtensionName
            ], rect);
}

function registerUIControl(uiControlName, func, stateOpt, param) {
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dUi2.createExtensionState(undefined);
  return UIManager$Meta3dUi2.registerUIControl(state, {
              uiControlName: uiControlName,
              func: func
            });
}

function buildSkinContribute(skinName, skin) {
  return {
          skinName: skinName,
          skin: skin
        };
}

function registerSkin(skinName, skin, stateOpt, param) {
  var state = stateOpt !== undefined ? stateOpt : Main$Meta3dUi2.createExtensionState(undefined);
  return UIManager$Meta3dUi2.registerSkin(state, {
              skinName: skinName,
              skin: skin
            });
}

var isStateChange = UIManager$Meta3dUi2.isStateChange;

var getUIControlExn = UIManager$Meta3dUi2.getUIControlExn;

var getSkinExn = UIManager$Meta3dUi2.getSkinExn;

var dispatch = UIManager$Meta3dUi2.dispatch;

var getElementState = UIManager$Meta3dUi2.getElementState;

exports.createState = createState;
exports.init = init;
exports.clear = clear;
exports.render = render;
exports.registerElement = registerElement;
exports.markStateChange = markStateChange;
exports.isStateChange = isStateChange;
exports.show = show;
exports.hide = hide;
exports.beginWindow = beginWindow;
exports.endWindow = endWindow;
exports.setNextWindowRect = setNextWindowRect;
exports.registerUIControl = registerUIControl;
exports.getUIControlExn = getUIControlExn;
exports.buildSkinContribute = buildSkinContribute;
exports.registerSkin = registerSkin;
exports.getSkinExn = getSkinExn;
exports.dispatch = dispatch;
exports.getElementState = getElementState;
/* Sinon Not a pure module */

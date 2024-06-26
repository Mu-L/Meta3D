'use strict';

var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");

function buildService(sandbox, initOpt, clearOpt, renderOpt, beforeExecOpt, afterExecOpt, setStyleOpt, beginWindowOpt, endWindowOpt, beginChildOpt, endChildOpt, setNextWindowRectOpt, addFBOTextureOpt, getWindowBarHeightOpt, getContextOpt, buttonOpt, setCursorPosOpt, loadImageOpt, assetOpt, handleDragDropTargetOpt, menuOpt, treeOpt, inspectorOpt, switchButtonOpt, imageButtonOpt, inputTextOpt, inputFloat1Opt, inputFloat3Opt, checkboxOpt, collapsingOpt, imageOpt, openModalOpt, closeCurrentModalOpt, beginModalOpt, endModalOpt, popupOpt, imagePopupOpt, dummyOpt, listOpt, getItemRectMaxOpt, getItemRectSizeOpt, getWindowPosOpt, getWindowSizeOpt, param) {
  var init = initOpt !== undefined ? initOpt : Sinon.createEmptyStub(sandbox.contents);
  var clear = clearOpt !== undefined ? clearOpt : Sinon.createEmptyStub(sandbox.contents);
  var render = renderOpt !== undefined ? renderOpt : Sinon.createEmptyStub(sandbox.contents);
  var beforeExec = beforeExecOpt !== undefined ? beforeExecOpt : Sinon.createEmptyStub(sandbox.contents);
  var afterExec = afterExecOpt !== undefined ? afterExecOpt : Sinon.createEmptyStub(sandbox.contents);
  var setStyle = setStyleOpt !== undefined ? setStyleOpt : Sinon.createEmptyStub(sandbox.contents);
  var beginWindow = beginWindowOpt !== undefined ? beginWindowOpt : Sinon.createEmptyStub(sandbox.contents);
  var endWindow = endWindowOpt !== undefined ? endWindowOpt : Sinon.createEmptyStub(sandbox.contents);
  var beginChild = beginChildOpt !== undefined ? beginChildOpt : Sinon.createEmptyStub(sandbox.contents);
  var endChild = endChildOpt !== undefined ? endChildOpt : Sinon.createEmptyStub(sandbox.contents);
  var setNextWindowRect = setNextWindowRectOpt !== undefined ? setNextWindowRectOpt : Sinon.createEmptyStub(sandbox.contents);
  var addFBOTexture = addFBOTextureOpt !== undefined ? addFBOTextureOpt : Sinon.createEmptyStub(sandbox.contents);
  var getWindowBarHeight = getWindowBarHeightOpt !== undefined ? getWindowBarHeightOpt : Sinon.createEmptyStub(sandbox.contents);
  var getContext = getContextOpt !== undefined ? getContextOpt : Sinon.createEmptyStub(sandbox.contents);
  var button = buttonOpt !== undefined ? buttonOpt : Sinon.createEmptyStub(sandbox.contents);
  var setCursorPos = setCursorPosOpt !== undefined ? setCursorPosOpt : Sinon.createEmptyStub(sandbox.contents);
  var loadImage = loadImageOpt !== undefined ? loadImageOpt : Sinon.createEmptyStub(sandbox.contents);
  var asset = assetOpt !== undefined ? assetOpt : Sinon.createEmptyStub(sandbox.contents);
  var handleDragDropTarget = handleDragDropTargetOpt !== undefined ? Caml_option.valFromOption(handleDragDropTargetOpt) : Sinon.createEmptyStub(sandbox.contents);
  var menu = menuOpt !== undefined ? menuOpt : Sinon.createEmptyStub(sandbox.contents);
  var tree = treeOpt !== undefined ? treeOpt : Sinon.createEmptyStub(sandbox.contents);
  var inspector = inspectorOpt !== undefined ? inspectorOpt : Sinon.createEmptyStub(sandbox.contents);
  var switchButton = switchButtonOpt !== undefined ? switchButtonOpt : Sinon.createEmptyStub(sandbox.contents);
  var imageButton = imageButtonOpt !== undefined ? imageButtonOpt : Sinon.createEmptyStub(sandbox.contents);
  var inputText = inputTextOpt !== undefined ? inputTextOpt : Sinon.createEmptyStub(sandbox.contents);
  var inputFloat1 = inputFloat1Opt !== undefined ? inputFloat1Opt : Sinon.createEmptyStub(sandbox.contents);
  var inputFloat3 = inputFloat3Opt !== undefined ? inputFloat3Opt : Sinon.createEmptyStub(sandbox.contents);
  var checkbox = checkboxOpt !== undefined ? checkboxOpt : Sinon.createEmptyStub(sandbox.contents);
  var collapsing = collapsingOpt !== undefined ? collapsingOpt : Sinon.createEmptyStub(sandbox.contents);
  var image = imageOpt !== undefined ? imageOpt : Sinon.createEmptyStub(sandbox.contents);
  var openModal = openModalOpt !== undefined ? openModalOpt : Sinon.createEmptyStub(sandbox.contents);
  var closeCurrentModal = closeCurrentModalOpt !== undefined ? closeCurrentModalOpt : Sinon.createEmptyStub(sandbox.contents);
  var beginModal = beginModalOpt !== undefined ? beginModalOpt : Sinon.createEmptyStub(sandbox.contents);
  var endModal = endModalOpt !== undefined ? endModalOpt : Sinon.createEmptyStub(sandbox.contents);
  var popup = popupOpt !== undefined ? popupOpt : Sinon.createEmptyStub(sandbox.contents);
  var imagePopup = imagePopupOpt !== undefined ? imagePopupOpt : Sinon.createEmptyStub(sandbox.contents);
  var dummy = dummyOpt !== undefined ? dummyOpt : Sinon.createEmptyStub(sandbox.contents);
  var list = listOpt !== undefined ? listOpt : Sinon.createEmptyStub(sandbox.contents);
  var getItemRectMax = getItemRectMaxOpt !== undefined ? getItemRectMaxOpt : Sinon.createEmptyStub(sandbox.contents);
  var getItemRectSize = getItemRectSizeOpt !== undefined ? getItemRectSizeOpt : Sinon.createEmptyStub(sandbox.contents);
  var getWindowPos = getWindowPosOpt !== undefined ? getWindowPosOpt : Sinon.createEmptyStub(sandbox.contents);
  var getWindowSize = getWindowSizeOpt !== undefined ? getWindowSizeOpt : Sinon.createEmptyStub(sandbox.contents);
  return {
          init: init,
          render: render,
          setStyle: setStyle,
          beforeExec: beforeExec,
          afterExec: afterExec,
          clear: clear,
          beginWindow: beginWindow,
          endWindow: endWindow,
          beginChild: beginChild,
          endChild: endChild,
          setNextWindowRect: setNextWindowRect,
          addFBOTexture: addFBOTexture,
          getWindowBarHeight: getWindowBarHeight,
          button: button,
          setCursorPos: setCursorPos,
          loadImage: loadImage,
          asset: asset,
          handleDragDropTarget: handleDragDropTarget,
          menu: menu,
          tree: tree,
          inspector: inspector,
          switchButton: switchButton,
          imageButton: imageButton,
          image: image,
          inputText: inputText,
          inputFloat1: inputFloat1,
          inputFloat3: inputFloat3,
          checkbox: checkbox,
          collapsing: collapsing,
          openModal: openModal,
          closeCurrentModal: closeCurrentModal,
          beginModal: beginModal,
          endModal: endModal,
          popup: popup,
          imagePopup: imagePopup,
          dummy: dummy,
          list: list,
          getItemRectMax: getItemRectMax,
          getItemRectSize: getItemRectSize,
          getWindowPos: getWindowPos,
          getWindowSize: getWindowSize,
          getContext: getContext
        };
}

exports.buildService = buildService;
/* Sinon Not a pure module */

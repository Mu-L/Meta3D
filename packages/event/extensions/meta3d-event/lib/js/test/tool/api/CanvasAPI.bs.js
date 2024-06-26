'use strict';

var CanvasDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/CanvasDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("./EventExtensionTool.bs.js");

function setCanvas(canvas) {
  ContainerManager$Meta3dEvent.setState(CanvasDoService$Meta3dEvent.setCanvas(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), canvas), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

exports.setCanvas = setCanvas;
/* No side effect */

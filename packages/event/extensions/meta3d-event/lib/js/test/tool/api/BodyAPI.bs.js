'use strict';

var BodyDoService$Meta3dEvent = require("../../../src/event_manager/service/dom/BodyDoService.bs.js");
var ContainerManager$Meta3dEvent = require("../../../src/event_manager/data/ContainerManager.bs.js");
var EventExtensionTool$Meta3dEvent = require("./EventExtensionTool.bs.js");

function getBodyExn(param) {
  return BodyDoService$Meta3dEvent.getBodyExn(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)));
}

function setBody(body) {
  ContainerManager$Meta3dEvent.setState(BodyDoService$Meta3dEvent.setBody(ContainerManager$Meta3dEvent.getState(EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined)), body), EventExtensionTool$Meta3dEvent.buildEventExtentsionProtocolName(undefined));
}

exports.getBodyExn = getBodyExn;
exports.setBody = setBody;
/* No side effect */

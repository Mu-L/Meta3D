'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");

function get(param) {
  return ArraySt$Meta3dCommonlib.removeDuplicateItems(param.needDisposedBasicCameraViews);
}

exports.get = get;
/* No side effect */

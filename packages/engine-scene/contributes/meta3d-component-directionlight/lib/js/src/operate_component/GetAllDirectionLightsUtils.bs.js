'use strict';

var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function getAll(param) {
  return MutableSparseMap$Meta3dCommonlib.getValues(param.gameObjectDirectionLightMap);
}

exports.getAll = getAll;
/* No side effect */

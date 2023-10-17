'use strict';

var TextDecoder$Meta3d = require("meta3d/lib/js/src/file/TextDecoder.bs.js");
var TextEncoder$Meta3d = require("meta3d/lib/js/src/file/TextEncoder.bs.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ListSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ListSt.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var BinaryFileOperator$Meta3d = require("meta3d/lib/js/src/file/BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");

function _checkSizeEqual(glbIds, glbs) {
  if (ArraySt$Meta3dCommonlib.length(glbIds) === ArraySt$Meta3dCommonlib.length(glbs)) {
    return ;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("size not equal", "", "", "", "")));
  }
}

function getExtensionService(api) {
  return {
          addGLBAsset: (function (meta3dState, gltf, glbId) {
              var state = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                          allGLBAssets: ListSt$Meta3dCommonlib.push(state.allGLBAssets, [
                                glbId,
                                gltf
                              ])
                        });
            }),
          removeGLBAsset: (function (meta3dState, glbId) {
              var state = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                          allGLBAssets: ListSt$Meta3dCommonlib.filter(state.allGLBAssets, (function (param) {
                                  return param[0] !== glbId;
                                }))
                        });
            }),
          getAllGLBAssets: (function (meta3dState) {
              var state = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              return ListSt$Meta3dCommonlib.toArray(state.allGLBAssets);
            }),
          exportAsset: (function (meta3dState) {
              var match = api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              var encoder = new TextEncoder();
              var match$1 = ListSt$Meta3dCommonlib.reduce(match.allGLBAssets, [
                    [],
                    []
                  ], (function (param, param$1) {
                      return [
                              ArraySt$Meta3dCommonlib.push(param[0], param$1[0]),
                              ArraySt$Meta3dCommonlib.push(param[1], param$1[1])
                            ];
                    }));
              return BinaryFileOperator$Meta3d.generate([
                          TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(match$1[0]), encoder),
                          new Uint8Array(BinaryFileOperator$Meta3d.generate(ArraySt$Meta3dCommonlib.map(match$1[1], (function (data) {
                                          return new Uint8Array(data);
                                        }))))
                        ]);
            }),
          importAsset: (function (meta3dState, assetFile) {
              api.getExtensionState(meta3dState, "meta3d-asset-protocol");
              var decoder = new TextDecoder("utf-8");
              var match = BinaryFileOperator$Meta3d.load(assetFile);
              if (match.length !== 2) {
                throw {
                      RE_EXN_ID: "Match_failure",
                      _1: [
                        "Main.res",
                        95,
                        8
                      ],
                      Error: new Error()
                    };
              }
              var glbIdsUint8 = match[0];
              var glbsUint8 = match[1];
              var glbIds = JSON.parse(TextDecoder$Meta3d.decodeUint8Array(glbIdsUint8, decoder));
              var glbs = ArraySt$Meta3dCommonlib.map(BinaryFileOperator$Meta3d.load(glbsUint8.buffer), (function (data) {
                      return data.buffer;
                    }));
              _checkSizeEqual(glbIds, glbs);
              return api.setExtensionState(meta3dState, "meta3d-asset-protocol", {
                          allGLBAssets: ArraySt$Meta3dCommonlib.reduceOneParami(glbIds, (function (allGLBAssets, glbId, index) {
                                  return ListSt$Meta3dCommonlib.push(allGLBAssets, [
                                              glbId,
                                              ArraySt$Meta3dCommonlib.getExn(glbs, index)
                                            ]);
                                }), /* [] */0)
                        });
            })
        };
}

function createExtensionState(param) {
  return {
          allGLBAssets: /* [] */0
        };
}

function getExtensionLife(api, extensionProtocolName) {
  return {
          onRegister: null,
          onRestore: null,
          onDeepCopy: null,
          onStart: null,
          onInit: null,
          onUpdate: null
        };
}

exports._checkSizeEqual = _checkSizeEqual;
exports.getExtensionService = getExtensionService;
exports.createExtensionState = createExtensionState;
exports.getExtensionLife = getExtensionLife;
/* No side effect */

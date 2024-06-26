'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var ConfigUtils$Meta3dGameobjectDataoriented = require("./config/ConfigUtils.bs.js");
var CloneGameObjectUtils$Meta3dGameobjectDataoriented = require("./CloneGameObjectUtils.bs.js");
var CreateGameObjectUtils$Meta3dGameobjectDataoriented = require("./CreateGameObjectUtils.bs.js");
var GetAllGameObjectUtils$Meta3dGameobjectDataoriented = require("./GetAllGameObjectUtils.bs.js");
var DisposeGameObjectUtils$Meta3dGameobjectDataoriented = require("./DisposeGameObjectUtils.bs.js");
var GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented = require("./GetNeedDisposedGameObjectsUtils.bs.js");

function getContribute(api) {
  return {
          createStateFunc: (function (config) {
              return {
                      config: config,
                      maxUID: 0,
                      needDisposedGameObjectArray: [],
                      disposedGameObjectArray: [],
                      names: ImmutableSparseMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                    };
            }),
          createGameObjectFunc: CreateGameObjectUtils$Meta3dGameobjectDataoriented.create,
          getNeedDisposedGameObjectsFunc: GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get,
          deferDisposeGameObjectFunc: (function (states, funcs, gameObject) {
              return DisposeGameObjectUtils$Meta3dGameobjectDataoriented.deferDisposeGameObject(states)(funcs, gameObject);
            }),
          disposeGameObjectsFunc: (function (states, funcs, gameObjects) {
              return DisposeGameObjectUtils$Meta3dGameobjectDataoriented.disposeGameObjects(states)(funcs, gameObjects);
            }),
          getNameFunc: (function (param, gameObject) {
              return ImmutableSparseMap$Meta3dCommonlib.getNullable(param.names, gameObject);
            }),
          setNameFunc: (function (state, gameObject, name) {
              return {
                      config: state.config,
                      maxUID: state.maxUID,
                      needDisposedGameObjectArray: state.needDisposedGameObjectArray,
                      disposedGameObjectArray: state.disposedGameObjectArray,
                      names: ImmutableSparseMap$Meta3dCommonlib.set(state.names, gameObject, name)
                    };
            }),
          cloneGameObjectFunc: (function (states, funcs, count, cloneConfig, sourceGameObject) {
              return CloneGameObjectUtils$Meta3dGameobjectDataoriented.clone(states, funcs, ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(states[0]), count, cloneConfig, sourceGameObject);
            }),
          getAllGameObjectsFunc: GetAllGameObjectUtils$Meta3dGameobjectDataoriented.getAll,
          restore: (function (currentState, targetState) {
              return targetState;
            }),
          deepCopy: (function (state) {
              var needDisposedGameObjectArray = state.needDisposedGameObjectArray;
              var disposedGameObjectArray = state.disposedGameObjectArray;
              return {
                      config: state.config,
                      maxUID: state.maxUID,
                      needDisposedGameObjectArray: ArraySt$Meta3dCommonlib.copy(needDisposedGameObjectArray),
                      disposedGameObjectArray: ArraySt$Meta3dCommonlib.copy(disposedGameObjectArray),
                      names: state.names
                    };
            })
        };
}

exports.getContribute = getContribute;
/* No side effect */

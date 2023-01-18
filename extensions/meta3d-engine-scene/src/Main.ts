import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-engine-scene-protocol/src/state/StateType"
import { service } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-engine-scene-protocol/src/service/DependentMapType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { state as cameraWorkPluginState, states as cameraWorkPluginStates } from "meta3d-work-plugin-camera-protocol/src/StateType";
import { config as cameraWorkPluginConfig } from "meta3d-work-plugin-camera-protocol/src/ConfigType";
import { state as transformWorkPluginState, states as transformWorkPluginStates } from "meta3d-work-plugin-transform-protocol/src/StateType";
import { config as transformWorkPluginConfig } from "meta3d-work-plugin-transform-protocol/src/ConfigType";
// import { state as webgpuTriangleState, states as webgpuTriangleStates } from "meta3d-work-plugin-webgpu-triangle-protocol/src/StateType";
// import { state as rootState, states as rootStates } from "meta3d-work-plugin-root-protocol/src/StateType";
import { addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, cloneGameObject, createGameObject, disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects, getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform, hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform } from "./GameObjectAPI"
import { createTransform, getLocalPosition, lookAt, setLocalPosition } from "./TransformAPI";
import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./PerspectiveCameraProjectionAPI";
import { createPBRMaterial, getAllPBRMaterials, setDiffuseColor } from "./PBRMaterialAPI";
import { createGeometry, setIndices, setVertices } from "./GeometryAPI";
import { createBasicCameraView, active } from "./BasicCameraViewAPI";

import { componentContribute } from "meta3d-engine-core-protocol/src/contribute/scene_graph/ComponentContributeType"
import { gameObjectContribute } from "meta3d-engine-core-protocol/src/contribute/scene_graph/GameObjectContributeType"
import { state as transformState, config as transformConfig, transform, componentName as transformComponentName } from "meta3d-component-transform-protocol";
import { state as perspecticeCameraProjectionState, componentName as perspecticeCameraProjectionComponentName, config as perspecticeCameraProjectionConfig, perspectiveCameraProjection } from "meta3d-component-perspectivecameraprojection-protocol"
import { state as basicCameraViewState, componentName as basicCameraViewComponentName, config as basicCameraViewConfig, basicCameraView } from "meta3d-component-basiccameraview-protocol"
import { state as pbrMaterialState, componentName as pbrMaterialComponentName, config as pbrMaterialConfig, pbrMaterial } from "meta3d-component-pbrmaterial-protocol"
import { state as geometryState, componentName as geometryComponentName, config as geometryConfig, geometry } from "meta3d-component-geometry-protocol"
import { state as gameObjectState } from "meta3d-gameobject-protocol";
// import { active, createBasicCameraView } from "./BasicCameraViewAPI"
// import { createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear } from "./PerspectiveCameraProjectionAPI"

export let getExtensionService: getExtensionServiceMeta3D<
	dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap,
	service
> = (api, [{
	//  meta3dBsMostExtensionProtocolName,
	meta3dEngineCoreExtensionProtocolName,
}, {
	meta3dWorkPluginCameraContributeName,
	meta3dWorkPluginTransformContributeName,
	meta3dComponentTransformContributeName,
	meta3dComponentGeometryContributeName,
	meta3dComponentPBRMaterialContributeName,
	meta3dComponentBasicCameraViewContributeName,
	meta3dComponentPerspectiveCameraProjectionContributeName,
	meta3dGameObjectContributeName
}]) => {
		return {
			prepare: (meta3dState: meta3dState, isDebug, ecsConfig) => {
				let {
					float9Array1,
					float32Array1,
					transformCount,
					geometryCount,
					geometryPointCount,
					pbrMaterialCount
				} = ecsConfig

				let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, meta3dEngineCoreExtensionProtocolName)

				let engineCoreService = api.getExtensionService<engineCoreService>(
					meta3dState,
					meta3dEngineCoreExtensionProtocolName
				)

				let { registerWorkPlugin, registerComponent, setGameObjectContribute, createAndSetComponentState, createAndSetGameObjectState } = engineCoreService

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<cameraWorkPluginConfig, cameraWorkPluginState>>(meta3dState, meta3dWorkPluginCameraContributeName),
					{
						isDebug
					},
					[
						{
							pipelineName: "update",
							insertElementName: "update_root_meta3d",
							insertAction: "after"
						}
					]
				)

				engineCoreState = registerWorkPlugin(engineCoreState, api.getContribute<workPluginContribute<transformWorkPluginConfig, transformWorkPluginState>>(meta3dState, meta3dWorkPluginTransformContributeName),
					null,
					[
						{
							pipelineName: "update",
							insertElementName: "update_camera_camera_meta3d",
							insertAction: "after"
						}
					]
				)







				engineCoreState =
					registerComponent(engineCoreState, api.getContribute<componentContribute<transformState, transformConfig, transform>>(meta3dState, meta3dComponentTransformContributeName))

				engineCoreState =
					registerComponent(engineCoreState, api.getContribute<componentContribute<geometryState, geometryConfig, geometry>>(meta3dState, meta3dComponentGeometryContributeName))

				engineCoreState =
					registerComponent(engineCoreState, api.getContribute<componentContribute<pbrMaterialState, pbrMaterialConfig, pbrMaterial>>(meta3dState, meta3dComponentPBRMaterialContributeName))

				engineCoreState =
					registerComponent(engineCoreState, api.getContribute<componentContribute<basicCameraViewState, basicCameraViewConfig, basicCameraView>>(meta3dState, meta3dComponentBasicCameraViewContributeName))

				engineCoreState =
					registerComponent(engineCoreState, api.getContribute<componentContribute<perspecticeCameraProjectionState, perspecticeCameraProjectionConfig, perspectiveCameraProjection>>(meta3dState, meta3dComponentPerspectiveCameraProjectionContributeName))


				engineCoreState = createAndSetComponentState<transformConfig>(engineCoreState, transformComponentName, {
					isDebug,
					float9Array1,
					float32Array1,
					transformCount
				})
				engineCoreState = createAndSetComponentState<pbrMaterialConfig>(engineCoreState, pbrMaterialComponentName, {
					isDebug,
					pbrMaterialCount
				})
				engineCoreState = createAndSetComponentState<geometryConfig>(engineCoreState, geometryComponentName, {
					isDebug,
					geometryCount,
					geometryPointCount
				})
				engineCoreState = createAndSetComponentState<basicCameraViewConfig>(engineCoreState, basicCameraViewComponentName, {
					isDebug
				})
				engineCoreState = createAndSetComponentState<perspecticeCameraProjectionConfig>(engineCoreState, perspecticeCameraProjectionComponentName, {
					isDebug
				})


				engineCoreState =
					setGameObjectContribute(engineCoreState, api.getContribute<gameObjectContribute<gameObjectState>>(meta3dState, meta3dGameObjectContributeName))

				engineCoreState = createAndSetGameObjectState(engineCoreState, { isDebug })







				// engineCoreState = engineCoreService.init(engineCoreState, meta3dState)







				meta3dState =
					api.setExtensionState(
						meta3dState,
						meta3dEngineCoreExtensionProtocolName,
						engineCoreState
					)



				return meta3dState
			},
			gameObject: {
				addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, cloneGameObject, createGameObject, disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects, getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform, hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform
			},
			transform: {
				createTransform, getLocalPosition, lookAt, setLocalPosition
			},
			geometry: {
				createGeometry, setIndices, setVertices
			},
			pbrMaterial: {
				createPBRMaterial, getAllPBRMaterials, setDiffuseColor
			},
			perspectiveCameraProjection: {
				createPerspectiveCameraProjection, setAspect, setFar, setFovy, setNear
			},
			basicCameraView: {
				createBasicCameraView, active
			}
		}
	}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = () => {
	return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
	}
}
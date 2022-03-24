import { execFunc as execFuncType } from "../../Type";
import { getState } from "../Utils";
import { states } from "engine-work-plugin-webgl1-protocol";
import { createGL } from "engine-work-plugin-webgl1-utils/src/utils/CreateGLUtils";

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, webgl1Service, canvas } = getState(states)

	return mostService.callFunc(() => {
		// let gl = webgl1Service.getContext(canvas)
		let gl = createGL(webgl1Service, canvas)

		console.log("create gl job->gl:", gl);

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1": {
					...getState(states),
					gl: gl
				}
			}
		)
	})
}
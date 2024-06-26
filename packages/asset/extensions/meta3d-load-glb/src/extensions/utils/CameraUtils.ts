export let setCameraUserData = (func, gltf, gameObjectName) => {
    for (let scene of gltf.scenes) {
        scene.traverse(object => {
            if (!object.isCamera || object.name != gameObjectName) {
                return
            }

            func(object)
        })
    }
}
import { concat, empty, fromPromise, just, Stream } from "most";
import { getDatabase } from "./BackendService";
import { satisfies, gt } from "semver";
import { protocol, protocolConfig } from "backend-abstract/src/application_layer/market/MarketType";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { descSort } from "backend-abstract/src/utils/NewestUtils";

export let findNewestPublishPackage = (
    collectionName: string,
    whereData: any,
    [firstOrderByFieldName, firstGtFunc]: [string, any],
    [secondOrderByFieldName, secondGtFunc]: [string, any]
) => {
    return fromPromise(getDatabase().collection(collectionName)
        .where(whereData)
        .orderBy(firstOrderByFieldName, "desc")
        // .orderBy(secondOrderByFieldName, "desc")
        .get()
        .then(res => {
            let arr = descSort(res.data, firstGtFunc, firstOrderByFieldName)
            if (arr.length == 0) {
                return null
            }

            let firstOrderByFieldValue = arr[0][firstOrderByFieldName]

            arr = descSort(res.data.filter(data => {
                return data[firstOrderByFieldName] == firstOrderByFieldValue
            }), secondGtFunc, secondOrderByFieldName)

            if (arr.length == 0) {
                return null
            }

            return arr[0]
        })
    )
}

// let _findNewestImplements = (res, isJudgeProtocolVersion, implementName, protocolName, protocolVersion) => {
//     return res.data.reduce((result, { fileData, key }) => {
//         return result.concat(fileData.map(data => {
//             return { ...data, account: key }
//         }))
//     }, [])
//         .filter((data) => {
//             if (isJudgeProtocolVersion) {
//                 return data.name == implementName &&
//                     data.protocolName == protocolName
//                     && satisfies(
//                         protocolVersion,
//                         data.protocolVersion
//                     )
//             }

//             return data.name == implementName &&
//                 data.protocolName == protocolName

//         })
//         .sort((a, b) => {
//             if (gt(a.version, b.version)) {
//                 return -1
//             }

//             return 1
//         })
// }

let _findNewestPublishExtensionOrContribute = (
    downloadFileFunc,
    [
        protocolCollectionName,
        protocolConfigCollectionName,
        implementCollectionName,
    ],
    implementName, protocolName
) => {
    return fromPromise(
        getDatabase().collection(protocolCollectionName)
            .where({
                name: protocolName
            })
            .orderBy("version", "desc")
            .get()
            .then(res => {
                /*! need sort again

                because ".orderBy("version", "desc")" will ouput wrong result in this case:
                    "version": 0.19.3, 0.19.21(should be 0.19.21, 0.19.3) 
                * 
                */
                return descSort(res.data, gt, "version")[0]
            })
    ).flatMap((protocol: protocol) => {
        let protocolVersion = protocol.version
        let protocolIconBase64 = protocol.iconBase64

        return fromPromise(
            getDatabase().collection(protocolConfigCollectionName)
                .where({
                    name: protocolName,
                    version: protocolVersion
                })
                .get()
                .then(res => {
                    if (res.data.length > 0) {
                        let { name, version, account, configStr } = res.data[0]

                        return { name, version, account, configStr }
                    }

                    return null
                })
        ).flatMap((protocolConfig: nullable<protocolConfig>) => {
            return fromPromise(
                getDatabase().collection(implementCollectionName)
                    // .where({
                    //     fileData: getDatabase().command.in([
                    //         getDatabase().command.eq({
                    //             name: implementName,
                    //             protocolName: protocolName
                    //         })
                    //     ])
                    // })
                    // .where({
                    //     fileData: getDatabase().command.neq([])
                    // })
                    .where({
                        name: implementName,
                        protocolName: protocolName
                    })
                    .orderBy("version", "desc")
                    .skip(0)
                    .limit(1000)
                    .get()
                    .then(res => {
                        // let extensionOrContribute = null

                        // let result = _findNewestImplements(res, true, implementName, protocolName, protocolVersion)

                        // if (result.length == 0) {
                        //     extensionOrContribute = _findNewestImplements(res, false, implementName, protocolName, protocolVersion)[0]
                        // }
                        // else {
                        //     extensionOrContribute = result[0]
                        // }

                        let data = descSort(res.data, gt, "version")

                        let extensionOrContribute = data.filter((data) => {
                            return satisfies(
                                protocolVersion,
                                data.protocolVersion
                            )
                        })[0]

                        return [
                            extensionOrContribute,
                            [
                                protocolVersion,
                                protocolIconBase64,
                                protocol.displayName,
                                protocol.repoLink,
                                protocol.description
                            ],
                            protocolConfig
                        ]
                    })
            )
        })
    })
        .flatMap(([
            { fileID,
                description, displayName,
                // protocolVersion,
                repoLink,
                version,
                account },
            protocolData,
            protocolConfig
        ]: any) => {
            return downloadFileFunc(fileID).map(file => {
                return [
                    [
                        description, displayName,
                        // protocolVersion,
                        repoLink,
                        version, file,
                        account
                    ],
                    protocolData,
                    protocolConfig
                ]
            })
        })
}

export let findNewestPublishExtension = (
    downloadFileFunc,
    implementName, protocolName
) => {
    return _findNewestPublishExtensionOrContribute(downloadFileFunc, ["publishedextensionprotocols", "publishedextensionprotocolconfigs", "publishedextensions"], implementName, protocolName)
}

export let findNewestPublishContribute = (
    downloadFileFunc,
    implementName, protocolName
) => {
    return _findNewestPublishExtensionOrContribute(downloadFileFunc, ["publishedcontributeprotocols", "publishedcontributeprotocolconfigs", "publishedcontributes"], implementName, protocolName)
}

// export let findNewestPublishElementAssembleData = (
//     elementName: string,
// ) => {
//     return fromPromise(
//         getDatabase().collection("publishedelementassembledata")
//             .where({
//                 elementName: elementName
//             })
//             .orderBy("elementVersion", "desc")
//             .get()
//             .then(res => {
//                 /*! need sort again
//                 */
//                 let result = descSort(res.data, gt, "elementVersion").map(({
//                     account,
//                     elementName,
//                     elementVersion,
//                     inspectorData,
//                     customInputs,
//                     customActions,
//                 }) => {
//                     return {
//                         account,
//                         elementName,
//                         elementVersion,
//                         inspectorData,
//                         customInputs,
//                         customActions,
//                     }
//                 })

//                 if (result.length == 0) {
//                     // throw new Error("error")
//                     return null
//                 }

//                 return result[0]
//             })
//     )
// }
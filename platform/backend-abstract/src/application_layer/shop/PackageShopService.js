"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = void 0;
const most_1 = require("most");
const ArrayUtils_1 = require("../../utils/ArrayUtils");
let getAllPublishPackageEntryExtensionProtocols = (
// [getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection]: [any, any]
getDataFunc) => {
    // return fromPromise(getPackageShopEntryExtensionProtocolCollectionFunc()).map((res: any) => {
    //     let resData = getDataFromPackageShopEntryExtensionProtocolCollection(res)
    //     return resData.map(({
    //         account,
    //         entryExtensionProtocolName,
    //         entryExtensionProtocolVersion,
    //         entryExtensionProtocolIconBase64,
    //     }) => {
    //         return { name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64 }
    //     })
    // })
    return (0, most_1.fromPromise)(getDataFunc("publishedpackages")).map((data) => {
        // let resData = getDataFromPackageShopEntryExtensionProtocolCollection(res)
        return (0, ArrayUtils_1.removeDuplicateItemsWithBuildKeyFunc)(data.map(({ account, entryExtensionProtocolName, entryExtensionProtocolVersion, entryExtensionProtocolIconBase64, }) => {
            return { name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64 };
        }), 
        // (({
        //     name, version, account
        // }) => {
        //     return name + "_" + version + "_" + account
        // })
        (({ name, version }) => {
            return name + "_" + version;
        }));
    });
};
exports.getAllPublishPackageEntryExtensionProtocols = getAllPublishPackageEntryExtensionProtocols;
// export let getAllPublishPackageEntryExtensionProtocols = (
//     [getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection]: [any, any]
// ): Stream<protocols> => {
//     return getAllPublishProtocolData([getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection],
//         "publishedpackages"
//     )
// }
let getAllPublishPackageInfos = (getDataByKeyContainFunc, entryExtensionProtocolName, entryExtensionProtocolVersion) => {
    return getDataByKeyContainFunc("publishedpackages", 
    // buildPartialKeyByEntryProcoltolData(entryExtensionProtocolName, entryExtensionProtocolVersion)
    [
        entryExtensionProtocolName, entryExtensionProtocolVersion
    ]).map((data) => {
        return data.map(({ account, entryExtensionProtocolName, entryExtensionProtocolVersion, entryExtensionProtocolVersionRange, entryExtensionProtocolIconBase64, entryExtensionName, packageName, packageVersion, fileID }) => {
            return {
                id: fileID,
                account,
                entryExtensionProtocolName,
                entryExtensionProtocolVersion,
                entryExtensionProtocolVersionRange,
                entryExtensionProtocolIconBase64,
                entryExtensionName,
                name: packageName,
                version: packageVersion,
            };
        });
    });
};
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = ([getDataByKeyContainFunc, downloadFileFunc], account, packageName, packageVersion) => {
    return getDataByKeyContainFunc("publishedpackages", 
    // buildPartialKeyByPackageData(
    //     packageName,
    //     packageVersion,
    //     account
    // )
    [
        packageName,
        packageVersion,
        account
    ]).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc(data[0].fileID);
    });
};
exports.findPublishPackage = findPublishPackage;
import { fromPromise, just } from "most"

type account = string

type collectionData = any

type allCollectionData = {
    data: Array<collectionData>
}


type dataFromMarketProtocolCollectionData = any

type dataFromMarketImplementCollectionData = any

type marketProtocolData = any

type marketImplementData = any

type marketImplementAccountData = {
    key: account,
    fileData: Array<marketImplementData>
}

type marketImplementCollectionData = Array<marketImplementAccountData>

type protocolName = string

type protocolVersion = string

let _getDatabase = (app: any) => {
    return app.database()
}

let _notHasData = (app: any, collectionName: string, data: object) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0))
}


let _buildEmptyCollectionData = () => null

let _buildFirstAddDataToBodyFunc = () => (allCollectionData, data) => null

export let addMarketProtocolDataToDataFromMarketProtocolCollectionData = (allCollectionData: dataFromMarketProtocolCollectionData, data: marketProtocolData): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(null)
    })
}

// export let addMarketImplementDataToDataFromMarketImplementCollectionData = (allCollectionData: dataFromMarketImplementCollectionData, data: marketImplementData): Promise<any> => {
//     return new Promise((resolve, reject) => {
//         resolve(allCollectionData.concat([data]))
//     })
// }

export let checkUserName = (app: any, account: account) => {
    return _notHasData(app, "user", { key: account })
}


export let handleLoginForWeb3 = (app: any, account: account) => {
    return checkUserName(app, account).flatMap((isNotHasData: boolean) => {
        if (isNotHasData) {
            return fromPromise(
                addDataToUserCollection(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {})
            )
            // .concat(fromPromise(
            //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
            //         fileData: []
            //     })
            // )).concat(fromPromise(
            //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
            //         fileData: []
            //     })
            // )).concat(fromPromise(
            //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
            //         fileData: []
            //     })
            // ))
        }

        return just(account)
    })
}

export let registerUser = (app: any, account: account) => {
    return fromPromise(
        addDataToUserCollection(app, _buildFirstAddDataToBodyFunc(), "user", account, _buildEmptyCollectionData(), {})
    )
    // .concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedextensions", account, _buildEmptyCollectionData(), {
    //         fileData: []
    //     })
    // )).concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedcontributes", account, _buildEmptyCollectionData(), {
    //         fileData: []
    //     })
    // )).concat(fromPromise(
    //     addDataToMarketImplementCollection(app, _buildFirstAddDataToBodyFunc(), "publishedelementassembledata", account, _buildEmptyCollectionData(), {
    //         fileData: []
    //     })
    // ))

}

export let handleKeyToLowercase = (key: string) => {
    return key.toLowerCase()
}

export let addDataToMarketProtocolCollection = (app: any, addMarketProtocolDataToDataFromMarketProtocolCollectionData: (allCollectionData: allCollectionData, data: any) => Promise<any>, collectionName: string, key: string, allCollectionData: allCollectionData, data: any) => {
    return _getDatabase(app).collection(collectionName)
        .add({
            ...data,
            // key: handleKeyToLowercase(key)
            key: key
        })
}

export let addDataToMarketImplementCollection = addDataToMarketProtocolCollection

export let addDataToUserCollection = addDataToMarketProtocolCollection

let _hasData = (app: any, collectionName: string, key: string) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where({ key: key })
        .get()
        .then(res => res.data.length > 0))
}

export let hasAccount = (app: any, collectionName: string, account: account) => {
    return _hasData(app, collectionName, handleKeyToLowercase(account))
}

export let hasData = (app: any, collectionName: string, key: string) => {
    return _hasData(app, collectionName, handleKeyToLowercase(key))
}

export let getDataFromMarketProtocolCollection = (allCollectionData: allCollectionData): dataFromMarketProtocolCollectionData => {
    return allCollectionData.data
}


// export let getDataFromMarketImplementAccountData = (data: marketImplementAccountData): dataFromMarketImplementCollectionData => {
//     return data.fileData
// }

// export let buildMarketImplementAccountData = (data: dataFromMarketImplementCollectionData, account: account): marketImplementAccountData => {
//     return {
//         key: handleKeyToLowercase(account),
//         fileData: data
//     }
// }

// export let isContain = (find: (dataFromMarketCollectionData: dataFromMarketProtocolCollectionData | dataFromMarketImplementCollectionData) => boolean, dataFromMarketCollectionData: dataFromMarketProtocolCollectionData | dataFromMarketImplementCollectionData) => {
//     return new Promise((resolve, reject) => {
//         resolve(
//             dataFromMarketCollectionData.findIndex((data) => {
//                 return find(data)
//             }) !== -1
//         )
//     })
// }

export let notHasData = (app: any, collectionName: string, data: object) => {
    return fromPromise(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0))
}

export let getFileID = ({ fileID }, filePath: string) => {
    return fileID
}

let _arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
    return Buffer.from(arrayBuffer)
}

export let uploadFile = (app: any, filePath: string, fileContent: ArrayBuffer) => {
    return fromPromise(app.uploadFile({
        cloudPath: filePath,
        fileContent: _arrayBufferToBuffer(fileContent)
    }))
}

export let getMarketProtocolCollection = (app: any, parseMarketCollectionDataBody, collectionName: string, limitCount: number, skipCount: number, whereData = {}): Promise<allCollectionData> => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        // .skip(skipCount + 1)
        // .limit(limitCount + 1)
        .skip(skipCount)
        .limit(limitCount)
        .get()
}

export let batchFindMarketProtocolCollection = (app: any, parseMarketCollectionDataBody, collectionName: string,
    protocolNames: Array<protocolName>
): Promise<allCollectionData> => {
    return _getDatabase(app).collection(collectionName)
        .where({
            name: _getDatabase(app).command.in(protocolNames)
        })
        .orderBy("version", "desc")
        .skip(0)
        .limit(1000)
        .get()
}


export let getMarketProtocolCollectionCount = (app: any, collectionName: string): Promise<allCollectionData> => {
    return _getDatabase(app).collection(collectionName)
        .count()
        .then(res => res.total)
}

export let getMarketImplementAccountDataWithWhereData = (app: any, _parseMarketCollectionDataBody, collectionName: string, whereData): Promise<[marketImplementAccountData, marketImplementCollectionData]> => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        .skip(0)
        .limit(1000)
        .get()
        .then(res => res.data)
}

export let getMarketImplementAccountData = (app: any, _parseMarketCollectionDataBody, collectionName: string, account: account, name, version, protocolName = null): Promise<[marketImplementAccountData, marketImplementCollectionData]> => {
    let whereData = null

    if (protocolName !== null) {
        whereData = {
            key: handleKeyToLowercase(account),
            name: name,
            version: version,
            protocolName: protocolName
        }
    }
    else {
        whereData = {
            key: handleKeyToLowercase(account),
            name: name,
            version: version,
        }
    }

    return getMarketImplementAccountDataWithWhereData(app, _parseMarketCollectionDataBody, collectionName, whereData)
}

// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
//     return _getDatabase(app).collection(collectionName)
//         .update(updateData)
// }

export let updateMarketImplementData = (app: any, collectionName: string, key: string, updateData: marketImplementAccountData, _oldMarketImplementCollectionData: marketImplementCollectionData) => {
    return _getDatabase(app).collection(collectionName)
        .where({ key: handleKeyToLowercase(key) })
        .update(updateData)
}

export let addMarketImplementData = (app: any, collectionName: string, data: any) => {
    return _getDatabase(app).collection(collectionName)
        .add(data)
}

// export let getMarketImplementCollectionFunc = (app: any, collectionName: string): Promise<allCollectionData> => {
//     return _getDatabase(app).collection(collectionName).get()
// }
export let getMarketImplementCollection = getMarketProtocolCollection

export let mapMarketImplementCollection = (allCollectionData: allCollectionData, func) => {
    return allCollectionData.data.map(func)
}

export let filterMarketImplementCollection = (allCollectionData: allCollectionData, func) => {
    return {
        ...allCollectionData,
        data: allCollectionData.data.filter(func)

    }
}

export let getAccountFromMarketImplementCollectionData = (data: collectionData) => {
    return data.key
}

// export let getFileDataFromMarketImplementCollectionData = (data: collectionData) => {
//     return data.fileData
// }

export let downloadFile = (app: any, parseMarketCollectionDataBody, fileID: string, notUseCache: boolean) => {
    return fromPromise(app.getTempFileURL({
        fileList: [fileID]
    })).flatMap(({ fileList }: any) => {
        // return fromPromise(fetch(fileList[0].tempFileURL).then(response => response.arrayBuffer()))

        let tempFileURL = notUseCache ? fileList[0].tempFileURL + "?cachebust=" + Math.floor(Math.random() * 1000000) : fileList[0].tempFileURL

        return fromPromise(fetch(tempFileURL).then(response => response.arrayBuffer()))
    })
}

export let deleteFile = (app: any, fileID: string) => {
    return fromPromise(app.deleteFile({
        fileList: [fileID]
    }))
}

export let parseMarketCollectionDataBodyForNodejs = null

export let getKey = (data: collectionData) => {
    return data.key
}
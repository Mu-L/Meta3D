import { loadFeature, defineFeature } from "jest-cucumber"
import { createSandbox } from "sinon";
import { just } from "most";
import { resolve } from "meta3d-tool-utils/src/publish/PromiseTool"
import { publishElementAssembleData } from "../../src/application_layer/assemble_space/element_assemble/PublishElementContributeService";
// import { addMarketImplementDataToDataFromMarketImplementCollectionData, buildMarketImplementAccountData, getDataFromMarketImplementAccountData, isContain } from "meta3d-backend-cloudbase";

const feature = loadFeature("./test/features/publish_element_assemble_data.feature")

defineFeature(feature, test => {
    let sandbox = null
    let logFunc, errorFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc

    let _createFuncs = (sandbox) => {
        logFunc = sandbox.stub()
        errorFunc = sandbox.stub()
        getMarketImplementAccountDataFunc = sandbox.stub()
        addMarketImplementDataFunc = sandbox.stub()
    }

    function _publish(
        account = "u1",
        elementName = "",
        elementVersion = "",
        inspectorData: any = {},
        customInputs: any = [],
        customActions: any = [],
    ) {
        return publishElementAssembleData(
            [errorFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc],
            account,
            elementName, elementVersion, inspectorData,
            customInputs,
            customActions
        )
    }

    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = createSandbox()
        });
    }

    test('add to collection', ({ given, when, then, and }) => {
        let account = "meta3d"
        let elementName = "test1"
        let elementVersion = "0.0.2"
        let inspectorData: any = {
            element: 1,
            uiControls: []
        }
        let customInputs = [
            {
                name: "Input1",
                fileStr: "f1"
            }
        ]
        let customActions = [
            {
                name: "Actions",
                fileStr: "f2"
            }
        ]
        let marketImplementCollectionData = []

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketImplementAccountDataFunc.returns(
                resolve([])
            )
        });

        when('publish', () => {
            return _publish(
                account,
                elementName,
                elementVersion,
                inspectorData,
                customInputs,
                customActions
            ).drain()
        });

        and('should add to collection', () => {
            expect(addMarketImplementDataFunc).toCalledWith([
                "publishedelementassembledata",
                {
                    "account": account,
                    "elementName": elementName, "elementVersion": elementVersion,
                    "inspectorData": inspectorData,
                    "customInputs": customInputs,
                    "customActions": customActions,
                    "key": "meta3d"
                },
            ])
        });
    });

    test('if element assemble data with the same publisher, element name, element version exist, throw error', ({ given, when, then, and }) => {
        let app = { "app": true }
        let account = "meta3d"
        let elementName = "test1"
        let elementVersion = "0.0.2"
        let inspectorData: any = {
            element: 1,
            uiControls: []
        }

        _prepare(given)

        given('prepare funcs', () => {
            _createFuncs(sandbox)

            getMarketImplementAccountDataFunc.onCall(0).returns(
                resolve([
                ])
            )
            getMarketImplementAccountDataFunc.onCall(1).returns(
                resolve([
                    {
                        elementName: elementName,
                        elementVersion: elementVersion
                    }
                ])
            )
        });

        and('publish', () => {
            return _publish(
                account,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        when('publish with the same publisher, element name, element version', () => {
            return _publish(
                account,
                elementName,
                elementVersion,
                inspectorData
            ).drain()
        });

        then('should error', () => {
            expect(
                errorFunc.getCall(0).args[0]
            ).toEqual(
                "version: 0.0.2 already exist, please update version"
            )
        });
    });

    // test('if not find, return empty', ({ given, when, then, and }) => {
    //     // let app = { "app": true }
    //     let account = "meta3d"
    //     let elementName = "test1"
    //     // let elementVersion = "0.0.2"
    //     // let inspectorData: any = {
    //     //     element: 1,
    //     //     uiControls: []
    //     // }
    //     let getDataWithWhereDataFunc

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         getDataWithWhereDataFunc = sandbox.stub()

    //         getDataWithWhereDataFunc.returns(
    //             resolve([
    //             ])
    //         )
    //     });

    //     when('find the published element version', () => {
    //     });

    //     then('should return empty', () => {
    //         return findPublishNewestElementVersion(
    //             getDataWithWhereDataFunc,
    //             account,
    //             elementName
    //         ).observe(result => {
    //             expect(result).toBeNull()
    //         })
    //     });
    // });

    // test('if find, return published newest element version', ({ given, when, then, and }) => {
    //     let account = "meta3d"
    //     let elementName = "test1"
    //     let elementVersionLow = "0.0.2"
    //     let elementVersionHigh = "0.0.3"
    //     let getDataWithWhereDataFunc

    //     _prepare(given)

    //     given('prepare funcs', () => {
    //         getDataWithWhereDataFunc = sandbox.stub()

    //         getDataWithWhereDataFunc.returns(
    //             resolve([
    //                 {
    //                     elementVersion
    //                 }
    //             ])
    //         )
    //     });

    //     and('publish', () => {
    //     });

    //     when('find the published element version', () => {
    //     });

    //     then('should return the element version', () => {
    //         return findPublishNewestElementVersion(
    //             getDataWithWhereDataFunc,
    //             account,
    //             elementName
    //         ).observe(result => {
    //             expect(getDataWithWhereDataFunc).toCalledWith(
    //                 [
    //                     "publishedelementassembledata", { account, elementName }
    //                 ]
    //             )
    //             expect(result).toEqual(elementVersion)
    //         })
    //     });
    // });
})
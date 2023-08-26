"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const sinon_1 = require("sinon");
const PromiseTool_1 = require("meta3d-tool-utils/src/publish/PromiseTool");
const MarketService_1 = require("../../src/application_layer/market/MarketService");
const BackendService_1 = require("backend-cloudbase/src/application_layer/BackendService");
const feature = (0, jest_cucumber_1.loadFeature)("./test/features/batch_find_publish_contribute_protocol_configs.feature");
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let sandbox = null;
    let batchFindMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc;
    let _createFuncs = (sandbox) => {
        getDataFromMarketProtocolCollectionFunc = BackendService_1.getDataFromMarketProtocolCollection;
    };
    function _batchFindPublishContributeProtocolConfigs(protocolNames) {
        return (0, MarketService_1.batchFindPublishProtocolConfigData)([batchFindMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], "publishedcontributeprotocolconfigs", protocolNames);
    }
    let _prepare = (given) => {
        given('prepare sandbox', () => {
            sandbox = (0, sinon_1.createSandbox)();
        });
    };
    test('batch find publish contribute protocol configs', ({ given, when, then, and }) => {
        let allPublishContributeProtocolConfigs = [
            {
                name: "a1-protocol",
                account: "meta3d",
                version: "0.0.1",
                configStr: "b1"
            },
            {
                name: "a2-protocol",
                account: "user1",
                version: "0.0.2",
                configStr: "b2"
            },
            {
                name: "a3-protocol",
                account: "user2",
                version: "0.0.3",
                configStr: "b3"
            },
        ];
        _prepare(given);
        given('prepare funcs', () => {
            _createFuncs(sandbox);
            batchFindMarketProtocolCollectionFunc = (_, protocolNames) => {
                return (0, PromiseTool_1.resolve)({
                    data: allPublishContributeProtocolConfigs
                        .filter(({ name }) => {
                        return protocolNames.includes(name);
                    })
                        .map((protocolData, index) => {
                        return Object.assign(Object.assign({}, protocolData), { id: index.toString() });
                    })
                });
            };
        });
        and('publish contribute protocol config1', () => {
        });
        and('publish contribute protocol config2', () => {
        });
        when("find all publish contribute protocol configs by [ protocol config1's name, protocol config2's name]", () => {
        });
        then('should return correct data', () => {
            return _batchFindPublishContributeProtocolConfigs([allPublishContributeProtocolConfigs[0].name, allPublishContributeProtocolConfigs[1].name]).observe(result => {
                expect(result).toEqual([allPublishContributeProtocolConfigs[0], allPublishContributeProtocolConfigs[1]]);
            });
        });
    });
});

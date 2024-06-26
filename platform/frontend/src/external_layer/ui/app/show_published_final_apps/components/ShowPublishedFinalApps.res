open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~service: FrontendType.service, ~account) => {
  let dispatch = AppStore.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  // let dispatchApAssembleStore = ReduxUtils.ApAssemble.useDispatch(() => {
  //   let dispatch = AppStore.useDispatch()

  //   assembleSpaceAction => {
  //     dispatch(AppStoreType.AssembleSpaceAction(assembleSpaceAction))
  //   }
  // })

  let release = AppStore.useSelector(({userCenterState}: AppStoreType.state) => {
    let {release} = userCenterState

    release
  })
  // let {importedAppIds} = AppStore.useSelector(({userCenterState}: AppStoreType.state) =>
  //   userCenterState
  // )

  let (refreshValue, refresh) = React.useState(_ => Js.Math.random())
  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishFinalApps, setAllPublishFinalApps) = React.useState(_ => [])
  let (allRecommendPublishFinalApps, setAllRecommendPublishFinalApps) = React.useState(_ => [])
  let (page, setPage) = React.useState(_ => 1)
  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadFinish, setIsDownloadFinish) = React.useState(_ => true)
  let (currentImportingKey, setCurrentImportingKey) = React.useState(_ => None)

  let _onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  let _buildCard = (item: BackendCloudbaseType.publishFinalAppInfo) => {
    <Card
      key={PublishedFinalAppUtils.buildKey(item.account, item.appName)}
      // headStyle={ReactDOM.Style.make(~padding="20px", ())}
      bodyStyle={ReactDOM.Style.make(~padding="20px", ())}
      cover={switch item.previewBase64->Meta3dCommonlib.OptionSt.fromNullable {
      | Some(previewBase64) =>
        <div
          style={ReactDOM.Style.make(
            // ~display="flex",
            // ~alignItems="center",
            // ~justifyContent="center",
            ~padding="20px",
            (),
          )}>
          <Image preview=false src={previewBase64} width=400 height=200 />
        </div>
      | None => React.null
      }}>
      <Card.Meta
        title={<span
          style={ReactDOM.Style.make(
            ~whiteSpace="normal",
            ~wordWrap="break-word",
            ~wordBreak="break-all",
            (),
          )}>
          {React.string(item.appName)}
        </span>}
        description={<Space direction=#vertical size=#middle>
          {React.string(item.description->Js.String.slice(~from=0, ~to_=100, _))}
          <Space direction=#horizontal size=#small>
            {React.string(item.account->Js.String.slice(~from=0, ~to_=10, _))}
            {!isDownloadFinish &&
            currentImportingKey
            ->Meta3dCommonlib.OptionSt.map(currentImportingKey =>
              currentImportingKey == PublishedFinalAppUtils.buildKey(item.account, item.appName)
            )
            ->Meta3dCommonlib.OptionSt.getWithDefault(false)
              ? <Loading text={j`${downloadProgress->Js.Int.toString}% 下载中`} />
              : React.null}
            <Button
              _type=#primary
              onClick={_ => {
                setIsDownloadFinish(_ => false)
                setCurrentImportingKey(_ =>
                  PublishedFinalAppUtils.buildKey(item.account, item.appName)->Some
                )

                PublishedFinalAppUtils.exportSingleEventFile(
                  service,
                  (
                    setDownloadProgress,
                    () => {
                      setIsDownloadFinish(_ => true)
                      setCurrentImportingKey(_ => None)
                    },
                  ),
                  // eventEmitter,
                  // notUseCacheForFindFinalApp,
                  // release,
                  item,
                )
              }}>
              {React.string(`导出`)}
            </Button>
            <Button
              _type=#default
              onClick={_ => {
                LinkUtils.openLink(
                  PublishedFinalAppUtils.buildURL(
                    item.account,
                    item.appName,
                    (release->Meta3dCommonlib.OptionSt.getExn).version,
                  ),
                )
              }}>
              {React.string(`运行`)}
            </Button>
          </Space>
        </Space>}
      />
    </Card>
  }

  let _buildCards = allPublishFinalApps => {
    <Row gutter={[16, 24]}>
      {allPublishFinalApps
      ->Meta3dCommonlib.ArraySt.map(item => {
        <Col span={8}> {_buildCard(item)} </Col>
      })
      ->React.array}
    </Row>
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"ShowPublishedFinalApps"} =>
      setAllPublishFinalApps(_ => [])
      setIsLoaded(_ => false)
      refresh(_ => Js.Math.random())

      setPage(_ => 1)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.findAllPublishFinalApps(. MarketUtils.getLimitCount(), 0)
    ->Meta3dBsMostDefault.Most.observe(allPublishFinalApps => {
      setAllPublishFinalApps(_ => allPublishFinalApps)
    }, _)
    ->Js.Promise.then_(() => {
      service.backend.findAllRecommendPublishFinalApps(.)->Meta3dBsMostDefault.Most.observe(
        allRecommendPublishFinalApps => {
          setAllRecommendPublishFinalApps(_ => allRecommendPublishFinalApps)
          setIsLoaded(_ => true)
        },
        _,
      )
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      MessageUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)
    ->ignore

    None
  }, [refreshValue])

  <Layout>
    <Layout.Header>
      <Nav currentKey="3" account={account} />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <Loading text={j`加载中，请稍候`} />
        : <>
            <Typography.Title> {React.string({j`推荐`})} </Typography.Title>
            {_buildCards(allRecommendPublishFinalApps)}
            <Typography.Title> {React.string({j`所有`})} </Typography.Title>
            {_buildCards(
              MarketUtils.getCurrentPage(allPublishFinalApps, page, MarketUtils.getPageSize()),
            )}
          </>}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={MarketUtils.getPageSize()}
          total={allPublishFinalApps->Meta3dCommonlib.ArraySt.length}
          showSizeChanger=false
          onChange=_onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}

open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getUIControls = SelectedContributesUtils.getUIControls

  let _findSkin = (
    service,
    protocolConfigStr,
    selectedContributes,
  ): FrontendUtils.ElementAssembleStoreType.skin => {
    let {data} =
      SkinUtils.findSkins(
        service,
        Meta3dCommonlib.Exception.throwErr,
        protocolConfigStr,
        selectedContributes,
      )[0]

    {
      skinName: (
        service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic
      )["skinName"],
    }
  }

  let selectUIControl = (
    service,
    dispatch,
    selectedContributes,
    protocolIconBase64,
    protocolConfigStr,
    name,
    data,
  ) => {
    let protocolConfigStr = protocolConfigStr->Meta3dCommonlib.OptionSt.getExn

    dispatch(
      FrontendUtils.ElementAssembleStoreType.SelectUIControl(
        protocolIconBase64,
        protocolConfigStr,
        name,
        data,
        _findSkin(service, protocolConfigStr, selectedContributes),
      ),
    )
  }

  let useSelector = ({selectedContributes}: FrontendUtils.ApAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let selectedContributes = ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  // TODO duplicate with ap view
  <List
  // grid={{gutter: 16, column: 3}}
    dataSource={selectedContributes->Method.getUIControls->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, newName, protocolIconBase64, protocolConfigStr, data}) => {
      let name = NewNameUtils.getName(newName, data.contributePackageData.name)

      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
              Method.selectUIControl(
                service,
                dispatch,
                selectedContributes,
                protocolIconBase64,
                protocolConfigStr,
                name,
                data,
              )
            }, 5->Some)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
        </Card>
      </List.Item>
    }}
  />
}
let buildEmptySelectOptionValue = () => "empty"

let isEmptySelectOptionValue = value =>
  value === buildEmptySelectOptionValue() || value->Obj.magic === Js.Nullable.undefined

let buildSelect = (onChange, defaultValue, values) => {
  open Antd

  <Select key={KeyUtils.generateUniqueKey(Js.Math.random)} defaultValue={defaultValue} onChange>
    <Select.Option key={buildEmptySelectOptionValue()} value={buildEmptySelectOptionValue()}>
      {React.string({buildEmptySelectOptionValue()})}
    </Select.Option>
    {values
    ->Meta3dCommonlib.ArraySt.map(value => {
      <Select.Option key={value} value={value}> {React.string({value})} </Select.Option>
    })
    ->React.array}
  </Select>
}

let buildSelectWithoutEmpty = (onChange, defaultValue, values) => {
  open Antd

  <Select key={KeyUtils.generateUniqueKey(Js.Math.random)} defaultValue={defaultValue} onChange>
    {values
    ->Meta3dCommonlib.ArraySt.map(value => {
      <Select.Option key={value} value={value}> {React.string({value})} </Select.Option>
    })
    ->React.array}
  </Select>
}

let buildSelectWithKeysAndWithoutEmpty = (onChange, defaultValue, keys, values) => {
  open Antd

  <Select key={KeyUtils.generateUniqueKey(Js.Math.random)} defaultValue={defaultValue} onChange>
    {values
    ->Meta3dCommonlib.ArraySt.mapi((value, i) => {
      <Select.Option key={keys->Meta3dCommonlib.ArraySt.getExn(i)} value={value}>
        {React.string({keys->Meta3dCommonlib.ArraySt.getExn(i)})}
      </Select.Option>
    })
    ->React.array}
  </Select>
}

let buildSelect2 = () => React.null
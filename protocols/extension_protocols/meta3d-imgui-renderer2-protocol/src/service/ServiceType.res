type time = float

type color = (float, float, float)

type clearColor = (float, float, float, float)

type label = string

// @genType
type service = {
  init: (. StateType.state, bool, Dom.htmlCanvasElement) => Js.Promise.t<StateType.state>,
  render: (. StateType.state) => StateType.state,
  beforeExec: (. StateType.state, time) => StateType.state,
  afterExec: (. StateType.state) => StateType.state,
  clear: (. StateType.state, clearColor) => unit,
  beginWindow: (. label, StateType.state) => StateType.state,
  endWindow: (. StateType.state) => StateType.state,
}
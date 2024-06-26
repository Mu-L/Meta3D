type key = string

type ref

type rec treeData = {
  title: React.element,
  key: key,
  // icon: Js.Nullable.t<React.element>,
  icon: React.element,
  children: array<treeData>,
}

type allTreeData = array<treeData>

type keys = array<key>

type node = {
  key: key,
  title: string,
}

type selectedNode = {
  key: key,
  title: string,
}

type info = {
  event: string,
  selected: bool,
  node: node,
  selectedNodes: array<selectedNode>,
}

@module("antd") @react.component
external make: (
  ~autoExpandParent:bool=?,
  ~expandAction:bool = ?,
  ~treeData: allTreeData=?,
  ~expandedKeys: keys=?,
  ~selectedKeys: keys=?,
  ~autoExpandParent: bool=?,
  ~onExpand: keys => unit=?,
  ~onSelect: (keys, info) => unit=?,
  ~showIcon: bool=?,
) => React.element = "Tree"

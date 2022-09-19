open EventManagerStateType

open EventType

let getLastXY = ({mouseEventData}) => (mouseEventData.lastX, mouseEventData.lastY)

let setLastXY = (lastX, lastY, {mouseEventData} as eventData) => {
  ...eventData,
  mouseEventData: {
    ...mouseEventData,
    lastX: lastX,
    lastY: lastY,
  },
}

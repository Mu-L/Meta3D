open Sinon

let buildService = (
  ~sandbox,
  ~init=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~clear=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~render=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beforeExec=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~afterExec=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setStyle=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beginWindow=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~endWindow=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beginChild=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~endChild=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setNextWindowRect=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~addFBOTexture=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getWindowBarHeight=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getContext=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~button=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setCursorPos=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~loadImage=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~asset=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~handleDragDropTarget=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~menu=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~tree=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~inspector=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~switchButton=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imageButton=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~inputText=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~inputFloat1=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~inputFloat3=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~checkbox=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~collapsing=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~image=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~openModal=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~closeCurrentModal=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beginModal=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~endModal=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~popup=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~imagePopup=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~dummy=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getItemRectMax=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getItemRectSize=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getWindowPos=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getWindowSize=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): Meta3dImguiRendererProtocol.ServiceType.service => {
  {
    init,
    clear,
    render,
    beforeExec,
    afterExec,
    setStyle,
    beginWindow,
    endWindow,
    beginChild,
    endChild,
    setNextWindowRect,
    addFBOTexture,
    getWindowBarHeight,
    getContext,
    button,
    setCursorPos,
    loadImage,
    asset,
    handleDragDropTarget: handleDragDropTarget->Obj.magic,
    menu,
    tree,
    inspector,
    switchButton,
    imageButton,
    inputText,
    inputFloat1,
    inputFloat3,
    checkbox,
    collapsing,
    image,
    openModal,
    closeCurrentModal,
    beginModal,
    endModal,
    popup,
    imagePopup,
    dummy,
    getItemRectMax,
    getItemRectSize,
    getWindowPos,
    getWindowSize,
  }
}

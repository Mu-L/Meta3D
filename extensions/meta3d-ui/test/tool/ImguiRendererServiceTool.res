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
  ~setNextWindowRect=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~button=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setCursorPos=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): Meta3dImguiRendererProtocol.ServiceType.service => {
  {
    init: init,
    clear: clear,
    render: render,
    beforeExec: beforeExec,
    afterExec: afterExec,
    setStyle: setStyle,
    beginWindow: beginWindow,
    endWindow: endWindow,
    setNextWindowRect: setNextWindowRect,
    button: button,
    setCursorPos: setCursorPos,
  }
}

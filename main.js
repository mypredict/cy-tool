let getTime = document.querySelectorAll('.time')
getTime[0].innerHTML = cyTool.weekTime()
getTime[1].innerHTML = cyTool.staticTime()
getTime[2].innerHTML = cyTool.staticTime('-')
getTime[3].innerHTML = cyTool.staticTime('/', '-')
getTime[4].innerHTML = cyTool.staticTime('~', '+', '-')
getTime[5].innerHTML = cyTool.movingTime('*', '^')
setInterval(() => {
  getTime[5].innerHTML = cyTool.movingTime('*', '^')
}, 1000)

cyTool.cyLazyload(() => {
  let rangeNode = document.body
  let moveNode = document.getElementById('drag-area')
  let dragNode = document.getElementById('drag-div')
  cyTool.cyDrag(moveNode, rangeNode, dragNode)

  let container = document.getElementById('canv')
  let preview = document.getElementById('pre')
  let upload = document.getElementById('input')
  let submit = document.getElementById('submit')
  cyTool.cyCutImage(container, preview, upload, submit, (value) => {
    console.log('这是截取图片的base64编码:'+value)
  }, 5000)
}, 500)

# cy-tool
一个小的原生js功能库, 通过script标签引入
## 功能一 (根据输入的参数返回不同格式的时间样式) :
  cyTool.weekTime()   // 星期几, 只有一种样式
  cyTool.staticTime() // 默认时间样式
  cyTool.staticTime('-') // 传一个参数
  cyTool.staticTime('/', '-') // 传两个参数
  cyTool.staticTime('~', '+', '-') // 传多个参数, 只取前两个参数
  cyTool.movingTime('*', '^') // 获取的时间精确到秒, 可配合setInterval显示时间
## 功能二 (点击事件节流, 用户多次点击时固定时间内生效一次)
  // 参数分别是 要点击的元素
  // 点击后执行的函数
  // (可选)多次点击多久生效一次(不传参默认2s)
  cyTool.cyClick(btn, fn, delay)
## 功能三 (传入要拖动的元素可进行拖动)
  // 参数分别是 要移动的元素(position值为 fixed 或者 absolute)
  // 要移动元素的边界元素(必须是 movenode 的父辈元素)
  // (可选) 要点击的识别元素, 不填默认整个movenode元素都可被拖动识别
  cyTool.cyDrag(moveNode, rangeNode, dragNode)
## 功能四 (检测页面距离底部距离进行动态加载资源)
  // 达到页面底部后触发的回调函数
  // (可选) 距离底部多远时触发, 默认为1000px
  cyTool.cyLazyload(fn, num)
## 功能五 (图片的剪切)
  // 参数分别是 提供的剪切图片的背景层
  // 预览图片的背景层
  // input(type=file)的上传图片的按钮
  // 提交的按钮
  // 提交按钮后的回调函数(base64编码图片数据)
  // (可选) 用户多次点击时, 多久生效一次
  cyTool.cyCutImage(container, preview, upload, submit, fn, num)

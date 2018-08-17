let cyTool = (function () {
  // 参数分别是 要点击的元素
  // 点击后执行的函数
  // (可选)多次点击多久生效一次(不传参默认2s)
  function cyClick (btn, fn, delay = 2000) {
    let isContinue = true
    btn.onclick = function () {
      if (isContinue) {
        isContinue = false
        setTimeout(() => {
          isContinue = true
        }, delay)
        // 回调函数的this指向点击的元素
        fn.call(btn)
      }
    }
  }
  return {
    cyClick
  }
})()
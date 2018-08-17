let cyLazyload = (function () {
  // 达到页面底部后触发的回调函数
  // (可选) 距离底部多远时触发, 默认为1000px
  function cyLazyload (fn, num = 1000) {
    let distanceBottom = 0
    let isDoSomething = true
    window.addEventListener('scroll', () => {
      distanceBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight
      distanceBottom > num ? isDoSomething = true : ''
      // 防止不断触发, 只有距离页面底部超过 num 再小于 num才再次触发
      if (distanceBottom < num && isDoSomething) {
        fn()
        isDoSomething = false
      }
    })
  }
  return {
    cyLazyload
  }
})()
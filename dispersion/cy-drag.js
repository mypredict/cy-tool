let cyTool = (function () {
  // 参数分别是 要移动的元素(position值为 fixed 或者 absolute)
  // 要移动元素的边界元素(必须是 movenode 的父辈元素)
  // (可选) 要点击的识别元素, 不填默认整个movenode元素都可被拖动识别
  function cyDrag (moveNode, rangeNode, dragNode) {
    let isMove = false  // 元素是否可拖动
    let mouseX = 0      // 鼠标横坐标
    let mouseY = 0      // 鼠标纵坐标
    let moveNodeX = 0   // 移动节点的横坐标
    let moveNodeY = 0   // 纵坐标
    let borderX = 0     // 边界横坐标
    let borderY = 0     // 边界纵坐标
    // 鼠标按下时
    document.documentElement.addEventListener('mousedown', (e) => {
      if (!dragNode) {
        dragNode = moveNode
      }
      if (dragNode === e.target) {
        document.documentElement.onselectstart = function () { 
          return false
        }
        isMove = true
        mouseX = e.clientX
        mouseY = e.clientY
        moveNodeX = moveNode.offsetLeft
        moveNodeY = moveNode.offsetTop
        borderX = rangeNode.clientWidth - moveNode.offsetWidth
        borderY = rangeNode.clientHeight - moveNode.offsetHeight
      }
    })
    // 鼠标移动时
    document.documentElement.addEventListener('mousemove', (e) => {
      if (isMove) {
        moveLeft = moveNodeX + e.clientX - mouseX
        moveTop = moveNodeY + e.clientY - mouseY
        moveLeft < 0 ? moveLeft = 0 : ''
        moveLeft > borderX ? moveLeft = borderX : ''
        moveTop < 0 ? moveTop = 0 : ''
        moveTop > borderY ? moveTop = borderY : ''
        moveNode.style.left = moveLeft + 'px'
        moveNode.style.top = moveTop + 'px'
      }
    })
    // 鼠标抬起时
    document.documentElement.addEventListener('mouseup', () => {
      isMove = false
      document.documentElement.onselectstart = function () { 
        return true
      }
    })
  }
  return {
    cyDrag
  }
})()
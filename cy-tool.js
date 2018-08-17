let cyTool = (function () {
  let nowTime, year, month, date, hours, minutes, seconds
  let shape1 = ''
  let shape2 = ''
  function getTime () {
    nowTime = new Date()
    year = nowTime.getFullYear()
    month = nowTime.getMonth() + 1
    date = nowTime.getDate()
    hours = nowTime.getHours()
    minutes = nowTime.getMinutes()
    seconds = nowTime.getSeconds()
    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
  }
  function shapeTime (shapeLen, shapes) {
    let returnStr = ''
    switch (shapeLen) {
      case 0:
        shape2 = ':'
        returnStr = `${year}-${month}-${date} ${hours}:${minutes}`
        break
      case 1:
        shape2 = shape1 = shapes[0]
        returnStr = `${year}${shape1}${month}${shape1}${date} ${hours}${shape1}${minutes}`
        break
      case 2:
      default:
        shape1 = shapes[0]
        shape2 = shapes[1]
        returnStr = `${year}${shape1}${month}${shape1}${date} ${hours}${shape2}${minutes}`
        break
    }
    return returnStr
  }
  function staticTime (...shapes) {
    getTime(shapes)
    return shapeTime(shapes.length, shapes)
  }
  function movingTime (...shapes) {
    getTime(shapes)
    return `${shapeTime(shapes.length, shapes)}${shape2}${seconds}`
  }
  function weekTime () {
    let weekDay = ''
    nowTime = new Date()
    switch (nowTime.getDay()) {
      case 0: weekDay = '星期日'; break;
      case 1: weekDay = '星期一'; break;
      case 2: weekDay = '星期二'; break;
      case 3: weekDay = '星期三'; break;
      case 4: weekDay = '星期四'; break;
      case 5: weekDay = '星期五'; break;
      case 6: weekDay = '星期六'; break;
    }
    return weekDay
  }
  function cyClick (btn, fn, delay = 2000) {
    let isContinue = true
    btn.onclick = function () {
      if (isContinue) {
        isContinue = false
        setTimeout(() => {
          isContinue = true
        }, delay)
        fn.call(btn)
      }
    }
  }
  function cyLazyload (fn, num = 1000) {
    let distanceBottom = 0
    let isDoSomething = true
    window.addEventListener('scroll', () => {
      distanceBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight
      distanceBottom > num ? isDoSomething = true : ''
      if (distanceBottom < num && isDoSomething) {
        fn()
        isDoSomething = false
      }
    })
  }
  function cyDrag (moveNode, rangeNode, dragNode) {
    let isMove = false
    let mouseX = 0
    let mouseY = 0
    let moveNodeX = 0
    let moveNodeY = 0
    let borderX = 0
    let borderY = 0
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
    document.documentElement.addEventListener('mouseup', () => {
      isMove = false
      document.documentElement.onselectstart = function () { 
        return true
      }
    })
  }
  function cyCutImage (container, preview, upload, submit, fn, num=2000) {
    let isHaveImg = false
    let isLeave = true
    let mouseX = 0
    let mouseY = 0
    let isMove = false
    let theImg = null
    let imgW = 0
    let imgH = 0
    let imgWH = 0
    let containerW = container.offsetWidth * 2
    let containerH = container.offsetHeight * 2
    let containerWH = containerW / containerH
    let dormerL = Math.round(containerWH >=1 ? containerH * 5 / 8 : containerW * 5 / 8)
    let dormerLeft = Math.round((containerW - dormerL) / 2)
    let dormerTop = Math.round((containerH - dormerL) / 2)
    let moveLeft = 0
    let moveTop = 0
    let beginLeft = 0
    let beginTop = 0
    container.innerHTML = '<canvas id="cy-cvs" style="background: #EBEA89"></canvas>'
    let theCvs = document.getElementById('cy-cvs')
    theCvs.width = containerW
    theCvs.height = containerH
    theCvs.style.width = containerW / 2 + 'px'
    theCvs.style.height = containerH / 2 + 'px'
    let ctx = theCvs.getContext('2d')
    preview.innerHTML = '<canvas id="cy-preview-cvs" style="background: #EBEA89"></canvas>'
    let previewCvs = document.getElementById('cy-preview-cvs')
    previewCvs.height = previewCvs.width = dormerL
    previewCvs.style.width = previewCvs.style.height = dormerL / 2 + 'px'
    let previewCtx = previewCvs.getContext('2d')
    upload.oninput = function () {
      theImg = upload.files[0]
      initCvs()
    }
    theCvs.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    theCvs.addEventListener('drop', (e) => {
      e.preventDefault()
      if (e.dataTransfer.files[0].type.indexOf('image/') === 0){
        theImg = e.dataTransfer.files[0]
        initCvs()
      } else {
        alert('图片格式错误')
      }  
    })
    function initCvs () {
      let imgReader = new FileReader()
      imgReader.readAsDataURL(theImg)
      imgReader.onload = (e) => {
        theImg = new Image()
        theImg.src = e.target.result
        theImg.onload = () => {
          upload.value = null
          imgW = theImg.width
          imgH = theImg.height
          imgWH = imgW / imgH
          if (imgWH >= containerWH) {
            theImg.width = containerW
            theImg.height = containerW / imgWH
            moveLeft = 0
            moveTop = Math.round((containerH - theImg.height) / 2)
          } else {
            theImg.height = containerH
            theImg.width = containerH * imgWH
            moveLeft = Math.round((containerW - theImg.width) / 2)
            moveTop = 0
          }
          drawImage()
          isHaveImg = true
        }
      }
    }
    theCvs.onmouseenter = function () {
      isLeave = false
      if (isHaveImg) {
        document.documentElement.addEventListener('mousedown', mousedownEvent)
        document.documentElement.addEventListener('mousemove', mousemoveEvent)
        document.documentElement.addEventListener('mouseup', mouseupEvent)
        document.documentElement.addEventListener('mousewheel', mousewheelEvent)
        document.documentElement.addEventListener('DOMMouseScroll', DOMMouseScrollEvent)
      }
    }
    theCvs.onmouseleave = function () {
      isLeave = true
      document.documentElement.removeEventListener('mousewheel', mousewheelEvent)
      document.documentElement.removeEventListener('DOMMouseScroll', DOMMouseScrollEvent)
    }
    function mousewheelEvent (e) {
      e.preventDefault()
      wheelZoom(e.wheelDelta)
    }
    function DOMMouseScrollEvent (e) {
      e.preventDefault()
      wheelZoom(-e.detail * 30)
    }
    function wheelZoom (num) {
      if (imgWH > 1) {
        theImg.height += num / 10
        theImg.width = theImg.height * imgWH
      } else {
        theImg.width += num / 10
        theImg.height = theImg.width / imgWH
      }
      if (Math.min(theImg.width, theImg.height) >= dormerL || num > 0) {
        if (imgWH > 1) {
          moveTop -= num / 20
          moveLeft -= num / 20 * imgWH
        } else {
          moveLeft -= num / 20
          moveTop -= num / 20 / imgWH
        }
      } else {
        if (imgWH >= 1) {
          theImg.height = dormerL
          theImg.width = dormerL * imgWH
        } else {
          theImg.width = dormerL
          theImg.height = dormerL / imgWH
        }
      }
      planBorder()
    }
    function planBorder () {
      let borderX = Math.round((containerW + dormerL) / 2 - theImg.width)
      let borderY = Math.round((containerH + dormerL) / 2 - theImg.height)
      moveLeft > dormerLeft ? moveLeft = dormerLeft : ''
      moveLeft < borderX ? moveLeft = borderX : ''
      moveTop > dormerTop ? moveTop = dormerTop : ''
      moveTop < borderY ? moveTop = borderY : ''
      requestAnimationFrame(drawImage)
    }
    function mousedownEvent (e) {
      if (theCvs === e.target) {
        isMove = true
        mouseX = e.clientX
        mouseY = e.clientY
        beginLeft = moveLeft
        beginTop = moveTop
        document.documentElement.onselectstart = function () { 
          return false
        }
      }
    }
    function mousemoveEvent (e) {
      if (isMove) {
        moveLeft = (e.clientX - mouseX) * 2 + beginLeft
        moveTop = (e.clientY - mouseY) * 2 + beginTop
        planBorder()
      }
    }
    function mouseupEvent () {
      isMove = false
      document.documentElement.onselectstart = function () { 
        return true
      }
      if (isLeave) {
        document.documentElement.removeEventListener('mousedown', mousedownEvent)
        document.documentElement.removeEventListener('mousemove', mousemoveEvent)
        document.documentElement.removeEventListener('mouseup', mouseupEvent)
      }
    }
    function drawImage () {
      ctx.clearRect(0, 0, containerW, containerH)
      ctx.drawImage(theImg, moveLeft, moveTop, theImg.width, theImg.height)
      ctx.save()
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.fillRect(0, 0, containerW, containerH)
      ctx.fillStyle = 'rgba(255, 255, 255, 10)'
      ctx.fillRect(dormerLeft, dormerTop, dormerL, dormerL)
      ctx.restore()
      ctx.save()
      ctx.beginPath()
      ctx.rect(dormerLeft, dormerTop, dormerL, dormerL)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(theImg, moveLeft, moveTop, theImg.width, theImg.height)
      ctx.restore()
      let previewData = ctx.getImageData(dormerLeft, dormerTop, dormerL, dormerL)
      previewCtx.clearRect(0, 0, dormerL, dormerL)
      previewCtx.putImageData(previewData, 0, 0)
    }
    cyClick(submit, () => {
      isHaveImg ? fn(previewCvs.toDataURL('image/jpg', 0.95)) : ''
    }, num)
  }
  return {
    staticTime,
    movingTime,
    weekTime,
    cyClick,
    cyLazyload,
    cyDrag,
    cyCutImage
  }
})()
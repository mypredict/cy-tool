let cyTime = (function () {
  let nowTime, year, month, date, hours, minutes, seconds
  let shape1 = ''
  let shape2 = ''
  // 得到时间
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
  // 格式化时间
  // 参数是 参数的数量判断
  // 参数格式判断
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
  // 只获取一次时间调用的方法
  function staticTime (...shapes) {
    getTime(shapes)
    return shapeTime(shapes.length, shapes)
  }
  // 循环调用时间的方法(添加了秒)
  function movingTime (...shapes) {
    getTime(shapes)
    return `${shapeTime(shapes.length, shapes)}${shape2}${seconds}`
  }
  // 得到星期几的方法
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
  return {
    staticTime,
    movingTime,
    weekTime
  }
})()
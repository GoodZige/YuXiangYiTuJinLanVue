// 传入数组获取两点
export function getTwoPoint(length, array) {
  let result = {
      posit1: '',
      posit2: '',
      sum: length,
      finalArray: []
  }
  for (let index = 0; index < array.length; index++) {
      let lonLat1 = array[index]
      let lonLat2 = array[index+1]
      let m = getDistance(lonLat1[0], lonLat1[1], lonLat2[0], lonLat2[1])
      let tempVal = result.sum - m
      if(tempVal >= 0) {
          result.sum = tempVal
      }
      result.finalArray.push(lonLat1)
      if(tempVal <= 0){
          result.posit1 = lonLat1
          result.posit2 = lonLat2
          break;
      }
  }
  result.finalArray.push(distanceCalculator(result.sum, result.posit1, result.posit2))
  return result.finalArray
}
// 返回结果是第一个点到第二个点中间第几米的经纬度
export function distanceCalculator(num, lonLat1, lonLat2) {
  // m 经纬度差
  let m = getDistance(lonLat1[0], lonLat1[1], lonLat2[0], lonLat2[1])
  let lonDifference = (lonLat2[0] - lonLat1[0]) / m
  let latDifference = (lonLat2[1] - lonLat1[1]) / m
  return [lonLat1[0] + (lonDifference * num), lonLat1[1] + (latDifference * num)]
}
/**
* 根据经纬度计算距离，参数分别为第一点的经度，纬度；第二点的经度，纬度
* 经纬度转换成三角函数中度分表形式。
*/
export function getDistance(lng1, lat1, lng2, lat2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  
  var distance = s;
  var distance_str
  
  if (parseInt(distance) >= 1) {
      distance_str = distance.toFixed(1) + "km";
  } else {
      distance_str = distance * 1000 + "m";
  }
  // 输出为米
  return s * 1000;
}
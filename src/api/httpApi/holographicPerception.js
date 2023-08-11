import request from '@/utils/request'

// 获取设备状态
export function deviceStatus(params) {
  return request({
    url: '/device/status',
    method: 'get',
    params: params
  })
}
// 获取区域信息
export function getArea(data) {
  return request({
    url: '/area/getArea',
    method: 'post',
    data: data
  })
}
import request from '@/utils/request'
export function policy() {
  return request({
    url:'/oss/token',
    method:'get',
  })
}

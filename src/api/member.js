import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    url:'/member/list',
    method:'get',
    params:params
  })
}

import request from '@/utils/request'

export function getPermissionTreeList(params) {
  return request({
    url:'/permission/treeList',
    method:'get',
    params:params
  })
}

export function getPermissionMenu() {
  return request({
    url:'/permission/getMenus',
    method:'get'
  })
}

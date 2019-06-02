import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url:'/role/list',
    method:'get',
    params:params
  })
}

export function getRolePermissionList(roleId) {
  return request({
    url:'/role/permission/' + roleId,
    method:'get',
  })
}

export function updateRoleInfo(roleId, data) {
  return request({
    url:'/role/update/' + roleId,
    method:'post',
    data: data
  })
}

export function createRole(data) {
  return request({
    url:'/role/create',
    method:'post',
    data: data
  })
}


export function updateRolePermission(data) {
  return request({
    url:'/role/permission/update',
    method:'post',
    params: data
  })
}

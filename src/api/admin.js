import request from '@/utils/request'

export function getAdminList(params) {
  return request({
    url:'/admin/list',
    method:'get',
    params:params
  })
}

export function adminRegister(data) {
  return request({
    url:'/admin/register',
    method:'post',
    data:data
  })
}

export function updateAdmin(id, data) {
  return request({
    url:'/admin/update/'+id,
    method:'post',
    data:data
  })
}

export function getAdminInfo(id) {
  return request({
    url:'/admin/'+id,
    method:'get'
  })
}

export function getAdminRole(id) {
  return request({
    url:'/admin/role/'+id,
    method:'get'
  })
}

export function updateAdminRole(data) {
  return request({
    url:'/admin/role/update',
    method:'post',
    params:data
  })
}

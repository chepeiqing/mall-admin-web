import request from '@/utils/request'

export function addExpense(data) {
  return request({
    url:'/expense/insert',
    method:'post',
    data:data
  })
}

export function getExpenseList(params) {
  return request({
    url:'/expense/list',
    method:'get',
    params:params
  })
}

export function getExpenseItem(id) {
  return request({
    url:'/expense/getItem/'+id,
    method:'get',
  })
}

export function updateExpense(data) {
  return request({
    url:'/expense/update',
    method:'post',
    data:data
  })
}

export function deleteExpense(id) {
  return request({
    url:'/expense/delete/'+id,
    method:'delete',
  })
}

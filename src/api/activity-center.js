import request from '@/utils/request'

export function queryActivityPage(query) {
  return request({
    url: '/admin/activity/page',
    method: 'post',
    data: query
  })
}

export function queryActivityMemberPage(query) {
  return request({
    url: '/admin/activity-member/page',
    method: 'post',
    data: query
  })
}

export function queryActivityInfo(query) {
  return request({
    url: '/admin/activity/info',
    method: 'post',
    params: query
  })
}

export function createActivity(params) {
  return request({
    url: '/admin/activity/save',
    method: 'post',
    data: params
  })
}

export function editActivity(params) {
  return request({
    url: '/admin/activity/update',
    method: 'post',
    data: params
  })
}
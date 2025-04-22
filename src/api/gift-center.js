import request from '@/utils/request'

export function queryGiftPage(query) {
  return request({
    url: '/admin/gifts/page',
    method: 'post',
    data: query
  })
}

export function queryGiftInfo(query) {
  return request({
    url: '/admin/gifts/info',
    method: 'post',
    data: query
  })
}

export function editGift(params) {
  return request({
    url: '/admin/gifts/update',
    method: 'post',
    data: params
  })
}

export function createGift(params) {
  return request({
    url: '/admin/gifts/save',
    method: 'post',
    data: params
  })
}
import request from '@/utils/request'

export function queryMemberPage(query) {
  return request({
    url: '/admin/member/page',
    method: 'post',
    data: query
  })
}
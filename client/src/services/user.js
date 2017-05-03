import request from '../utils/request';

export function user() {
  return request('/api/user/info');
}

export function following() {
  return request('/api/relation/following');
}

export function follower() {
  return request('/api/relation/follower');
}

export function fetchAll(id) {
  return request(`/api/relation/all?otherId=${id}`);
}

// export function vote_launch() {
//   return request('/api/relation/follower');
// }

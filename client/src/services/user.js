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
  const url = id === undefined ? '/api/relation/all' : `/api/relation/all?otherId=${id}`;
  return request(url);
}

export function follow(relation) {
  return request('/api/relation/tofollow', {
    method: 'POST',
    body: JSON.stringify(relation),
  });
}

export function unfollow(relation) {
  return request('/api/relation/unfollow', {
    method: 'POST',
    body: JSON.stringify(relation),
  });
}

// export function vote_launch() {
//   return request('/api/relation/follower');
// }

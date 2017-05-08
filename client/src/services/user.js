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

export function tofollow(relation) {
  return request('/api/relation/tofollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(relation),
  });
}

export function unfollow(relation) {
  return request('/api/relation/unfollow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(relation),
  });
}

export function reg(newuser) {
  return request('/api/user/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newuser),
  });
}

export function login(newuser) {
  return request('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newuser),
  });
}

export function logout() {
  return request('/api/user/logout');
}

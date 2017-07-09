import request from '../utils/request';
import { API } from '../constants';

export function user() {
  return request(`${API}/user/info`);
}

export function hotuser() {
  return request(`${API}/user/hotuser`);
}

export function edit(edituser) {
  return request(`${API}/user/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(edituser),
  });
}

export function following() {
  return request(`${API}/relation/following`);
}

export function follower() {
  return request(`${API}/relation/follower`);
}

export function fetchAll(id) {
  const url = id === undefined ? `${API}/relation/all` : `${API}/relation/all?otherId=${id}`;
  return request(url);
}

export function tofollow(relation) {
  return request(`${API}/relation/tofollow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(relation),
  });
}

export function unfollow(relation) {
  return request(`${API}/relation/unfollow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(relation),
  });
}

export function reg(newuser) {
  return request(`${API}/user/reg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newuser),
  });
}

export function login(newuser) {
  return request(`${API}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newuser),
  });
}

export function logout() {
  return request(`${API}/user/logout`);
}

export function search(key) {
  return request(`${API}/common/search/${key}`);
}

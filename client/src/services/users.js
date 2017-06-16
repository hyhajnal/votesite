import request from '../utils/request';
import { API } from '../constants';

export function fetch() {
  // Get请求
  return request(`${API}/stu/list`);
}

export function remove(id) {
  return request(`${API}/stu/delete/${id}`);
}

export function create(stu) {
  return request(`${API}/stu/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stu),
  });
}

export function edit(stu) {
  return request(`${API}/stu/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stu),
  });
}

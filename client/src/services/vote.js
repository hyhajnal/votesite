import request from '../utils/request';

// Vote

export function fetch() {
  return request('/api/vote/list');
}

export function fetchVote(_id) {
  return request(`/api/vote/detail/${_id}`);
}

export function toVote({ voteId, idx }) {
  return request(`/api/vote/tovote/${voteId}/${idx}`);
}

export function toFollow(voteId) {
  return request(`/api/vote/follow/${voteId}`);
}

export function delVote(id) {
  return request(`/api/vote/delete/${id}`, {
    method: 'DELETE',
  });
}

export function editVote({ vote }) {
  return request('/api/vote/edit', {
    method: 'PATCH',
    body: JSON.stringify(vote),
  });
}

// Comment

export function toComment({ comment, pid }) {
  return request(`/api/comment/create/${pid}`, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
}

export function toStar(commentId) {
  return request(`/api/comment/star/${commentId}`);
}

export function delComment(commentId) {
  return request(`/api/comment/delete/${commentId}`, {
    method: 'DELETE',
  });
}

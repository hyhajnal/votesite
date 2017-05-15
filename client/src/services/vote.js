import request from '../utils/request';
import { LIMIT } from '../constants';

// Vote

export function fetchList({ query, page }) {
  return request(`/api/vote/list/${page}/${LIMIT}${query}`);
}

export function fetchVote(_id) {
  return request(`/api/vote/detail/${_id}`);
}

export function fetchTopics() {
  return request('/api/vote/topics');
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

export function createVote({ vote }) {
  return request('/api/vote/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote),
  });
}

export function editVote({ vote, id }) {
  return request(`/api/vote/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote),
  });
}

// Comment

export function toComment(comment) {
  return request('/api/comment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
}

export function toStar(commentId) {
  return request(`/api/comment/star/${commentId}`);
}

export function delComment(commentId, pid, voteId) {
  return request(`/api/comment/delete/${commentId}/${pid}/${voteId}`, {
    method: 'DELETE',
  });
}

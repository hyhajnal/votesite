import request from '../utils/request';
import { LIMIT, API } from '../constants';

// Vote

export function fetchList({ query, page }) {
  return request(`${API}/vote/list/${page}/${LIMIT}${query}`);
}

export function fetchVote(_id) {
  return request(`${API}/vote/detail/${_id}`);
}

export function fetchTopics() {
  return request(`${API}/vote/topics`);
}

export function toVote({ voteId, idx }) {
  return request(`${API}/vote/tovote/${voteId}/${idx}`);
}

export function changestateVote({ voteId, tostart }) {
  return request(`${API}/vote/endvote/${voteId}/${tostart}`);
}

export function delVote({ voteId }) {
  return request(`${API}/vote/delvote/${voteId}`);
}

export function toFollow(voteId) {
  return request(`${API}/vote/follow/${voteId}`);
}

export function createVote({ vote }) {
  return request(`${API}/vote/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote),
  });
}

export function editVote({ vote, id }) {
  return request(`${API}/vote/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vote),
  });
}

// Comment

export function toComment(comment) {
  return request(`${API}/comment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
}

export function toStar(commentId) {
  return request(`${API}/comment/star/${commentId}`);
}

export function delComment(commentId, pid, voteId) {
  return request(`${API}/comment/delete/${commentId}/${pid}/${voteId}`, {
    method: 'DELETE',
  });
}

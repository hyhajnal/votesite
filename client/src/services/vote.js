import request from '../utils/request';

export function fetch() {
    return request('/api/posts');
}

export function fetchVote(n) {
    return request(`/api/votes/${n}`);
}

export function fetchComment() {
    return request('/api/comments/');
}
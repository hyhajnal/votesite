import React from 'react';
import { Card, Col, Button } from 'antd';
import styles from './User.less';

function User({ user, dispatch, userId, queryId }) {
  const relation = {
    userId,
    otherId: user._id,
    type: 'user',
  };

  function follow(id) {
    dispatch({ type: 'user/tofollow', payload: { relation, id } });
  }

  function unfollow(id) {
    dispatch({ type: 'user/unfollow', payload: { relation, id } });
  }

  let followbtn;
  if (userId === user._id) {
    followbtn = (<span>&nbsp;&nbsp;&nbsp;&nbsp;自己</span>);
  } else if (!user.isfollow) {
    followbtn = (
      <Button
        type="primary" className="gutter-h-m"
        onClick={() => follow(queryId)}
      >关注</Button>);
  } else {
    followbtn = (
      <Button
        type="primary" className="gutter-h-m" ghost
        onClick={() => unfollow(queryId)}
      >取关</Button>);
  }

  return (
    <Card bodyStyle={{ padding: 0 }} className={styles.card}>
      <Col span={8} className={styles.imgbox} />
      <Col span={16} className={styles.text}>
        <h3>{user.name}</h3>
        <p className={styles.linemore}>{user.desc}</p>
        <span>关注&nbsp;{user.following_count}&nbsp;&nbsp;|</span>
        <span>&nbsp;&nbsp;粉丝&nbsp;{user.follower_count}</span>
        {followbtn}
      </Col>
    </Card>
  );
}

export default User;

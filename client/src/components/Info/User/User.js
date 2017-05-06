import React from 'react';
import { Card, Col, Button } from 'antd';
import styles from './User.less';

function User({ user, dispatch, userId }) {
  const relation = {
    userId,
    otherId: user._id,
    type: 'user',
  };

  function follow() {
    dispatch({ type: 'user/tofollow', payload: { relation } });
  }

  function unfollow() {
    dispatch({ type: 'user/unfollow', payload: { relation } });
  }
  return (
    <Card bodyStyle={{ padding: 0 }} className={styles.card}>
      <Col span={8} className={styles.imgbox} />
      <Col span={16} className={styles.text}>
        <h3>{user.name}</h3>
        <p className={styles.linemore}>{user.desc}</p>
        <span>关注&nbsp;{user.following_count}&nbsp;&nbsp;|</span>
        <span>&nbsp;&nbsp;粉丝&nbsp;{user.follower_count}</span>
        {
            !user.isfollow ?
              <Button type="primary" className="gutter-h-m" onClick={follow}>关注</Button>
              : <Button type="primary" className="gutter-h-m" ghost onClick={unfollow}>取关</Button>
        }
      </Col>
    </Card>
  );
}

export default User;

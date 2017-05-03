import React from 'react';
import { Card, Col, Button } from 'antd';
import styles from './User.less';

function User() {
  return (
    <Card bodyStyle={{ padding: 0 }} className={styles.card}>
      <Col span={8} className={styles.imgbox} />
      <Col span={16} className={styles.text}>
        <h3>汤君</h3>
        <p className={styles.linemore}>这位童鞋很懒，暂时没有介绍哦</p>
        <span>关注&nbsp;10&nbsp;&nbsp;|&nbsp;&nbsp;粉丝&nbsp;20</span>
        <Button type="primary" size="small" className="gutter-h-m">关注</Button>
      </Col>
    </Card>
  );
}

export default User;

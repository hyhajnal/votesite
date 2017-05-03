import React from 'react';
import { Col, Row } from 'antd';
import styles from './Message.less';

function Message() {
  return (
    <li className={styles.msg}>
      <h3>你没有反驳到点上，吸血姬不能保证自己血量安全的情况下高输出</h3>
      <Row type="flex" align="space-between">
        <Col>
          克拉斯茨你看到了水泥厂
        </Col>
        <Col>
         网易阴阳师&nbsp;&nbsp;&nbsp;&nbsp;<span className="label-2 gutter-h-m">2017-5-2</span>
        </Col>
      </Row>
    </li>
  );
}

export default Message;

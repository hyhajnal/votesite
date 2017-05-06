import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'dva/router';
import styles from './Message.less';

function Message({ msg }) {
  return (
    <li className={styles.msg}>
      <h3>{msg.content}</h3>
      <Row type="flex" align="space-between">
        <Col>
          <Link to={`/other?id=${msg.from._id}`}>{msg.from.name}</Link>
          回复
          <Link to={`/other?id=${msg.to._id}`}>{msg.to.name}</Link>
        </Col>
        <Col>
          <Link to={`/vote?_id=${msg.voteId._id}`}>{msg.voteId.title}</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="label-2 gutter-h-m">{msg.time}</span>
        </Col>
      </Row>
    </li>
  );
}

export default Message;

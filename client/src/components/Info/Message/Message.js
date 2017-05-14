import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'dva/router';
import styles from './Message.less';
import timeFilter from '../../../utils/timefilter';

function Message({ msg }) {
  return (
    <li className={styles.msg}>
      <h3>{msg.content}</h3>
      <Row type="flex" align="space-between">
        <Col span={10}>
          <Link to={`/other?id=${msg.from._id}`}>{msg.from.name}</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;回复&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to={`/other?id=${msg.to._id}`}>{msg.to.name}</Link>
        </Col>
        <Col span={10}>
          <Link to={`/vote?_id=${msg.voteId._id}`}>{msg.voteId.title}</Link>
        </Col>
        <Col span={4} className="align-right">
          <span className="label-2 gutter-h-m">{timeFilter(msg.time)}</span>
        </Col>
      </Row>
    </li>
  );
}

export default Message;

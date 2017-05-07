import React from 'react';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import { Row, Button } from 'antd';
// import styles from './Redirect.css';
import LogLayout from '../components/MainLayout/LogLayout';

function redirect() {
  browserHistory.push('/login');
}

function Redirect({ params }) {
  return (
    <LogLayout>
      <h2 className="align-center">请记住你的帐号</h2>
      <h1 style={{ color: '#F4364C' }} className="align-center gutter-vl-m">
        { params.id }
      </h1>
      <Row>
        <Button type="primary" size="large" onClick={redirect}>
            进入网站
        </Button>
      </Row>
    </LogLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Redirect);

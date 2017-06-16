import React from 'react';
import classNames from 'classnames';
import { Menu, Icon, Button, Row, Col, Input, message } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './Header.css';

function onSearch({ dispatch, key }) {
  if (key === '') return message.warn('你还没输关键词！');
  dispatch({ type: 'user/search', payload: { key: key.trim() } });
}

function Header({ collapsedCls, location, user, dispatch }) {
  const headCls = classNames(styles.header, collapsedCls);
  const Search = Input.Search;
  function logout() {
    dispatch({ type: 'user/logout', payload: 'logout' });
  }
  return (
    <div className={headCls} id="header">
      <Row type="flex" justify="center" align="middle">
        <Col span={8}>
          <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            theme="drak"
          >
            <Menu.Item key="/">
              <Link to="/"><Icon type="home" />首页</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about"><Icon type="smail-o" />关于</Link>
            </Menu.Item>
            <Menu.Item key="/users">
              <Link to="/users"><Icon type="smail-o" />列表</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          <Search
            placeholder="输入你想到的关键词"
            style={{ width: '80%' }}
            onSearch={key => onSearch({ key, dispatch })}
          />
        </Col>
        <Col span={8}>
          { user.name ?
            <span>
              <Link to="voteCreate"><Button type="danger gutter-h-m" ghost >发起投票</Button></Link>
              <span>你好,{user.name}<em className={styles.logout} onClick={logout}>退出</em></span>
            </span>
             :
            <Link to="login"><Button type="primary gutter-h-m">登录</Button></Link>
          }
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(Header);

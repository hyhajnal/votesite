import React from 'react';
import classNames from 'classnames';
import { Menu, Icon, Button, Row, Col, Input } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.css';

function Header({ collapsedCls, location, user }) {
  const headCls = classNames(styles.header, collapsedCls);
  const Search = Input.Search;
  return (
    <div className={headCls} id="header">
      <Row type="flex" justify="center" align="middle">
        <Col span={4} offset={2}>
          <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            theme="drak"
          >
            {/* <Menu.Item key="/users">
              <Link to="/users"><Icon type="bars" />Users</Link>
            </Menu.Item>*/}
            <Menu.Item key="/">
              <Link to="/"><Icon type="home" />首页</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about"><Icon type="smail-o" />关于</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={10}>
          <Search
            placeholder="输入你想到的关键词"
            style={{ width: '80%' }}
            onSearch={value => console.log(value)}
          />
        </Col>
        <Col span={6}>
          <Link to="voteEdit"><Button type="danger gutter-h-m" ghost >发起投票</Button></Link>
          { user.name ? `你好，${user.name}` :
          <Link to="login"><Button type="primary gutter-h-m">登录</Button></Link>
          }
        </Col>
      </Row>
    </div>
  );
}

export default Header;

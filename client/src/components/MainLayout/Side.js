import React from 'react';
import { Layout, Menu, Icon, Row } from 'antd';
import { Link } from 'dva/router';
import styles from './Side.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Side({ collapsed, onCollapse, mode, user }) {
  if (!user || !user.name) return null;
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className={styles.slider}
    >
      <Row type="flex" justify="center" style={{ margin: '20px 0 10px' }}>
        <img
          alt="example" width="80" height="80" className="avator-c"
          src={user.avator}
        />
      </Row>
      <Menu theme="dark" mode={mode} >
        <SubMenu
          key="sub1"
          title={<span><Icon type="user" /><span className="nav-text">{user.name}</span></span>}
        >
          <Menu.Item key="1"><Link to="/me/1">个人资料</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/me/2">关注<span className="label-2 gutter-h">{user.following_count}</span></Link></Menu.Item>
          <Menu.Item key="3"><Link to="/me/3">粉丝<span className="label-2 gutter-h">{user.follower_count}</span></Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><Icon type="bar-chart" /><span className="nav-text">投票</span></span>}
        >
          <Menu.Item key="4"><Link to="/me/4">关注的话题<span className="label-2 gutter-h">{user.topic_count}</span></Link></Menu.Item>
          <Menu.Item key="5"><Link to="/me/5">参与的投票<span className="label-2 gutter-h">{user.vote_count}</span></Link></Menu.Item>
          <Menu.Item key="6"><Link to="/me/6">发起的投票<span className="label-2 gutter-h">{user.vote_join_count}</span></Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={<span><Icon type="bar-chart" /><span className="nav-text">通知</span></span>}
        >
          <Menu.Item key="7"><Link to="/me/4">回复<span className="label-2 gutter-h">{user.reply_count}</span></Link></Menu.Item>
          <Menu.Item key="8"><Link to="/me/5">消息<span className="label-2 gutter-h">{user.vote_count}</span></Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Side;

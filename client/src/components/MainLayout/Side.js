import React from 'react';
import { Layout, Menu, Icon, Row } from 'antd';
import { Link } from 'dva/router';
import styles from './Side.less';
import { API } from '../../constants';

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
          src={`${API}/${user.avator}`}
        />
      </Row>
      <Menu theme="dark" mode={mode} >
        <SubMenu
          key="sub1"
          title={<span><Icon type="user" /><span className="nav-text">{user.name}</span></span>}
        >
          <Menu.Item key="1"><Link to="/me?key=1">个人资料</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/me?key=2">关注</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/me?key=3">粉丝</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><Icon type="bar-chart" /><span className="nav-text">投票</span></span>}
        >
          {/* <Link to="/me/4">*/}
          <Menu.Item key="4"><Link to="/me?key=4">关注的话题</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/me?key=5">参与的投票</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/me?key=6">发起的投票</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={<span><Icon type="bar-chart" /><span className="nav-text">通知</span></span>}
        >
          <Menu.Item key="7"><Link to="/me?key=7">评论</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/me?key=8">消息</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Side;

import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Badge, Row } from 'antd';
import styles from './Side.css';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Side extends Component {
  render() {
    const { collapsed, onCollapse, mode } = this.props;
    return (
      <div id="my-sider">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className={styles.slider}
        >
          <Row type="flex" justify="center" style={{ margin:'20px 0 10px' }}>
            <img alt="example" width="80" height="80" className="avator-c"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </Row>
          <Menu theme="dark" mode={mode} defaultSelectedKeys={['6']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span className="nav-text">我</span></span>}
            >
              <Menu.Item key="1">个人资料</Menu.Item>
              <Menu.Item key="2">关注<span className="label-2 gutter-h">30</span></Menu.Item>
              <Menu.Item key="3">粉丝<span className="label-2 gutter-h">120</span></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="bar-chart" /><span className="nav-text">投票</span></span>}
            >
              <Menu.Item key="1">关注的话题<span className="label-2 gutter-h">3</span></Menu.Item>
              <Menu.Item key="2">参与的投票<span className="label-2 gutter-h">10</span></Menu.Item>
              <Menu.Item key="3">发起的投票<span className="label-2 gutter-h">20</span></Menu.Item>
            </SubMenu>
            <Menu.Item>
              <span><Icon type="message" />
                <span className="nav-text">回复</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default Side;
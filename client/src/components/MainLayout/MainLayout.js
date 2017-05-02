import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import styles from './MainLayout.css';
import Header from './Header';
import Sider from './Side';

const { Content } = Layout;

// 纯函数式定义组件，只需要对传入的props进行展示，不需要进行state操作
class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      mode: 'inline',
    };
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render() {
    const { children, location, user } = this.props;
    const collapsedCls = this.state.collapsed ? 'sider-close' : 'sider-show';
    return (
      <Layout className={`${styles.bg} ant-layout-has-sider`}>
        <Layout className={collapsedCls}>
          <Header location={location} collapsedCls={collapsedCls} user={user} />
          <Content className="content">
            { children }
          </Content>
        </Layout>
        <Sider
          className={styles.sider}
          onCollapse={this.onCollapse}
          mode={this.state.mode}
          collapsed={this.state.collapsed}
          user={user}
        />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

export default connect(mapStateToProps)(MainLayout);

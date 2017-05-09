import React, { Component } from 'react';
import { Layout, Button, Icon, BackTop } from 'antd';
import classnames from 'classnames';
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

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: !this.state.collapsed ? 'vertical' : 'inline',
    });
  }

  backTop = () => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  render() {
    const { children, location, user } = this.props;
    const collapsedCls = this.state.collapsed ? 'sider-close' : 'sider-show';
    return (
      <Layout className={`${styles.bg} ant-layout-has-sider`}>
        <Layout className={classnames(styles.wrap, collapsedCls)}>
          <Header
            location={location}
            collapsedCls={collapsedCls}
            user={user}
          />
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
        <div>
          <BackTop>
            <Button type="primary" className={styles.top}>
              <Icon type="up" />
            </Button>
          </BackTop>
          <Button type="primary" onClick={this.onCollapse} className={styles.right}>
            <Icon type="right" />
          </Button>
        </div>
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

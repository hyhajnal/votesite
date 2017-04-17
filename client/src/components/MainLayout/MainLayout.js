import React, { Component } from 'react';
import styles from './MainLayout.css';
import Header from './Header';
import SiderContent from './Side';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

//纯函数式定义组件，只需要对传入的props进行展示，不需要进行state操作
class MainLayout extends Component{

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
    const { children, location } = this.props;
    const collapsedCls = this.state.collapsed ? 'sider-close' : 'sider-show';
    return (
      <Layout className="ant-layout-has-sider" className={styles.bg}>
        <Layout className={collapsedCls}>
          <Header location={location} collapsedCls={collapsedCls}></Header>
          <Content className="content">
            { children }
          </Content>
        </Layout>
        <SiderContent 
          className={styles.sider} 
          onCollapse={this.onCollapse} 
          mode={this.state.mode}
          collapsed={this.state.collapsed}>
        </SiderContent>
      </Layout>
    );
  }
}

export default MainLayout;

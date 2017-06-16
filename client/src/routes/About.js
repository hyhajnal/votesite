import React from 'react';
import { Row } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './About.less';

function About({ location }) {
  return (
    <MainLayout location={location}>
      <Row type="flex" align="middle" className={styles.content}>
        <div className={styles.about}>
          <h1>一个简单的投票网站</h1>
          <h3 className="align-right gutter-v-m">学号：2014329700003</h3>
          <ul>
            <li>1. 登录注册</li>
            <li>2. 评论回复</li>
            <li>3. 点赞关注</li>
            <li>4. 进行投票</li>
            <li>5. 相关搜索</li>
            <li>6. 信息编辑</li>
          </ul>
        </div>
      </Row>
    </MainLayout>
  );
}

export default About;

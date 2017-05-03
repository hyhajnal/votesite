import React from 'react';
import { Tabs, Col, Row } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Me.less';
import ArticalItem from '../components/Home/ArticalItem';
import User from '../components/Info/User/User';
import Message from '../components/Info/Message/Message';

const TabPane = Tabs.TabPane;

function Me({ location, topics, posts, params }) {
  function callback(key) {
    browserHistory.push(`/me/${key}`);
  }
  const article = [];
  posts.forEach((post, i) => {
    article.push(
      <ArticalItem key={i} post={post} loading={false} />,
    );
  });
  const users = [];
  for (let i = 0; i < 10; i += 1) {
    users.push(
      <Col span={8} key={i}><User /></Col>,
    );
  }

  const msgs = [];
  for (let i = 0; i < 10; i += 1) {
    msgs.push(
      <Message key={i} />,
    );
  }
  console.log(params.id);
  return (
    <MainLayout location={location}>
      <div className={styles.content}>
        <Tabs defaultActiveKey={params.id} activeKey={params.id} onChange={callback}>
          <TabPane tab="个人资料" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="消息" key="8">Content of Tab Pane 3</TabPane>
          <TabPane tab="粉丝" key="3">
            <Row gutter={24}>
              {users}
            </Row>
          </TabPane>
          <TabPane tab="关注的用户" key="2">
            <Row gutter={24}>
              {users}
            </Row>
          </TabPane>
          <TabPane tab="关注的话题" key="4">
            <Row type="flex" align="start" style={{ margin: '20px' }}>
              {
                topics.map((item, index) => {
                  return (
                    <Col className={styles.topic} key={index + item} >
                      <img src={item.pic} width="32" height="32" alt={item.name} />
                      {item.name}&nbsp;&nbsp;{item.vote_count}
                    </Col>
                  );
                })
              }
            </Row>
          </TabPane>
          <TabPane tab="参与的投票" key="5">{article}</TabPane>
          <TabPane tab="发起的投票" key="6">{article}</TabPane>
          <TabPane tab="发布的评论" key="7">
            <ul>
              {msgs}
            </ul>
          </TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.vote,
    posts: state.vote.posts,
    topics: state.vote.topics,
  };
}

export default connect(mapStateToProps)(Me);

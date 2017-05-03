import React from 'react';
import { Tabs, Row, Button, Col } from 'antd';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Other.less';
import ArticalItem from '../components/Home/ArticalItem';
import User from '../components/Info/User/User';
import Message from '../components/Info/Message/Message';

const TabPane = Tabs.TabPane;


function Other({ location, topics, posts }) {
  function callback(key) {
    console.log(key);
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

  return (
    <MainLayout location={location}>
      <Row className={styles.info} span={20}>
        <img alt="" src="https://upload-images.jianshu.io/upload_images/1980684-23785feb7da2370e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300" />
        <h1>汤君</h1>
        <p className={styles.desc}><em>这位童鞋很懒，暂时没有介绍哦</em></p>
        <Row>
          <Button type="primary" className="gutter-h-m">关注</Button>
          <Button type="primary" className="gutter-h-m">发消息</Button>
        </Row>
      </Row>
      <div className={styles.content}>
        <Tabs defaultActiveKey="2" onChange={callback}>
          <TabPane tab="ta的粉丝" key="2">
            <Row gutter={24}>
              {users}
            </Row>
          </TabPane>
          <TabPane tab="ta关注的用户" key="3">
            <Row gutter={24}>
              {users}
            </Row>
          </TabPane>
          <TabPane tab="ta关注的话题" key="4">
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
          <TabPane tab="ta参与的投票" key="5">{article}</TabPane>
          <TabPane tab="ta发起的投票" key="6">{article}</TabPane>
          <TabPane tab="ta发布的评论" key="7">
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

export default connect(mapStateToProps)(Other);

import React from 'react';
import { Tabs, Col, Row } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Me.less';
import ArticalItem from '../components/Home/ArticalItem';
import User from '../components/Info/User/User';
import Message from '../components/Info/Message/Message';
import UserEdit from '../components/Info/User/UserEdit';

const TabPane = Tabs.TabPane;

function Me({ location, others, params, dispatch, userId }) {
  if (others.votes === undefined) return null;
  if (!userId) {
    const error = { msg: '需要登录才能操作！' };
    throw error;
  }
  function callback(key) {
    browserHistory.push(`/me/${key}`);
  }
  const { votes, followings, followers, topics, vote_joins, comments, info } = others;
  const posts = [];
  const postsJoin = [];
  votes.forEach((vote, i) =>
    posts.push(<ArticalItem key={i} post={vote} loading={false} />),
  );

  vote_joins.forEach((vote, i) =>
    postsJoin.push(<ArticalItem key={i} post={vote} loading={false} />),
  );

  const followingArray = [];
  followings.forEach((following, i) =>
    followingArray.push(
      <Col span={8} key={i}>
        <User user={following} dispatch={dispatch} userId={userId} />
      </Col>),
  );

  const followerArray = [];
  followers.forEach((follower, i) =>
    followerArray.push(
      <Col span={8} key={i}>
        <User user={follower} dispatch={dispatch} userId={userId} />
      </Col>),
  );

  const msgs = [];
  for (let i = 0; i < comments.length; i += 1) {
    msgs.push(
      <Message key={i} msg={comments[i]} />,
    );
  }

  return (
    <MainLayout location={location}>
      <div className={styles.content}>
        <Tabs defaultActiveKey={params.id} activeKey={params.id} onChange={callback}>
          <TabPane tab="个人资料" key="1">
            <UserEdit user={info} dispatch={dispatch} />
          </TabPane>
          <TabPane tab={'消息'} key="8">Content of Tab Pane 3</TabPane>
          <TabPane tab={`粉丝 ${followerArray.length}`} key="3">
            <Row gutter={24}>
              {followerArray}
            </Row>
          </TabPane>
          <TabPane tab={`关注的用户${followerArray.length}`} key="2">
            <Row gutter={24}>
              {followingArray}
            </Row>
          </TabPane>
          <TabPane tab={`关注的话题 ${topics.length}`} key="4">
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
          <TabPane tab={`发起的投票 ${posts.length}`} key="5">{posts}</TabPane>
          <TabPane tab={`参与的投票 ${postsJoin.length}`} key="6">{postsJoin}</TabPane>
          <TabPane tab={`发布的评论 ${msgs.length}`} key="7">
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
    loading: state.loading.models.user,
    userId: state.user.user._id,
    others: state.user.all,
  };
}

export default connect(mapStateToProps)(Me);

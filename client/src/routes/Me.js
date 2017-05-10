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
import Nodata from '../components/Common/Nodata';

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
  const { votes, followings, followers, topics, vote_joins, comments, info, msgs } = others;
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

  const commentArray = [];
  for (let i = 0; i < comments.length; i += 1) {
    commentArray.push(
      <Message key={i} msg={comments[i]} />,
    );
  }

  topics.map((item, index) => {
    return (
      <Col className={styles.topic} key={index + item} >
        <img src={item.pic} width="32" height="32" alt={item.name} />
        {item.name}&nbsp;&nbsp;{item.vote_count}
      </Col>
    );
  });


  const msgArray = [];
  msgs.forEach((msg) => {
    msgArray.push(
      <div className={styles.msg}>
        <p className="gutter-v-m">
          <span className={styles.tag}>{msg.type}</span>&nbsp;&nbsp;
          {
            msg.isread ? <span className={styles.isread}>已读</span>
            : <span className={styles.isread}>未读</span>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="label-2">{msg.time}</span>
        </p>
        <p className="gutter-v-m">{msg.content}</p>
      </div>,
    );
  });

  return (
    <MainLayout location={location}>
      <div className={styles.content}>
        <Tabs defaultActiveKey={params.id} activeKey={params.id} onChange={callback}>
          <TabPane tab="个人资料" key="1">
            <UserEdit user={info} dispatch={dispatch} />
          </TabPane>
          <TabPane tab={`消息 ${msgArray.length}`} key="8">
            {msgArray.length > 0 ? msgArray : <Nodata />}
          </TabPane>
          <TabPane tab={`粉丝 ${followerArray.length}`} key="3">
            <Row gutter={24}>
              {followerArray.length > 0 ? followerArray : <Nodata className={styles.nodata} />}
            </Row>
          </TabPane>
          <TabPane tab={`关注的用户${followingArray.length}`} key="2">
            <Row gutter={24}>
              {
                followingArray.length > 0 ? followingArray :
                <Nodata className={styles.nodata} />
              }
            </Row>
          </TabPane>
          <TabPane tab={`关注的话题 ${topics.length}`} key="4">
            <Row type="flex" align="start" style={{ margin: '20px' }}>
              {
                topics.length > 0 ? topics : <Nodata className={styles.nodata} />
              }
            </Row>
          </TabPane>
          <TabPane tab={`发起的投票 ${posts.length}`} key="5">
            {posts.length > 0 ? posts : <Nodata className={styles.nodata} />}
          </TabPane>
          <TabPane tab={`参与的投票 ${postsJoin.length}`} key="6">
            {postsJoin.length > 0 ? postsJoin : <Nodata className={styles.nodata} />}
          </TabPane>
          <TabPane tab={`发布的评论 ${commentArray.length}`} key="7">
            {
              commentArray.length > 0 ?
                <ul>{commentArray}</ul>
                : <Nodata className={styles.nodata} />
            }
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

import React from 'react';
import { Tabs, Row, Button, Col } from 'antd';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Other.less';
import ArticalItem from '../components/Home/ArticalItem';
import User from '../components/Info/User/User';
import Message from '../components/Info/Message/Message';
import Nodata from '../components/Common/Nodata';
import { API } from '../constants';

const TabPane = Tabs.TabPane;


function Other({ location, others, dispatch, userId }) {
  if (others.votes === undefined) return null;
  const { votes, followings, followers, topics, vote_joins, info, comments } = others;

  const posts = [];
  const postsJoin = [];
  votes.forEach((vote, i) =>
    posts.push(
      <ArticalItem
        key={i}
        post={vote}
        loading={false}
        userId={userId}
        dispatch={dispatch}
      />),
  );

  vote_joins.forEach((vote, i) =>
    postsJoin.push(
      <ArticalItem
        key={i}
        post={vote}
        loading={false}
        userId={userId}
        dispatch={dispatch}
      />),
  );

  const followingArray = [];
  followings.forEach((following, i) =>
    followingArray.push(
      <Col span={8} key={i}>
        <User user={following} dispatch={dispatch} userId={userId} queryId={info._id} />
      </Col>),
  );

  const followerArray = [];
  followers.forEach((follower, i) =>
    followerArray.push(
      <Col span={8} key={i}>
        <User user={follower} dispatch={dispatch} userId={userId} queryId={info._id} />
      </Col>),
  );

  const msgs = [];
  for (let i = 0; i < comments.length; i += 1) {
    msgs.push(
      <Message key={i} msg={comments[i]} />,
    );
  }

  const relation = {
    userId,
    otherId: info._id,
    type: 'user',
  };

  function follow(id) {
    dispatch({ type: 'user/tofollow', payload: { relation, id } });
  }

  function unfollow(id) {
    dispatch({ type: 'user/unfollow', payload: { relation, id } });
  }

  return (
    <MainLayout location={location}>
      <Row className={styles.info} span={20}>
        <img alt="" src={`${API}/${info.avator}`} />
        <h1>{info.name}</h1>
        <p className={styles.desc}><em>
          {
            !info.desc ? '这位童鞋很懒，暂没介绍哦' : info.desc
          }</em></p>
        <Row>
          {
            !info.isfollow ?
              <Button type="primary" className="gutter-h-m" onClick={() => follow(info._id)}>
                关注
              </Button>
              : <Button type="primary" className="gutter-h-m" ghost onClick={() => unfollow(info._id)}>
                  取关
                </Button>
          }
          <Button type="primary" className="gutter-h-m">发消息</Button>
        </Row>
      </Row>
      <div className={styles.content}>
        <Tabs defaultActiveKey="2" >
          <TabPane tab={`ta的粉丝 ${followerArray.length}`} key="2">
            <Row gutter={24}>
              {followerArray.length > 0 ? followerArray : <Nodata />}
            </Row>
          </TabPane>
          <TabPane tab={`ta关注的用户 ${followingArray.length}`} key="3">
            <Row gutter={24}>
              {followingArray.length > 0 ? followingArray : <Nodata />}
            </Row>
          </TabPane>
          <TabPane tab={`ta关注的话题 ${topics.length}`} key="4">
            <Row type="flex" align="start" style={{ margin: '20px' }}>
              {
                topics.length > 0 ?
                topics.map((item, index) => {
                  return (
                    <Col className={styles.topic} key={index + item} >
                      <img src={item.pic} width="32" height="32" alt={item.name} />
                      {item.name}&nbsp;&nbsp;{item.vote_count}
                    </Col>
                  );
                }) : <Nodata />
              }
            </Row>
          </TabPane>
          <TabPane tab={`ta发起的投票 ${posts.length}`} key="5">
            {posts.length > 0 ? posts : <Nodata />}
          </TabPane>
          <TabPane tab={`ta参与的投票 ${postsJoin.length}`} key="6">
            {postsJoin.length > 0 ? postsJoin : <Nodata />}
          </TabPane>
          <TabPane tab={`ta发布的评论 ${msgs.length}`} key="7">
            { msgs.length > 0 ?
              <ul>{msgs}</ul> : <Nodata />
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
    others: state.user.all,
    userId: state.user.user._id,
  };
}

export default connect(mapStateToProps)(Other);

import React from 'react';
import { Tabs, Row, Button, Col } from 'antd';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Other.less';
import ArticalItem from '../components/Home/ArticalItem';
import User from '../components/Info/User/User';
import Message from '../components/Info/Message/Message';

const TabPane = Tabs.TabPane;


function Other({ location, others }) {
  if (others.votes === undefined) return null;
  const { votes, followings, followers, topics, vote_joins, info, comments } = others;

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
    followingArray.push(<Col span={8} key={i}><User user={following} /></Col>),
  );

  const followerArray = [];
  followers.forEach((follower, i) =>
    followerArray.push(<Col span={8} key={i}><User user={follower} /></Col>),
  );

  const msgs = [];
  for (let i = 0; i < comments.length; i += 1) {
    msgs.push(
      <Message key={i} msg={comments[i]} />,
    );
  }

  return (
    <MainLayout location={location}>
      <Row className={styles.info} span={20}>
        <img alt="" src={info.avator} />
        <h1>{info.name}</h1>
        <p className={styles.desc}><em>
          {
            !info.desc ? '这位童鞋很懒，暂没介绍哦' : info.desc
          }</em></p>
        <Row>
          {
            !info.isfollow ? <Button type="primary" className="gutter-h-m">关注</Button>
            : <Button type="primary" className="gutter-h-m" ghost >取关</Button>
          }
          <Button type="primary" className="gutter-h-m">发消息</Button>
        </Row>
      </Row>
      <div className={styles.content}>
        <Tabs defaultActiveKey="2" >
          <TabPane tab={`ta的粉丝 ${followerArray.length}`} key="2">
            <Row gutter={24}>
              {followerArray}
            </Row>
          </TabPane>
          <TabPane tab={`ta关注的用户 ${followingArray.length}`} key="3">
            <Row gutter={24}>
              {followingArray}
            </Row>
          </TabPane>
          <TabPane tab={`ta关注的话题 ${topics.length}`} key="4">
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
          <TabPane tab={`ta发起的投票 ${posts.length}`} key="5">{posts}</TabPane>
          <TabPane tab={`ta参与的投票 ${postsJoin.length}`} key="6">{postsJoin}</TabPane>
          <TabPane tab={`ta发布的评论 ${msgs.length}`} key="7">
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
    others: state.user.all,
  };
}

export default connect(mapStateToProps)(Other);

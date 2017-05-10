import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './Search.less';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';
import User from '../components/Info/User/User';
import Message from '../components/Info/Message/Message';
import Nodata from '../components/Common/Nodata';

function Search({ location, votes, topics, users, dispatch, comments }) {
  const posts = [];
  if (votes.length > 0) {
    votes.forEach((vote, i) =>
      posts.push(<ArticalItem key={i} post={vote} loading={false} />),
    );
  }
  const userArray = [];
  if (users.length > 0) {
    users.forEach((user, i) =>
      userArray.push(
        <Col span={8} key={i}>
          <User user={user} dispatch={dispatch} />
        </Col>),
    );
  }
  const msgs = [];
  if (comments.length > 0) {
    for (let i = 0; i < comments.length; i += 1) {
      msgs.push(
        <Message key={i} msg={comments[i]} />,
      );
    }
  }
  return (
    <MainLayout location={location}>
      <div className={styles.wrap}>
        { topics.length === 0 && userArray.length === 0
          && posts.length === 0 && msgs.length === 0 ?
            <Nodata /> : null
        }
        { topics.length > 0 ?
          <div>
            <h2 className={styles.title}>相关话题</h2>
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
          </div> : null
        }
        {
          userArray.length > 0 ?
            <div>
              <h2 className={styles.title}>相关用户</h2>
              <Row gutter={24}>
                {userArray}
              </Row>
            </div> : null
        }
        {
          posts.length > 0 ?
            <div>
              <h2 className={styles.title}>相关投票</h2>
              {posts}
            </div> : null
        }
        {
          msgs.length > 0 ?
            <div>
              <h2 className={styles.title}>相关评论</h2>
              <ul>
                {msgs}
              </ul>
            </div> : null
        }
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    votes: state.user.search.votes,
    topics: state.user.search.topics,
    users: state.user.search.users,
    comments: state.user.search.comments,
  };
}

export default connect(mapStateToProps)(Search);

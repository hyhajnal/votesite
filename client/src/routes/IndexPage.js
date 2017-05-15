import React from 'react';
import { connect } from 'dva';
import { Carousel, Row, Col, Radio, Icon, Button, Spin } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';
import styles from './IndexPage.less';
import Nodata from '../components/Common/Nodata';
import { LIMIT } from '../constants';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

let page = 1;

const listquery = {
  sortkey: 'create_time',
  tag: '',
};

function toquery(obj) {
  let str = '?';
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      if (obj[key] !== 'all') {
        str = `${str}${key}=${obj[key]}&`;
      }
    }
  }
  return str.substring(0, str.length - 1);
}

function onChange2(e, dispatch) {
  page = 1;
  listquery.tag = e.target.value;
  dispatch({
    type: 'vote/fetch_list',
    payload: { query: toquery(listquery), page },
  });
}

function onChange1(e, dispatch) {
  page = 1;
  listquery.sortkey = e.target.value;
  dispatch({
    type: 'vote/fetch_list',
    payload: { query: toquery(listquery), page },
  });
}

function getMore(dispatch) {
  page += 1;
  dispatch({
    type: 'vote/fetch_list',
    payload: { query: toquery(listquery), page },
  });
}

function follow(e, relation, dispatch) {
  e.stopPropgation();
  dispatch({ type: 'vote/tofollow', payload: { relation } });
}

function unfollow(e, relation, dispatch) {
  e.stopepropagation();
  dispatch({ type: 'vote/unfollow', payload: { relation } });
}

function IndexPage({ location, posts, loading, topics, dispatch, userId }) {
  const article = [];
  posts.forEach((post, i) => {
    article.push(
      <ArticalItem
        key={i}
        post={post}
        loading={loading}
        userId={userId}
        dispatch={dispatch}
      />,
    );
  });
  return (
    <MainLayout location={location}>
      <Carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>

      <div className="article-content">
        <Row type="flex" align="start" style={{ margin: '20px' }}>
          <RadioGroup onChange={e => onChange2(e, dispatch)}>
            <Radio value={'all'} key={-1}>
              <Col className={styles.topic}>
                <img
                  src="https://upload-images.jianshu.io/upload_images/1980684-23785feb7da2370e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300"
                  width="32" height="32" alt="全部"
                />
                全部&nbsp;&nbsp;
              </Col>
            </Radio>
            {
              topics.map((item, index) => {
                const relation = {
                  userId,
                  otherId: item._id,
                  type: 'topic',
                };
                return (
                  <Radio value={item.name} key={index + item}>
                    <Col className={styles.topic}>
                      <img src={item.pic} width="32" height="32" alt={item.name} />
                      {item.name}&nbsp;&nbsp;{item.vote_count}
                      {item.isfollow ?
                        <Icon
                          className="gutter-h"
                          type="heart"
                          onClick={e => unfollow(e, relation, dispatch)}
                        /> :
                        <Icon
                          className="gutter-h"
                          type="heart-o"
                          onClick={e => follow(e, relation, dispatch)}
                        />
                      }
                    </Col>
                  </Radio>
                );
              })
            }
          </RadioGroup>
        </Row>
        <Row type="flex" justify="space-around" style={{ margin: '20px' }}>
          <RadioGroup defaultValue="create_time" size="large" onChange={e => onChange1(e, dispatch)}>
            <RadioButton value="view">最热</RadioButton>
            <RadioButton value="create_time">最新</RadioButton>
          </RadioGroup>
        </Row>
        <div className="align-center gutter-vl-m"><Spin spinning={loading} /></div>
        {article.length === 0 && !loading ?
          <div className={styles.nodata}><Nodata /></div> : article }
        <Row type="flex" align="center" className="gutter-vl-m">
          {
            !loading && article.length > 0 ?
              <Button type="primary" onClick={() => getMore(dispatch)} disabled={article.length % LIMIT !== 0}>
                { article.length % LIMIT === 0 ? '加载更多' : '没有更多了' }
              </Button> : null
          }
          <div><Spin spinning={loading} /></div>
        </Row>
      </div>
    </MainLayout>
  );
}

IndexPage.propTypes = {
  // text: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading.models.vote,
    userId: state.user.user._id,
    posts: state.vote.posts,
    topics: state.vote.topics,
  };
}

export default connect(mapStateToProps)(IndexPage);

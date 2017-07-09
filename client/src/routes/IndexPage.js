import React from 'react';
import { connect } from 'dva';
import { Row, Col, Radio, Button, Spin } from 'antd';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';
import MyTab from '../components/Common/Tab';
import styles from './IndexPage.less';
import Nodata from '../components/Common/Nodata';
import { LIMIT, API } from '../constants';

const RadioGroup = Radio.Group;

const listquery = {
  sortkey: 'post_time',
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

function IndexPage({ location, posts, loading, topics, dispatch, userId, hotuser }) {
  const article = [];
  let page = 1;
  function onChange2(e) {
    page = 1;
    listquery.tag = e.target.value;
    dispatch({
      type: 'vote/fetch_list',
      payload: { query: toquery(listquery), page },
    });
  }

  function onChange1(type) {
    page = 1;
    listquery.sortkey = !type ? 'post_time' : 'view';
    dispatch({
      type: 'vote/fetch_list',
      payload: { query: toquery(listquery), page },
    });
  }

  const getMore = () => {
    page += 1;
    dispatch({
      type: 'vote/fetch_list',
      payload: { query: toquery(listquery), page },
    });
  };

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

  const HotUser =
    hotuser.length > 0 ?
      (<Row type="flex" align="center" style={{ padding: '20px' }}>
        <RadioGroup>
          {
            hotuser.map((item, index) => {
              return (
                <Radio value={item.name} key={index + item}>
                  <Col className={styles.topic}>
                    <img src={`${API}/${item.avator}`} width="32" height="32" alt={item.name} />
                    <Link to={{ pathname: '/other', query: { id: item._id } }}>
                      <span style={{ color: '#555' }}>{item.name}</span>
                    </Link>
                  </Col>
                </Radio>
              );
            })
          }
        </RadioGroup>
      </Row>)
    : null;

  const Tags =
    topics.length > 0 ?
      (<Row type="flex" align="center" style={{ padding: '20px' }}>
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
              return (
                <Radio value={item.name} key={index + item}>
                  <Col className={styles.topic}>
                    <img src={item.pic} width="32" height="32" alt={item.name} />
                    {item.name}&nbsp;&nbsp;{item.vote_count}
                  </Col>
                </Radio>
              );
            })
          }
        </RadioGroup>
      </Row>)
    : null;

  return (
    <MainLayout location={location} style={{ background: '#eee' }}>
      <Row className={styles.wrap}>
        <Col span={16} className={styles.articalwrap} >
          <MyTab onChange={onChange1} dispatch={dispatch} />
          <div className="align-center"><Spin spinning={loading && page === 1} /></div>
          {article.length === 0 && !loading ?
            <div className={styles.nodata}><Nodata /></div> : article }
          <Row type="flex" align="center" className="gutter-vl-m">
            {
              !loading && article.length > 0 ?
                <Button
                  type="primary"
                  shape="circle" icon="down"
                  onClick={() => getMore(dispatch)} disabled={article.length % LIMIT !== 0}
                /> : null
            }
            <div><Spin spinning={loading && page > 1} /></div>
          </Row>
        </Col>
        <Col span={7} offset={1} className={styles.tagwrap}>
          <Row className={styles.content}>
            <h2 className={styles.header} style={{ background: '#faaf76' }}>热门标签</h2>
            {Tags}
          </Row>
          <Row className={styles.content}>
            <h2 className={styles.header} style={{ background: '#f79992' }}>活跃用户</h2>
            {HotUser}
          </Row>
        </Col>
      </Row>
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
    hotuser: state.user.hotuser,
  };
}

export default connect(mapStateToProps)(IndexPage);

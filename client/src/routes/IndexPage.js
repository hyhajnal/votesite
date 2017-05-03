import React from 'react';
import { connect } from 'dva';
import { Carousel, Row, Col, Radio } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';
import styles from './IndexPage.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
  listquery.tag = e.target.value;
  console.log(toquery(listquery));
  dispatch({
    type: 'vote/fetch_list',
    payload: toquery(listquery),
  });
}

function onChange1(e, dispatch) {
  listquery.sortkey = e.target.value;
  console.log(toquery(listquery));
  dispatch({
    type: 'vote/fetch_list',
    payload: toquery(listquery),
  });
}

function IndexPage({ location, posts, loading, topics, dispatch }) {
  const article = [];
  posts.forEach((post, i) => {
    article.push(
      <ArticalItem key={i} post={post} loading={loading} />,
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
                全部&nbsp;&nbsp;{posts.length}
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
        </Row>
        <Row type="flex" justify="space-around" style={{ margin: '20px' }}>
          <RadioGroup defaultValue="create_time" size="large" onChange={e => onChange1(e, dispatch)}>
            <RadioButton value="view">最热</RadioButton>
            <RadioButton value="create_time">最新</RadioButton>
          </RadioGroup>
        </Row>
        {article}
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
    posts: state.vote.posts,
    topics: state.vote.topics,
  };
}

export default connect(mapStateToProps)(IndexPage);

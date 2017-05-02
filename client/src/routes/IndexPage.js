import React from 'react';
import { connect } from 'dva';
import { Carousel, Button, Row, Col } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';
import styles from './IndexPage.less';

const ButtonGroup = Button.Group;

function IndexPage({ location, posts, loading, topics }) {
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
        <Row type="flex" justify="space-around" style={{ margin: '20px' }}>
          <ButtonGroup>
            <Button type="primary" icon="cloud" ghost >最新</Button>
            <Button type="primary" icon="cloud-download" ghost >最热</Button>
          </ButtonGroup>
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

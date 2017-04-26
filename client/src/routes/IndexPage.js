import React from 'react';
import { connect } from 'dva';
import { Carousel, Button, Icon, Row, Col } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';

const ButtonGroup = Button.Group;

function IndexPage({ location, posts, loading }) {
  const labelArr = ['教育', '运动健身', '文学', '编程', '运动', '健身', '文学', '编程'];
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

      <Row type="flex" justify="space-around" style={{ margin: '20px' }}>
        {
          labelArr.map((item, index) => {
            return (
              <Col style={{ margin: '5px 0', textAlign: 'center' }} key={index + item}>
                <Button type="primary">
                  <Icon type="left" />{item}
                </Button>
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

      <div className="article-content">
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
  };
}

export default connect(mapStateToProps)(IndexPage);

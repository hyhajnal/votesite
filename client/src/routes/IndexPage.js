import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Carousel, Button, Icon, Row, Col, Card } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticalItem from '../components/Home/ArticalItem';
import PropTypes from 'prop-types';

function IndexPage({ location, posts }) {
  const label_arr = ['教育','运动健身','文学','编程','运动','健身','文学','编程'];
  const article = [];
  posts.map((post, i) => {
    article.push(
      <ArticalItem key={i} post={post}></ArticalItem>
    )
  })
  // for(let i=0; i< 5; i++){
  //   article.push(
  //     <ArticalItem key={i}></ArticalItem>
  //   )
  // }
  return (
    <MainLayout location={location}>
      <Carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>

      <Row type="flex" justify="space-around" style={{ margin:'20px'}}>
        {
          label_arr.map((item, index) => {
            return(
              <Col style={{ margin: '5px 0', textAlign:'center'}} key={index+item}>
                <Button type="primary">
                  <Icon type="left" />{item}
                </Button>
              </Col>
            )
          })
        }
      </Row>

      <div className="article-content">
        {article}
      </div>
      
    </MainLayout>
  );
}

IndexPage.propTypes = {
  //text: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    posts: state.vote.posts,
  };
}

export default connect(mapStateToProps)(IndexPage);

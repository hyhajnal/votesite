import React, { Component } from 'react';
import { Icon, Card } from 'antd';
import { browserHistory, Link } from 'dva/router';
import styles from './ArticalItem.css';

class ArticalItem extends Component {

  redirect = (_id) => {
    browserHistory.push({
      pathname: '/vote',
      query: { _id },
      //state: { fromDashboard: true }
    });
  };

  follow = (relation, voteId, dispatch) => {
    dispatch({ type: 'vote/tofollow', payload: { relation, voteId } });
  }

  unfollow = (relation, voteId, dispatch) => {
    dispatch({ type: 'vote/unfollow', payload: { relation, voteId } });
  }

  render() {
    const { post, loading, userId, dispatch } = this.props;
    const relation = {
      userId,
      otherId: post._id,
      type: 'like',
    };
    if (!post || !post.user) return null;
    const time = post.create_time;
    return (
      // <Link to={{ pathname: "/vote", query: {_id: post._id} }}>
      <Card
        loading={loading} style={{ width: 800 }} bordered={false}
        className={styles.card}
      >
        <div className="card-head">
          <img
            alt="example" width="30" height="30" className="avator-c"
            src={post.user.avator}
          />
          <Link to={{ pathname: '/other', query: { id: post.user._id } }}>
            <span className={`${styles.redirect} label-1 gutter-h`}>{ post.user.name }</span>
          </Link>
          <span className="label-2">
            {time}
          </span>
        </div>
        <div className="gutter-v">
          <h2 className={styles.redirect} onClick={this.redirect.bind(null, post._id)}>
            { post.title }
          </h2>
          <section>{ post.desc }</section>
        </div>
        <div>
          <span className={styles.fenlei}>{ post.tag }</span>
          <span className={styles.footlabel}>
            <Icon className="gutter-h" type="eye-o" />{ post.view }
          </span>
          <span className={styles.footlabel}>
            <Icon className="gutter-h" type="message" />{ post.msg }
          </span>
          <span className={styles.footlabel}>
            {post.isfollow ?
              <Icon
                className="gutter-h"
                type="heart"
                onClick={() => this.unfollow(relation, post._id, dispatch)}
              /> :
              <Icon
                className="gutter-h"
                type="heart-o"
                onClick={() => this.follow(relation, post._id, dispatch)}
              />
            }
            { post.follow }
          </span>
        </div>
      </Card>
    );
  }
}

export default ArticalItem;

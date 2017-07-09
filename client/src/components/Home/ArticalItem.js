import React, { Component } from 'react';
import { Icon, Card, message } from 'antd';
// import { browserHistory, Link } from 'dva/router';
import { hashHistory, Link } from 'dva/router';
import styles from './ArticalItem.less';
import timeFilter from '../../utils/timefilter';
import { API } from '../../constants';

class ArticalItem extends Component {

  redirect = (_id) => {
    // browserHistory.push({
    //   pathname: '/vote',
    //   query: { _id },
    // });
    hashHistory.push({
      pathname: '/vote',
      search: `?_id=${_id}`,
    });
  };

  follow = (relation, post, dispatch) => {
    if (relation.userId === post.user) return message.warn('不好意思，不能给自己的投票点赞！');
    dispatch({ type: 'vote/tofollow', payload: { relation, voteId: post._id } });
  }

  unfollow = (relation, post, dispatch) => {
    dispatch({ type: 'vote/unfollow', payload: { relation, voteId: post._id } });
  }

  render() {
    const { post, loading, userId, dispatch } = this.props;
    const relation = {
      userId,
      otherId: post._id,
      type: 'like',
    };
    if (!post || !post.user) return null;
    const time = post.post_time;
    return (
      // <Link to={{ pathname: "/vote", query: {_id: post._id} }}>
      <Card
        loading={loading} bordered={false}
        className={styles.card}
      >
        <div className="card-head">
          <img
            alt="avatar" width="30" height="30" className="avator-c"
            src={`${API}/${post.user.avator}`}
          />
          <Link to={{ pathname: '/other', query: { id: post.user._id } }}>
            <span className={`${styles.redirect} label-1 gutter-h`}>{ post.user.name }</span>
          </Link>
          <span className="label-2">
            {timeFilter(time)}
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
                className="gutter-h like"
                type="heart"
                onClick={() => this.unfollow(relation, post, dispatch)}
              /> :
              <Icon
                className="gutter-h"
                type="heart-o"
                onClick={() => this.follow(relation, post, dispatch)}
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

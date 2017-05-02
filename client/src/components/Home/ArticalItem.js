import React, { Component } from 'react';
import { Icon, Card } from 'antd';
import { hashHistory } from 'dva/router';
import styles from './ArticalItem.css';


class ArticalItem extends Component {

  redirect = (_id) => {
    hashHistory.push({
      pathname: '/vote',
      query: { _id },
      //state: { fromDashboard: true }
    });
  };

  render() {
    const { post, loading } = this.props;
    if (!post || !post.user) return null;
    const time = post.create_time;
    return (
      // <Link to={{ pathname: "/vote", query: {_id: post._id} }}>
      <Card
        loading={loading} style={{ width: 800 }} bordered={false}
        className={styles.card} onClick={this.redirect.bind(null, post._id)}
      >
        <div className="card-head">
          <img
            alt="example" width="30" height="30" className="avator-c"
            src={post.user.avator}
          />
          <span className="label-1 gutter-h">{ post.user.name }</span>
          <span className="label-2">
            {time}
          </span>
        </div>
        <div className="gutter-v">
          <h2>{ post.title }</h2>
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
            <Icon className="gutter-h" type="heart-o" />{ post.follow }
          </span>
        </div>
      </Card>
     // </Link>
    );
  }
}

export default ArticalItem;

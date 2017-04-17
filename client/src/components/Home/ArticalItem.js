import React from 'react';
import { Button, Icon, Row, Col, Card } from 'antd';
import styles from './ArticalItem.css';

function ArticalItem ({ post }) {
  const time = `${post.time.split(" ")[0]}${post.time.split(" ")[1]} ago`;
	return (
		<Card style={{ width: 800 }} bordered={false} className="card">
      <div className="card-head">
        <img alt="example" width="30" height="30" className="avator-c"
        src={ post.user.pic } />
        <span className='label-1 gutter-h'>{ post.user.name }</span>
        <span className='label-2'>
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
          <Icon className="gutter-h" type="star-o" />{ post.follow }
        </span>
      </div>
    </Card>
	);
}

export default ArticalItem;
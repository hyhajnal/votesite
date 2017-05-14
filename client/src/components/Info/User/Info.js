import React from 'react';
import { Button } from 'antd';
import styles from './Info.less';

function Info({ user, changeEdit }) {
  return (
    <div className={styles.info}>
      <img src={user.avator} alt={user.name} width="150" height="150" />
      <div className="gutter-vl-m"><span>昵称:</span><span className="gutter-h-m">{user.name}</span></div>
      <div className="gutter-vl-m"><span>介绍:</span><span className="gutter-h-m">{user.desc}</span></div>
      <Button type="primary" onClick={() => changeEdit(true)}>编辑</Button>
    </div>
  );
}

export default Info;

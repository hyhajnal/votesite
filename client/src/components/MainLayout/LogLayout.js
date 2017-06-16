import React from 'react';
import styles from './LogLayout.less';
import { API } from '../../constants';

const LogLayout = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <img alt={'logo'} src={`${API}/static/xiaoji.svg`} />
        <span>投票网站</span>
      </div>
      { children }
    </div>
  );
};

export default LogLayout;

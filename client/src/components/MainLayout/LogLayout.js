import React from 'react';
import styles from './LogLayout.less';

const LogLayout = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <img alt={'logo'} src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
        <span>投票网站</span>
      </div>
      { children }
    </div>
  );
};

export default LogLayout;

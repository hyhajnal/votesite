import React from 'react';
import styles from './Nodata.css';
import { API } from '../../constants';

function Nodata() {
  return (
    <div className={styles.normal}>
      <img src={`${API}/static/nodata.svg`} width="400" height="250" alt="" />
      <h1>没有找到数据哦！</h1>
    </div>
  );
}

export default Nodata;

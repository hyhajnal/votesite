import React from 'react';
import { connect } from 'dva';
import styles from './Redirect.css';

function Redirect() {
  return (
    <div className={styles.normal}>
      Route Component: Redirect
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Redirect);

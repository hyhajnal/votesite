import React from 'react';
import { connect } from 'dva';
import styles from './VoteEdit.css';
import MainLayout from '../components/MainLayout/MainLayout';
import VoteForm from '../components/Vote/Vote';

function VoteEdit({ lacation }) {
  return (
  	<MainLayout location={ location }>
	    <div className={styles.normal}>
	      <VoteForm></VoteForm>
	    </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(VoteEdit);

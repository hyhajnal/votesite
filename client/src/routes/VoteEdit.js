import React from 'react';
import { connect } from 'dva';
import styles from './VoteEdit.css';
import MainLayout from '../components/MainLayout/MainLayout';
import VoteForm from '../components/Vote/Vote';

function VoteEdit({ location, dispatch, topics }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <VoteForm topics={topics} dispatch={dispatch} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    topics: state.vote.topics,
  };
}

export default connect(mapStateToProps)(VoteEdit);

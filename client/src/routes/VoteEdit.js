import React from 'react';
import { connect } from 'dva';
import styles from './VoteEdit.css';
import MainLayout from '../components/MainLayout/MainLayout';
import VoteForm from '../components/Vote/Vote';

function VoteEdit({ location, dispatch, topics, vote }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <VoteForm topics={topics} dispatch={dispatch} vote={vote} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    topics: state.vote.topics,
    vote: state.vote.vote,
  };
}

export default connect(mapStateToProps)(VoteEdit);

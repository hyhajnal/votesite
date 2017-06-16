import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UsersComponent from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

function Users({ location, dispatch, list, loading }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        {
          !list[0] ? null :
          <UsersComponent
            dispatch={dispatch}
            list={list}
            loading={loading}
          />
        }
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.user,
    list: state.user.list,
  };
}

export default connect(mapStateToProps)(Users);

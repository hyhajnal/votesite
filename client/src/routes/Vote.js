import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Button, Modal, Icon, Spin } from 'antd';
import styles from './Vote.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Comment from '../components/Comment/Comment';
import timeFilter from '../utils/timefilter';

const confirm = Modal.confirm;

function createVoteList(list, isVoted, dispatch, voteId) {
  const voteList = [];
  list.forEach((vote, i) => {
    voteList.push(
      <Col span={6} key={i} style={{ marginBottom: '16px' }} className={classnames({ [styles.votemark]: isVoted === i })}>
        <Card bodyStyle={{ padding: 0 }}>
          {
            !vote.pic ? null :
            <div className="custom-image">
              <img alt="example" width="100%" src={vote.pic} />
            </div>
          }
          <div className="custom-card align-center gutter">
            <h3 className={styles.lineone}>{vote.title}</h3>
            <p className={classnames(styles.linemore, 'align-left', 'gutter-v-m')}>{ vote.desc }</p>
            <p>
              { isVoted === -1 ?
                <Button
                  type="primary"
                  onClick={showConfirm.bind(null, dispatch, vote, i, voteId)}
                >投票</Button>
                : (<span className={styles.cardnum}>{vote.num}</span>) }
            </p>
          </div>
          {
            isVoted === i ? (<Icon type="check-circle-o" className={styles.markicon} />) : null
          }
        </Card>
      </Col>,
    );
  });
  return voteList;
}

function showConfirm(dispatch, vote, idx, voteId) {
  confirm({
    title: '你选择了以下选项，确定投票么?',
    content: `${vote.title}`,
    onOk() {
      dispatch({ type: 'vote/to_vote', payload: { voteId, idx } });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function Vote({ location, vote, dispatch, loading, user }) {
  if (!vote.title) return null;
  const { votelist, comments, is_voted } = vote;
  const voteList = votelist ? createVoteList(votelist, is_voted, dispatch, vote._id) : null;
  return (
    <MainLayout location={location}>
      <Spin spinning={loading} />
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row type="flex" justify="space-between">
          <Col>
            <h1>{ vote.title }</h1>
          </Col>
          <Col>
            <img
              alt="example" width="30" height="30"
              className="avator-c" src={vote.user.avator}
            />
            <span className="label-1 gutter-h">
              <Link to={`/other?id=${vote.user._id}`}>{ vote.user.name }</Link>
            </span>
            <span className="label-2">{ timeFilter(vote.create_time, 1) } ~ { vote.end_time ? timeFilter(vote.end_time, 1) : '至今' }</span>
          </Col>
        </Row>
        <section className="gutter-vl-m">
          { vote.desc }
        </section>
        <Row gutter={16}>
          {voteList}
        </Row>
      </div>

      <div style={{ background: '#fff', padding: '30px' }}>
        {
          comments.length > 0 ?
          comments.map((comment, i) =>
            <Comment
              comment={comment} key={i} top={i === 0}
              userId={user._id} voteId={vote._id} dispatch={dispatch}
            />) : null
        }
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    vote: state.vote.vote,
    user: state.user.user,
    loading: state.loading.models.vote,
  };
}

export default connect(mapStateToProps)(Vote);

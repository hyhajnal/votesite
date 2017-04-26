import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Row, Col, Card, Button, Modal, Icon } from 'antd';
import styles from './Vote.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Comment from '../components/Comment/Comment';
import Spinner from '../components/Common/Spinner';


const confirm = Modal.confirm;

function createVoteList(list, isVoted, dispatch, voteId) {
  const voteList = [];
  list.forEach((vote, i) => {
    voteList.push(
      <Col span={6} key={i} style={{ marginBottom: '16px' }} className={classnames({ [styles.votemark]: isVoted === i })}>
        <Card bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example" width="100%" src={vote.pic} />
          </div>
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

function Vote({ location, vote, dispatch, loading }) {
  if (!vote.title) return null;
  const { votelist, comments, isVoted } = vote;
  const time = vote.create_time;
  const voteList = votelist ? createVoteList(votelist, isVoted, dispatch, vote._id) : null;
  return (
    <MainLayout location={location}>
      <Spinner loading={loading} />
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row type="flex" justify="start">
          <Col>
            <h1>{ vote.title }</h1>
          </Col>
          <Col>
            <img
              alt="example" width="30" height="30"
              className="avator-c" src={vote.user.avator}
            />
            <span className="label-1 gutter-h">{ vote.user.name }</span>
            <span className="label-2">{ time }</span>
          </Col>
        </Row>
        <section>
          { vote.title }
        </section>
        <Row gutter={16}>
          {voteList}
        </Row>
      </div>

      <div style={{ background: '#fff', padding: '30px' }}>
        {
          !comments ? null :
          comments.forEach((comment, index) =>
            <Comment comment={comment} key={index} top={index === 0} />,
          )
        }
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    vote: state.vote.vote,
    loading: state.loading.models.vote,
  };
}

export default connect(mapStateToProps)(Vote);

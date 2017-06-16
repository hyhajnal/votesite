import React from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Button, Modal, Icon, Spin, Input } from 'antd';
import moment from 'moment';
import styles from './Vote.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Comment from '../components/Comment/Comment';
import timeFilter from '../utils/timefilter';
import { API } from '../constants';

const confirm = Modal.confirm;

function createVoteList(list, isVoted, dispatch, voteId, status) {
  const voteList = [];
  list.forEach((vote, i) => {
    voteList.push(
      <Col span={4} key={i} style={{ marginBottom: '16px' }} className={classnames({ [styles.votemark]: isVoted === i })}>
        <Card bodyStyle={{ padding: 0 }}>
          {
            !vote.pic ? null :
            <div className="custom-image">
              <img alt="pic" width="100%" height="140" src={`${API}/${vote.pic}`} />
            </div>
          }
          <div className="custom-card align-center gutter">
            <h3 className={styles.lineone}>{vote.title}</h3>
            <p className={classnames(styles.linemore, 'align-left', 'gutter-v-m')}>{ vote.desc }</p>
            <p>
              { isVoted === -1 && status !== '已结束' ?
                <Button
                  type="primary"
                  disabled={status === '未开始'}
                  onClick={showConfirm.bind(null, dispatch, vote, i, voteId)}
                >投票</Button>
                : (<span className={styles.cardnum}>{vote.num ? vote.num : 0}票</span>) }
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

function handleComment(e, dispatch, { from, to, pid, voteId }) {
  if (e.keyCode === 13) {
    const content = e.target.value;
    e.target.value = '';
    const comment = { content, from, to, pid, voteId, create_time: new Date() };
    dispatch({ type: 'vote/to_comment', payload: { comment } });
  }
}

function Vote({ location, vote, dispatch, loading, user }) {
  if (!vote.title) return null;
  const { votelist, comments, is_voted } = vote;
  let status;
  if (moment() < moment(vote.create_time)) {
    status = '未开始';
  } else if (moment() > moment(vote.end_time)) {
    status = '已结束';
  } else {
    status = '进行中';
  }
  const voteList = votelist ? createVoteList(votelist, is_voted, dispatch, vote._id, status) : null;
  return (
    <MainLayout location={location}>
      <Spin spinning={loading} />
      <div style={{ background: '#fff', padding: '30px' }}>
        <Row type="flex" justify="center">
          <Col span={12}>
            <img
              alt="example" width="30" height="30"
              className="avator-c" src={`${API}/${vote.user.avator}`}
            />
            <span className="label-1 gutter-h">
              <Link to={`/other?id=${vote.user._id}`}>{ vote.user.name }</Link>
            </span>
            <span className="label-2">{ timeFilter(vote.create_time, 1) } ~ { vote.end_time ? timeFilter(vote.end_time, 1) : '至今' }</span>
          </Col>
          <Col span={12}>
            <Row type="flex" align="end" className="gutter-v-m">
              {vote.user._id !== user._id ? null :
              <div>
                <Link to="/voteEdit" className="gutter-h-m"><Button type="primary" ghost>编辑</Button></Link>
                {
                  status === '进行中' ?
                    <Button
                      type="primary" ghost className="gutter-h-m"
                      onClick={() => dispatch({ type: 'vote/changestate_vote', payload: { voteId: vote._id, tostart: 0 } })}
                    >
                      结束投票
                    </Button> : null
                }
                {
                  status === '未开始' ?
                    <Button
                      type="primary" ghost className="gutter-h-m"
                      onClick={() => dispatch({ type: 'vote/changestate_vote', payload: { voteId: vote._id, tostart: 1 } })}
                    >
                      开始投票
                    </Button> : null
                }
                <Button
                  type="primary" ghost className="gutter-h-m"
                  onClick={() => dispatch({ type: 'vote/del_vote', payload: { voteId: vote._id } })}
                >
                  删除投票
                </Button>
              </div>
              }
            </Row>
          </Col>
        </Row>
        <section className="gutter-v-m">
          <h1>{ vote.title }</h1>
          { vote.desc }
          <Row type="flex" align="center" className="gutter-vl-m">
            <span className={styles.tag}>第{vote.round}轮</span>
            <span className={styles.tag}>{status}</span>
            <span className={styles.tag}>取前{vote.multi && vote.multi > 0 ? vote.multi : 1}名</span>
          </Row>
        </section>
        <Row gutter={16}>
          {voteList}
        </Row>
      </div>

      <div style={{ background: '#fff', padding: '30px' }}>
        <Input
          type="textarea" rows={4} placeholder="发表你的评论, 按下Enter即可发送"
          style={{ marginBottom: '20px' }}
          onKeyDown={e => handleComment(e, dispatch,
            { voteId: vote._id, pid: -1, from: user._id, to: vote.user },
          )}
        />
        {
          comments.length > 0 ?
          comments.map((comment, i) =>
            <Comment
              comment={comment} key={i}
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

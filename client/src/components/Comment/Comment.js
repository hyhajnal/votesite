import { uniqWith as _uniqWith, isEqual as _isEqual } from 'lodash';
import React, { Component } from 'react';
import { Icon, Row, Col, Card, Mention, Button, Modal, message } from 'antd';
import { Link } from 'dva/router';
import classnames from 'classnames';
import styles from './Comment.less';
import timeFilter from '../../utils/timefilter';
import { API } from '../../constants';

const { toEditorState, toString } = Mention;
const Nav = Mention.Nav;
const confirm = Modal.confirm;

let mentionArray = [];

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      suggestions: [],
      selectId: '',
      selectName: '',
      value: toEditorState(''),
    };
  }

  onSelect = (suggestion, data) => {
    this.setState({ selectId: data._id, selectName: data.name });
  }

  onSearchChange = (value) => {
    const searchValue = value;
    const filtered = mentionArray.filter(item =>
      item.name.indexOf(searchValue) !== -1,
    );
    const suggestions = filtered.map(suggestion =>
      <Nav value={suggestion.name} data={suggestion} disabled={suggestion.disabled}>
        <span>
          <img alt={suggestion.name} style={{ height: 16, width: 16, marginRight: 5, float: 'left' }} src={`${API}/${suggestion.icon}`} />
          {suggestion.name}
        </span>
      </Nav>);
    this.setState({ suggestions });
  }

  handleExpand = (e, to) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
      selectId: to._id,
      selectName: to.name,
    });
  }

  handleChange = (editorState) => {
    this.setState({
      value: editorState,
    });
  }

  handleChildComment = (dispatch, { from, to, pid, voteId }) => {
    if (to === from) return message.warn('不好意思，自己不能评论自己！');
    this.setState({ value: toEditorState('') });
    const reg = new RegExp(`@${this.state.selectName}`, 'g');
    const content = toString(this.state.value).replace(reg, '').trim();
    const comment = { content, from, to, pid, voteId, create_time: new Date() };
    dispatch({ type: 'vote/to_comment', payload: { comment } });
  }

  handleDelete = (dispatch, comment, voteId) => {
    confirm({
      title: '你确定删除此条评论吗',
      content: '',
      onOk() {
        dispatch({ type: 'vote/delete_comment', payload: { comment, voteId } });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  follow = (relation, dispatch, voteId) => {
    dispatch({ type: 'vote/tofollow', payload: { relation, voteId } });
  }

  unfollow = (relation, dispatch, voteId) => {
    dispatch({ type: 'vote/unfollow', payload: { relation, voteId } });
  }

  render() {
    const { comment, brother, dispatch, userId, voteId } = this.props;
    const { open, suggestions } = this.state;
    const relation = {
      userId,
      otherId: comment._id,
      type: 'comment',
    };
    if (brother) {
      mentionArray = [];
      brother.forEach((commentBrother) => {
        if (commentBrother.from._id === userId) return;
        mentionArray.push({
          _id: commentBrother.from._id,
          name: commentBrother.from.name,
          icon: commentBrother.from.avator,
        });
      });
      mentionArray = _uniqWith(mentionArray, _isEqual);
    }
    return (
      <div>
        <Card
          style={{ width: '100%', marginBottom: '20px' }}
          className={classnames('card', { [styles.childcard]: brother && brother.length > 0 })}
          title={
            brother && brother.length > 0 ? null :
            <Row type="flex" justify="space-between" align="center">
              <Col>
                <img
                  alt="example" width="30" height="30"
                  className="avator-c" src={`${API}/${comment.from.avator}`}
                />
                <span className="label-1 gutter-h">
                  <Link to={`/other?id=${comment.from._id}`}>{comment.from.name}</Link>
                </span>
                <span className="label-2">{ timeFilter(comment.time) }</span>
              </Col>
              {
                comment.from._id === userId ?
                  <Col>
                    <Button
                      type="danger" shape="circle" icon="close"
                      size="small" className="gutter-h-m" ghost
                      onClick={() => this.handleDelete(dispatch, comment, voteId)}
                    />
                  </Col>
                  : null
              }
            </Row>}
        >
          <div className="gutter-v">
            { brother && brother.length > 0 ?
              (<section>
                <Link to={`/other?id=${comment.from._id}`}>{comment.from.name}</Link>
                回复
                <Link to={`/other?id=${comment.from._id}`}>{comment.to.name}</Link>：
                {comment.content}
                <p className={styles.del}>
                  {comment.from._id === userId ?
                    <span onClick={() => this.handleDelete(dispatch, comment, voteId)}>删除</span>
                    : null}
                </p>
              </section>
              )
              : comment.content
            }
          </div>
          {
            brother && brother.length > 0 ? null :
            <Row type="flex" justify="end">
              <span className={styles.footlabel}>
                <Icon className="gutter-h" type="message" onClick={e => this.handleExpand(e, comment.from)} />{comment.childs.length}
              </span>
              <span className={styles.footlabel}>
                {comment.isfollow ?
                  <Icon
                    className="gutter-h like"
                    type="heart"
                    onClick={() => this.unfollow(relation, dispatch, voteId)}
                  /> :
                  <Icon
                    className="gutter-h"
                    type="heart-o"
                    onClick={() => this.follow(relation, dispatch, voteId)}
                  />
                }
                {comment.star}
              </span>
            </Row>

          }
          {
            comment.childs.length > -1 && open ?
              (<div>
                <Mention
                  style={{ width: '100%', height: 100, margin: '5px' }}
                  onSelect={this.onSelect}
                  placeholder="@someone"
                  onChange={this.handleChange}
                  value={this.state.value}
                  suggestions={suggestions}
                  onSearchChange={this.onSearchChange}
                />
                <Row type="flex" align="end" className="gutter-v-m">
                  <Button
                    onClick={() => this.handleChildComment(dispatch,
                    { voteId, pid: comment._id, from: userId, to: this.state.selectId })}
                  >
                    提交
                  </Button>
                </Row>
              </div>)
              : null
          }
          { comment.childs.length > 0 &&
            comment.childs[0].content !== undefined && open ?
              comment.childs.map((child, i) =>
                <Comment
                  comment={child} key={i} brother={comment.childs}
                  userId={userId} voteId={voteId} dispatch={dispatch}
                />)
              : null
          }
        </Card>
      </div>
    );
  }

}

export default Comment;

import { uniqWith as _uniqWith, isEqual as _isEqual } from 'lodash';
import React, { Component } from 'react';
import { Icon, Row, Col, Card, Input, Mention, Button, Modal } from 'antd';
import classnames from 'classnames';
import styles from './Comment.less';

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
          <img alt={suggestion.name} style={{ height: 16, width: 16, marginRight: 5, float: 'left' }} src={suggestion.icon} />
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
    const reg = new RegExp(`@${this.state.selectName}`, 'g');
    const content = toString(this.state.value).replace(reg, '').trim();
    const comment = { content, from, to, pid, voteId, create_time: new Date() };
    dispatch({ type: 'vote/to_comment', payload: { comment } });
    this.setState({ value: toEditorState('') });
  }


  handleComment = (e, dispatch, { from, to, pid, voteId }) => {
    if (e.keyCode === 13) {
      const content = e.target.value;
      const comment = { content, from, to, pid, voteId, create_time: new Date() };
      dispatch({ type: 'vote/to_comment', payload: { comment } });
    }
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

  render() {
    const { comment, top, brother, dispatch, userId, voteId } = this.props;
    const { open, suggestions } = this.state;
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
        {top ? (
          <Input
            type="textarea" rows={4} placeholder="发表你的评论, 按下Enter即可发送"
            style={{ marginBottom: '20px' }}
            onKeyDown={e => this.handleComment(e, dispatch,
              { voteId, pid: -1, from: userId, to: comment.to._id },
            )}
          />) : null
        }
        <Card
          style={{ width: '100%', marginBottom: '20px' }}
          className={classnames('card', { [styles.childcard]: brother && brother.length > 0 })}
          title={
            brother && brother.length > 0 ? null :
            <Row type="flex" justify="space-between" align="center">
              <Col>
                <img
                  alt="example" width="30" height="30"
                  className="avator-c" src={comment.from.avator}
                />
                <span className="label-1 gutter-h">
                  {comment.from.name}
                </span>
                <span className="label-2">{ comment.time }</span>
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
            <section>
              { brother && brother.length > 0 ?
                (<p>
                  <a href="">{comment.from.name}</a>
                  回复
                  <a href="">{comment.to.name}</a>：
                  {comment.content}
                  <p className={styles.del}>
                    {comment.from._id === userId ?
                      <span onClick={() => this.handleDelete(dispatch, comment, voteId)}>删除</span>
                      : null}
                  </p>
                </p>
                )
                : comment.content
              }
            </section>
          </div>
          {
            brother && brother.length > 0 ? null :
            <Row type="flex" justify="end">
              <span className={styles.footlabel}>
                <Icon className="gutter-h" type="message" onClick={e => this.handleExpand(e, comment.from)} />{comment.childs.length}
              </span>
              <span className={styles.footlabel}>
                <Icon className="gutter-h" type="heart-o" />{comment.star}
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

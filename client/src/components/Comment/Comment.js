import { uniqWith as _uniqWith, isEqual as _isEqual } from 'lodash';
import React, { Component } from 'react';
import { Icon, Row, Card, Input, Mention, Nav } from 'antd';
import styles from './Comment.css';

const { toString, toEditorState } = Mention;
// const Nav = Mention.Nav;

let mentionArray = [];

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      suggestions: [],
    };
  }

  onChange = (editorState) => {
    console.log(toString(editorState));
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

  handleExpand = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { comment, top, brother } = this.props;
    const { open, suggestions } = this.state;
    if (brother) {
      mentionArray = [];
      brother.forEach((commentBrother) => {
        mentionArray.push({
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
            type="textarea" rows={4} placeholder="发表你的评论"
            style={{ marginBottom: '20px' }}
          />) : null
        }
        <Card
          style={{ width: '100%', marginBottom: '20px' }} className="card"
          title={<div>
            <img
              alt="example" width="30" height="30"
              className="avator-c" src={comment.from.avator}
            />
            <span className="label-1 gutter-h">
              {comment.from.name}{ !comment.childs[0].from ?
                (<span style={{ color: 'blue' }}>@</span>)
                  : null}
              { !comment.childs[0].from ? comment.to.name : null}
            </span>
            <span className="label-2">{ comment.time }</span>
          </div>}
        >
          <div className="gutter-v">
            <section>{comment.content}</section>
          </div>
          <Row type="flex" justify="end">
            <span className={styles.footlabel}>
              <Icon className="gutter-h" type="message" onClick={this.handleExpand} />{comment.msg}
            </span>
            <span className={styles.footlabel}>
              <Icon className="gutter-h" type="star-o" />{comment.star}
            </span>
          </Row>
          {
            comment.childs.length > 0 && open ?
              (<Mention
                style={{ width: '100%', height: 100, marginBottom: '20px' }}
                onChange={this.onChange}
                defaultValue={toEditorState('@')}
                suggestions={suggestions}
                onSearchChange={this.onSearchChange}
              />)
              : null
          }
          { comment.childs.length > 0 && open ?
            comment.childs.forEach((child, i) =>
              <Comment
                comment={child} key={i} brother={comment.childs}
              />)
            : null
          }
        </Card>
      </div>
    );
  }

}

export default Comment;

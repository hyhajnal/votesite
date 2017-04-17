import React, { Component } from 'react';
import { Button, Icon, Row, Col, Card, Input, Mention } from 'antd';
import styles from './Comment.css';
const { toString, toEditorState } = Mention;

class Comment extends Component{
	constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleExpand = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  }

	onChange = (editorState) => {
		console.log(toString(editorState));
	}

	onSelect = (suggestion) => {
		console.log('onSelect', suggestion);
	}

	render(){
		const { comment, top } = this.props;
		const { open } = this.state;
		return (
			<div>
				{
					top ?
					(	<Mention
						 className="gutter-v-m"
							style={{ width: '100%', height: 100 }}
							onChange={this.onChange}
							defaultValue={toEditorState('@afc163')}
							suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
							onSelect={this.onSelect}
						/> )
						: null
				}
				
				<Card style={{ width: '100%', marginBottom: '20px'}} className="card"
					title={<div>
						<img alt="example" width="30" height="30" className="avator-c" src={ comment.from.pic } />
						<span className='label-1 gutter-h'>
							{comment.from.name}					
							{ 
								comment.childs.length === 0 ?
									( <span style={{ color: 'blue' }}>@</span>)
									: null
							}
							{ 
								comment.childs.length === 0 ?
									comment.to.name 
									: null
							}
						</span>
						<span className='label-2'>{ `${comment.time.split(' ')[0]} ${comment.time.split(' ')[1]} ago` }</span>
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
							<Icon className="gutter-h" type="star-o" />{comment.view}
						</span>
					</Row>
					{
						comment.childs.length > 0 && open?
							(	<Mention
								className="gutter-v-m"
									style={{ width: '100%', height: 100 }}
									onChange={this.onChange}
									defaultValue={toEditorState('@afc163')}
									suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
									onSelect={this.onSelect}
								/> )
							: null
					}
					{ comment.childs.length > 0 && open?
						comment.childs.map( comment => 
							<Comment comment={comment} key={ comment.id }></Comment>
						) : null
					}
				</Card>
			</div>
		);
	};

}

export default Comment;
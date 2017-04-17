import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Card, Button } from 'antd';
import styles from './Vote.css';
import MainLayout from '../components/MainLayout/MainLayout';
import Comment from '../components/Comment/Comment';
import classnames from 'classnames';

const { Header, Content, Footer } = Layout;

function createVoteList(list, isVote, handleVote){
	const voteList = [];
	list.map((vote, i) => {
		voteList.push(
			<Col className="gutter-row" span={6} key={i}>
				<Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }} className="gutter-v-m">
					<div className="custom-image">
						<img alt="example" width="100%" src={vote.pic} />
					</div>
					<div className="custom-card align-center gutter">
						<h3>{vote.title}</h3>
						<p className={classnames(styles.linemore,'align-left','gutter-v-m')}>{ vote.desc }</p>
						<p>
							{
								!isVote ? (<Button type="primary" onClick={handleVote}>投票</Button>) : vote.num
							}
						</p>
					</div>
				</Card>
			</Col>
		);
	});
	return voteList;
}

function Vote({ location, vote, comment, isVote, dispatch }) {

		function handleVote() {
			dispatch({ type: 'vote/to_vote' })
		}
		if (!vote.time) return null;
		const time = `${vote.time.split(" ")[0]}${vote.time.split(" ")[1]} ago`;
		const voteList = createVoteList(vote.votelist, isVote, handleVote);
		return (
			<MainLayout location={location}>
				<div style={{ background: '#fff', padding: '30px' }}>
					<Row type="flex" justify="start">
						<Col>
							<h1>{ vote.title }</h1>
						</Col>
						<Col>
							<img alt="example" width="30" height="30" className="avator-c"
											src={ vote.user.pic } />
											<span className='label-1 gutter-h'>{ vote.user.name }</span>
											<span className='label-2'>{ time }</span>
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
							!comment ? null :
							comment.map( (comment, index) => 
								<Comment comment={comment} key={comment.id} top={index === 0}/>
							)
						}
				</div>
			</MainLayout>
		);

}

function mapStateToProps(state, ownProps) {
  return {
		isVote: state.vote.isVote,
		vote: state.vote.vote,
		comment: state.vote.comment
	};
}

export default connect(mapStateToProps)(Vote);

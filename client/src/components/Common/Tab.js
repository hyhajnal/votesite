import React, { Component } from 'react';
import { Row } from 'antd';
import classnames from 'classnames';
import styles from './Tab.less';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
    };
  }

  changeType = (type) => {
    this.setState({ type });
    this.props.onChange(type, this.props.dispatch);
  }

  render() {
    return (
      <Row
        type="flex"
        justify="space-around"
        className={styles.articleTag}
      >
        <a
          onClick={() => this.changeType(1)}
          className={classnames({ [styles.active]: this.state.type === 1 }, styles.tab)}
        >
          最热
        </a>
        <a
          onClick={() => this.changeType(0)}
          className={classnames({ [styles.active]: this.state.type === 0 }, styles.tab)}
        >
          最新
        </a>
      </Row>
    );
  }
}

export default Tab;

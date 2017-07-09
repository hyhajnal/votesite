import React, { Component } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';

class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '# Markdown',
    };
  }

  updateCode = code => this.setState({ code });

  render() {
    return (
      <MainLayout location={this.props.location}>
        <div>待开发</div>
      </MainLayout>
    );
  }
}

export default Markdown;

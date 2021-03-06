import React, { Component } from 'react';
import { Button, Row, Form, Input } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
// import styles from './Register.less';
import LogLayout from '../components/MainLayout/LogLayout';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }

  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return errors;
      }
      const user = {
        accountId: values.accountId,
        psd: values.password,
      };
      dispatch({ type: 'user/login', payload: { user } });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LogLayout>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('accountId', {
              rules: [
                {
                  required: true,
                  message: '请输入你的帐号',
                },
              ],
            })(<Input size="large" onPressEnter={this.handleOk} placeholder="请输入你的帐号" />)}
          </FormItem>
          <FormItem
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入新密码!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" placeholder="请输入密码" />,
            )}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.handleOk} loading={this.props.loading}>
              登录
            </Button>
          </Row>
          <p><Link to="/register">还没帐号？快去注册一个吧！</Link></p>
        </form>
      </LogLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(Form.create()(Login));


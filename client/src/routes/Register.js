import React, { Component } from 'react';
import { Button, Row, Form, Input } from 'antd';
import { connect } from 'dva';
// import styles from './Register.less';
import LogLayout from '../components/MainLayout/LogLayout';

const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }

  handleOk = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { dispatch } = this.props;
    console.log(this.props);
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return errors;
      }
      console.log(values);
      const user = {
        accountId: Math.random().toString(36).substr(2),
        name: values.username,
        psd: values.password,
      };
      dispatch({ type: 'user/reg', payload: { user } });
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码必须一致!');
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LogLayout>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入你的昵称',
                },
              ],
            })(<Input size="large" onPressEnter={this.handleOk} placeholder="请输入你的昵称" />)}
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
          <FormItem
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '两次密码不一致!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次输入密码" />,
            )}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.handleOk} loading={this.props.loading}>
              注册
            </Button>
          </Row>
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

export default connect(mapStateToProps)(Form.create()(Register));


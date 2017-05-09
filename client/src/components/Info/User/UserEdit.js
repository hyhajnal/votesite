import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import Avatar from './Avatar';
import './UserEdit.css';

const FormItem = Form.Item;

class UserEditForm extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({ type: 'user/edit', payload: { user: values } });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newpsd')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <Row className="gutter-vl-m">
        <Col span={18}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="昵称"
              hasFeedback
            >
              {getFieldDecorator('name', {
                initialValue: user.name,
                rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="介绍"
              hasFeedback
            >
              {getFieldDecorator('desc', {
                initialValue: user.desc,
                rules: [{ message: '请输入个人简介!', whitespace: true }],
              })(
                <Input type="textarea" rows={4} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="原密码"
              hasFeedback
            >
              {getFieldDecorator('oldpsd', {
                rules: [{
                  required: true, message: '请输入原密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
              hasFeedback
            >
              {getFieldDecorator('newpsd', {
                rules: [{
                  required: true, message: '请输入新密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认新密码"
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '两次密码不一致!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" ghost size="large">取消</Button>
              <Button type="primary" htmlType="submit" size="large" className="gutter-hl-m">保存</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span={6}>
          <Avatar pic={user.avator} />
        </Col>
      </Row>
    );
  }
}

const UserEdit = Form.create()(UserEditForm);
export default UserEdit;

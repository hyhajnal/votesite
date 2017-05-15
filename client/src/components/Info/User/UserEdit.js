import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import Avatar from './Avatar';
import './UserEdit.css';
import Info from './Info';

const FormItem = Form.Item;

class UserEditForm extends Component {
  state = {
    confirmDirty: false,
    edit: false,
  };
  setPic = (key, value) => {
    const form = this.props.form;
    form.setFieldsValue({
      [key]: value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({ type: 'user/edit', payload: { user: values } });
        this.changeEdit(false);
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
  changeEdit = (edit) => {
    this.setState({ edit });
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
    const edit = this.state.edit;
    return (
      <Row className="gutter-vl-m">
        { !edit ? <Info user={user} changeEdit={this.changeEdit} /> :
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Col span={18}>
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
                    validator: this.checkPassword,
                  }],
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} />,
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large">保存</Button>
                <Button
                  type="primary"
                  size="large"
                  ghost className="gutter-h-m"
                  onClick={() => this.changeEdit(false)}
                >
                  取消
                </Button>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('avator')(
                  <Avatar
                    pic={user.avator}
                    savename={Math.random().toString(36).substr(2)}
                    k="avator" setPic={this.setPic}
                  />,
                )}
              </FormItem>
            </Col>
          </Form>
        </div>
        }
      </Row>
    );
  }
}

const UserEdit = Form.create()(UserEditForm);
export default UserEdit;

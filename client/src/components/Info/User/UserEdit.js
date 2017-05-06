import React, { Component } from 'react';
import { Form, Input, Cascader, Select, Button, Row, Col } from 'antd';
import Avatar from './Avatar';
import './UserEdit.css';

const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class UserEditForm extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>,
    );
    return (
      <Row className="gutter-vl-m">
        <Col span={18}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="昵称"
              hasFeedback
            >
              {getFieldDecorator('nickname', {
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
              {getFieldDecorator('nickname', {
                initialValue: user.desc,
                rules: [{ message: '请输入个人简介!', whitespace: true }],
              })(
                <Input type="textarea" rows={4} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator('phone', {
                rules: [{ message: '请输入你的手机号码!' }],
              })(
                <Input addonBefore={prefixSelector} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '请输入正确的邮箱格式!',
                }, {
                  message: '请输入你的邮箱!',
                }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback
            >
              {getFieldDecorator('password', {
                initialValue: user.psd,
                rules: [{
                  required: true, message: '请输入你的密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请再次输入密码!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地点"
            >
              {getFieldDecorator('residence', {
                initialValue: ['浙江', '杭州', '西湖'],
                rules: [{ message: 'Please select your habitual residence!' }],
              })(
                <Cascader options={residences} />,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" ghost size="large">取消</Button>
              <Button type="primary" htmlType="submit" size="large" className="gutter-hl-m">保存</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span={6}>
          <Avatar />
        </Col>
      </Row>
    );
  }
}

const UserEdit = Form.create()(UserEditForm);
export default UserEdit;

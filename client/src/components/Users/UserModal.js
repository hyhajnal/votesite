import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      const { _id } = this.props.record;
      if (!err && values) {
        if (!_id) {
          onOk(values);
        } else {
          onOk({ ...values, _id });
        }
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, tel, address } = this.props.record;
    const title = !name ? '新增' : '修改';
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{ required: true, message: '请填写姓名!' }],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电话"
            >
              {
                getFieldDecorator('tel', {
                  initialValue: tel,
                  rules: [{ pattern: /^1[34578]\d{9}$/, required: true, message: '请输入正确的电话号码!' }],
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="住址"
            >
              {
                getFieldDecorator('address', {
                  initialValue: address,
                  rules: [{ required: true, message: '请填写住址!' }],
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);

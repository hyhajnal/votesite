import React, { Component } from 'react';
import {
  Form, Select, Radio,
  Button, Icon, Input, DatePicker,
  InputNumber, Row } from 'antd';

import VoteItem from './VoteItem';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;


let uuid = 0;
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: -1,
    };
  }

  changeMulti = (e) => {
    this.setState({ multi: e.target.value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.warn('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    console.log(keys);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid += 1;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  swapItems = (arr, index1, index2) => {
    const item1 = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = item1;
    return arr;
  }

  toup = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: this.swapItems(keys, k - 1, k - 2),
    });
  }

  todown = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: this.swapItems(keys, k - 1, k),
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { topics } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const options = {
      keys,
      getFieldDecorator,
      normFile: this.normFile,
      remove: this.remove,
      toup: this.toup,
      todown: this.todown,
    };
    const formItems = keys.map((k, index) => {
      return (
        <VoteItem options={options} k={k} index={index} key={k} />
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1 className="align-center" style={{ marginBottom: '20px' }}>话题投票</h1>
        <FormItem
          {...formItemLayout}
          label="话题标题"
          hasFeedback
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '给个标题吧！' }],
          })(
            <Input placeholder="给个投票标题吧！" />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票描述"
          hasFeedback
        >
          {getFieldDecorator('desc')(
            <Input placeholder="几句话简单描述一下这个投票！" />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="话题标签"
        >
          {getFieldDecorator('tag', {
            rules: [
              { required: true, message: '请选择一个或多个话题' },
            ],
          })(
            <Select placeholder="投票属于下列哪个话题呢？">
              { topics.map((topic, i) =>
                <Option value={topic._id} key={i}>{ topic.name }</Option>,
              ) }
            </Select>,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票时间"
        >
          {getFieldDecorator('create_time', {
            rules: [{ type: 'array', required: true, message: '请选择投票时间!' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票类型"
        >
          {getFieldDecorator('mluti', {
            rules: [
              { required: true, message: '请选择!' },
            ],
          })(
            <RadioGroup onChange={this.changeMulti}>
              <RadioButton value={-1} >不限制结果数量</RadioButton>
              <RadioButton value={1} >限制结果数量</RadioButton>
            </RadioGroup>,
          )}
          {
            this.state.multi === -1 ? null :
            <InputNumber min={1} max={10} defaultValue={1} style={{ marginLeft: '10px' }} />
          }
        </FormItem>

        {formItems}
        <Row type="flex" justify="center">
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加选项
          </Button>
        </Row>

        <Row type="flex" justify="center" style={{ marginTop: '20px' }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Row>

      </Form>
    );
  }
}
const VoteForm = Form.create()(Vote);

export default VoteForm;

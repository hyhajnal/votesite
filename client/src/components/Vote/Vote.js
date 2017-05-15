import React, { Component } from 'react';
import {
  Form, Select, Radio,
  Button, Icon, Input, DatePicker,
  InputNumber, Row } from 'antd';

import VoteItem from './VoteItem';
import { createFormat, editFormat } from './voteRs';

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
      multi: this.props.form.getFieldValue('multi') ? this.props.form.getFieldValue('multi') : -1,
    };
  }

  changeMulti2 = (value) => {
    this.setState({ multi: value });
    const { form } = this.props;
    form.setFieldsValue({
      multi: value,
    });
  }

  changeMulti1 = (e) => {
    this.setState({ multi: e.target.value });
    const { form } = this.props;
    form.setFieldsValue({
      multi: e.target.value,
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.vote) {
          this.props.dispatch({
            type: 'vote/edit_vote',
            payload: { vote: createFormat(values, 1), id: this.props.vote._id },
          });
        } else {
          this.props.dispatch({ type: 'vote/create_vote', payload: { vote: createFormat(values) } });
        }
      }
    });
  }

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    console.log(keys);
    if (keys.length === 1) {
      return;
    }
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

  toup = (index) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: this.swapItems(keys, index, index - 1),
    });
  }

  todown = (index) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: this.swapItems(keys, index, index + 1),
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
        <VoteItem options={options} k={k} index={index} key={k} form={this.props.form} />
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
                <Option value={topic.name} key={i}>{ topic.name }</Option>,
              ) }
            </Select>,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票时间"
        >
          {getFieldDecorator('time', {
            rules: [{ type: 'array', required: true, message: '请选择投票时间!' }],
          })(
            <RangePicker showTime format="YYYY-MM-DD" />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票类型"
        >
          {getFieldDecorator('multi', {
            rules: [
              { required: true, message: '请选择!' },
            ],
          })(
            <RadioGroup onChange={this.changeMulti1}>
              <RadioButton value={-1} >不限制结果数量</RadioButton>
              <RadioButton value={1} >限制结果数量</RadioButton>
            </RadioGroup>,
          )}
          {
            this.state.multi === -1 ? null :
            <InputNumber
              min={1} max={10} defaultValue={1}
              style={{ marginLeft: '10px' }} onChange={this.changeMulti2}
            />
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
const VoteForm = Form.create({
  mapPropsToFields(props) {
    if (props.vote) return editFormat(props.vote);
  },
})(Vote);

export default VoteForm;

import React, { Component } from 'react';
import styles from './Vote.css';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Input, Tooltip, DatePicker,
  Row, Col
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;


let uuid = 0;
class Vote extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render(){
  	
  	const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    console.log(keys);
    const formItems = keys.map((k, index) => {
      return (

        <div key={index}>
        	<FormItem
	          {...formItemLayout}
	          label={
	          	<Button type="primary" ghost>选项{ index+1 }</Button>
	          }
	        >
	        	<Button type="danger" shape="circle" icon="close" 
	        		size="small" className="gutter-h-m"
	        		disabled={keys.length === 1}
	            onClick={() => this.remove(k)}
	          />
	          { index != 0 ? 
	          	(<Button type="primary" shape="circle" icon="arrow-up" ghost
	        	 		size="small" className="gutter-h-m"/>)
	        	 	: (null)
	          }
	        	{ keys.length === index + 1 ? 
	          	(null)
	        	 	: (<Button type="primary" shape="circle" icon="arrow-down" ghost
	        	 		size="small" className="gutter-h-m"/>)
	          }

        	</FormItem>

        	<FormItem
	      		{...formItemLayout}
	          label="选项标题"
	          hasFeedback
	      	>
	          {getFieldDecorator(`title${index}`, {
	            rules: [{ required: true, message: '请输入选项标题' }],
	          })(
	            <Input placeholder="请输入选项标题" />
	          )}
	        </FormItem>

	        <FormItem
	      		{...formItemLayout}
	          label="选项描述"
	          hasFeedback
	      	>
	          {getFieldDecorator(`desc${index}`)(
	            <Input type="textarea" rows={4} placeholder="在此可对该选项进行描述"/>
	          )}
	        </FormItem>

	        <FormItem
	          {...formItemLayout}
	          label="图片上传"
	        >
	          {getFieldDecorator('upload', {
	            valuePropName: 'fileList',
	            getValueFromEvent: this.normFile,
	          })(
	            <Upload name={`pic${index}`} action="/upload.do" listType="picture">
	              <Button>
	                <Icon type="upload" /> 点击上传
	              </Button>
	            </Upload>
	          )}
	        </FormItem>
        </div>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
      	<h1 className='align-center' style={{ marginBottom:'20px' }}>话题投票</h1>
      	<FormItem
      		{...formItemLayout}
          label="话题标题"
          hasFeedback
      	>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '给个标题吧！' }],
          })(
            <Input placeholder="给个投票标题吧！" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="话题标签"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: '请选择一个或多个话题', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="投票属于下列哪个话题呢？">
              <Option value="red">体育</Option>
              <Option value="green">文学</Option>
              <Option value="blue">健身</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票时间"
        >
          {getFieldDecorator('range-time-picker', {
          	rules: [{ type: 'array', required: true, message: '请选择投票时间!' }]
          })(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="投票类型"
        >
          {getFieldDecorator('radio-button', {
            rules: [
              { required: true, message: '请选择投票类型!' },
            ],
          })(
            <RadioGroup>
              <RadioButton value="a">单选</RadioButton>
              <RadioButton value="b">多选</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        {formItems}
	      <Row type="flex" justify="center">
	        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
	          <Icon type="plus" /> 添加选项
	        </Button>
	      </Row>

	      <Row type="flex" justify="center" style={{ marginTop:'20px' }}>
	        <Button type="primary" htmlType="submit">提交</Button>
	      </Row>

      </Form>
    );
  }
}
const VoteForm = Form.create()(Vote);

export default VoteForm;

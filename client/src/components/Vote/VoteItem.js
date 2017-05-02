import React from 'react';
import {
  Form, Button, Upload, Icon, Input } from 'antd';

const FormItem = Form.Item;

function VoteItem({ index, k, options }) {
  const { keys, remove, toup, todown, getFieldDecorator, normFile } = options;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div key={index}>
      <FormItem
        {...formItemLayout}
        label={
          <Button type="primary" ghost>选项{ index + 1 }</Button>
        }
      >
        <Button
          type="danger" shape="circle" icon="close"
          size="small" className="gutter-h-m" ghost
          disabled={keys.length === 1}
          onClick={() => remove(k)}
        />
        { index !== 0 ?
          (<Button
            type="primary" shape="circle" icon="arrow-up" ghost
            size="small" className="gutter-h-m"
            onClick={() => toup(k)}
          />)
          : (null)
        }
        { keys.length === index + 1 ? null :
          (<Button
            type="primary" shape="circle" icon="arrow-down" ghost
            size="small" className="gutter-h-m"
            onClick={() => todown(k)}
          />)
        }

      </FormItem>

      <FormItem
        {...formItemLayout}
        label="选项标题"
        hasFeedback
      >
        {getFieldDecorator(`title-${k}`, {
          rules: [{ required: true, message: '请输入选项标题' }],
        })(
          <Input placeholder="请输入选项标题" />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="选项描述"
        hasFeedback
      >
        {getFieldDecorator(`desc-${k}`)(
          <Input type="textarea" rows={4} placeholder="在此可对该选项进行描述" />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="图片上传"
      >
        {getFieldDecorator(`pic-${k}`, {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        })(
          <Upload action="/upload.do" listType="picture">
            <Button>
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>,
        )}
      </FormItem>
    </div>
  );
}

export default VoteItem;

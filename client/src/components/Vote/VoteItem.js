import React from 'react';
import {
  Form, Button, Input } from 'antd';
import Avatar from '../Info/User/Avatar';

const FormItem = Form.Item;

function VoteItem({ index, k, options, form }) {
  const { keys, remove, toup, todown, getFieldDecorator, normFile } = options;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  function setPic(key, value) {
    form.setFieldsValue({
      [key]: value,
    });
  }
  function getPic(key) {
    return form.getFieldValue(key);
  }
  const pic_uuid = Math.random().toString(36).substr(2);
  return (
    <div>
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
            onClick={() => toup(index)}
          />)
          : (null)
        }
        { keys.length === index + 1 ? null :
          (<Button
            type="primary" shape="circle" icon="arrow-down" ghost
            size="small" className="gutter-h-m"
            onClick={() => todown(index)}
          />)
        }

      </FormItem>

      <FormItem
        {...formItemLayout}
        label="选项标题"
        hasFeedback
        key={k}
      >
        {getFieldDecorator(`title${k}`, {
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
        {getFieldDecorator(`desc${k}`)(
          <Input type="textarea" rows={4} placeholder="在此可对该选项进行描述" />,
        )}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="图片上传"
      >
        {getFieldDecorator(`pic${k}`, {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        })(
          <Avatar
            k={`pic${k}`}
            setPic={setPic}
            savename={`${pic_uuid}pic${k}`}
            pic={getPic(`pic${k}`)}
          />,
        )}
      </FormItem>

      <FormItem style={{ display: 'none' }}>
        {getFieldDecorator(`item${k}`)(
          <Input />,
        )}
      </FormItem>
    </div>
  );
}

export default VoteItem;

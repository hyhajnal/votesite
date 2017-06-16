import React, { Component } from 'react';
import { Table, Popconfirm, Button } from 'antd';
import styles from './Users.css';
import UserModal from './UserModal';


// 参数为此components的state
class Users extends Component {

  deleteHandler = (dispatch, id) => {
    dispatch({
      type: 'user/sturemove',
      payload: id,
    });
  }

  createHandler = (dispatch, values) => {
    dispatch({
      type: 'user/stucreate',
      payload: values,
    });
  }

  editHandler = (dispatch, values) => {
    dispatch({
      type: 'user/stuedit',
      payload: values,
    });
  }

  render() {
    const { dispatch, list: dataSource, loading } = this.props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span className={styles.operation}>
            <Popconfirm title="确定删除?" onConfirm={() => this.deleteHandler(dispatch, record._id)}>
              <a href="">删除</a>
            </Popconfirm>
            <UserModal record={record} onOk={values => this.editHandler(dispatch, values)}>
              <a>修改</a>
            </UserModal>
          </span>
        ),
      },
    ];
    return (
      <div className={styles.normal}>
        <div>
          <div className={styles.create}>
            <UserModal record={{}} onOk={values => this.createHandler(dispatch, values)}>
              <Button type="primary">新增</Button>
            </UserModal>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey={record => record._id}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}
export default Users;

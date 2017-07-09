import React from 'react';
import { Upload, Icon, message } from 'antd';
import styles from './Avatar.less';
import { API } from '../../../constants';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    imageUrl: `${API}/${this.props.pic}`,
  };

  handleChange = (info) => {
    const { k, setPic } = this.props;
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({ imageUrl });
        if (k) {
          setPic(k, info.file.response.data);
        }
      });
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className={styles.uploader}
        name="avatar"
        showUploadList={false}
        action={`${API}/common/upload`}
        data={{ savename: this.props.savename }}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          !this.props.pic ?
            <Icon type="plus" className={styles.trigger} /> :
            <img src={imageUrl} alt="" className={styles.avatar} width="150" height="150" />
        }
      </Upload>
    );
  }
}

export default Avatar;

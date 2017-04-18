import path from 'path';

const config = {
  listn_port: 3000,

  // 数据库连接
  mongodb: {
    user: '',
    pass: '',
    host: '127.0.0.1',
    port: 27017,
    database: 'votesite'
  },
};

export default config;
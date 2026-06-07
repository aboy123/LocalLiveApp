const mongoose = require('mongoose');

let isConnected = false;

const dbConfig = {
  connect: async () => {
    // 如果已经连接，直接返回
    if (isConnected) {
      console.log('使用现有的MongoDB连接');
      return;
    }

    try {
      const mongoURI = process.env.MONGODB_URI;
      
      if (!mongoURI) {
        throw new Error('MONGODB_URI 环境变量未设置');
      }
      
      const conn = await mongoose.connect(mongoURI);
      
      isConnected = true;
      console.log(`MongoDB 连接成功: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error('MongoDB 连接失败:', error.message);
      throw error;
    }
  }
};

module.exports = dbConfig;

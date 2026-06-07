const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 获取token
      token = req.headers.authorization.split(' ')[1];

      // 验证token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

      // 获取用户信息（不包含密码）
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: '用户不存在' });
      }

      next();
    } catch (error) {
      console.error('Token验证错误:', error);
      return res.status(401).json({ message: '未授权，token无效或已过期' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: '未授权，没有token' });
  }
};

module.exports = { protect };

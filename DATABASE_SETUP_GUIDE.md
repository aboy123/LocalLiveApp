# 数据库集成完成指南

恭喜！你已经成功为HTML5应用添加了完整的后端数据库系统。

## 📋 已完成的工作

### 后端部分 ✅
1. ✅ 创建了Node.js + Express后端服务器
2. ✅ 集成了MongoDB数据库
3. ✅ 实现了用户认证系统（JWT）
4. ✅ 创建了用户和商家数据模型
5. ✅ 实现了RESTful API接口
6. ✅ 添加了密码加密（bcryptjs）
7. ✅ 创建了种子数据脚本

### 前端部分 ✅
1. ✅ 创建了API服务层
2. ✅ 更新了AuthContext使用后端API
3. ✅ 修改了Login页面使用真实API
4. ✅ 修改了Register页面使用真实API
5. ✅ 更新了LocalLife数据层使用后端API
6. ✅ 更新了相关页面支持异步操作

## 🚀 如何启动系统

### 第一步：安装并启动MongoDB

#### 选项A：使用本地MongoDB（推荐用于开发）

**Windows:**
1. 下载MongoDB Community Server: https://www.mongodb.com/try/download/community
2. 安装后，MongoDB会自动作为Windows服务运行
3. 验证MongoDB是否运行：
   ```bash
   net start MongoDB
   ```

**macOS (使用Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

#### 选项B：使用MongoDB Atlas（云端，免费）

1. 访问 https://www.mongodb.com/cloud/atlas/register
2. 创建免费账户
3. 创建一个新的Cluster（选择免费层级）
4. 配置数据库访问权限
5. 获取连接字符串，更新 `server/.env` 中的 `MONGODB_URI`

### 第二步：启动后端服务器

打开终端，进入server目录：

```bash
cd server
npm start
```

如果看到以下输出，说明服务器启动成功：
```
=================================
服务器运行在端口: 5000
环境: development
API地址: http://localhost:5000/api
=================================
MongoDB 连接成功: localhost
```

### 第三步：初始化数据库（可选）

在新终端中运行：

```bash
cd server
npm run seed
```

这会填充初始的商家数据到数据库中。

### 第四步：启动前端应用

在另一个终端中：

```bash
npm run dev
```

前端将在 http://localhost:5173 运行。

## 🧪 测试系统

### 1. 测试后端API健康检查

浏览器访问：http://localhost:5000/api/health

应该看到：
```json
{
  "success": true,
  "message": "服务器运行正常",
  "timestamp": "2024-..."
}
```

### 2. 测试用户注册

使用Postman或curl测试：

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "password": "123456"
  }'
```

### 3. 测试前端功能

1. 打开浏览器访问 http://localhost:5173
2. 点击"注册"创建新账户
3. 使用注册的账户登录
4. 浏览"本地生活"页面查看商家列表

## 📁 项目结构

```
html5-app/
├── server/                    # 后端服务器
│   ├── config/
│   │   └── db.js             # 数据库配置
│   ├── middleware/
│   │   └── auth.js           # JWT认证中间件
│   ├── models/
│   │   ├── User.js           # 用户模型
│   │   └── Merchant.js       # 商家模型
│   ├── routes/
│   │   ├── auth.js           # 认证路由
│   │   └── merchants.js      # 商家路由
│   ├── .env                  # 环境变量
│   ├── index.js              # 服务器入口
│   ├── seed.js               # 种子数据脚本
│   └── package.json
├── src/
│   ├── services/
│   │   └── api.js            # 前端API服务
│   ├── contexts/
│   │   └── AuthContext.jsx   # 认证上下文
│   ├── data/
│   │   └── localLifeData.js  # 商家数据层
│   └── pages/
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── LocalLife.jsx
│       └── MerchantDetail.jsx
└── .env                      # 前端环境变量
```

## 🔑 重要文件说明

### 后端关键文件

1. **server/index.js** - 服务器主入口
2. **server/models/User.js** - 用户数据模型（包含密码加密）
3. **server/models/Merchant.js** - 商家数据模型
4. **server/routes/auth.js** - 认证API（注册、登录）
5. **server/routes/merchants.js** - 商家管理API
6. **server/middleware/auth.js** - JWT验证中间件

### 前端关键文件

1. **src/services/api.js** - API调用封装
2. **src/contexts/AuthContext.jsx** - 全局认证状态管理
3. **src/data/localLifeData.js** - 商家数据访问层

## ⚙️ 配置说明

### 后端环境变量 (server/.env)

```env
PORT=5000                                    # 服务器端口
NODE_ENV=development                         # 运行环境
MONGODB_URI=mongodb://localhost:27017/html5app  # MongoDB连接字符串
JWT_SECRET=your-secret-key                   # JWT密钥（生产环境必须修改）
```

### 前端环境变量 (.env)

```env
VITE_API_URL=http://localhost:5000/api      # 后端API地址
```

## 🔐 安全建议

1. **生产环境必须修改JWT_SECRET**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **不要将.env文件提交到Git**
   - 已添加到.gitignore

3. **启用HTTPS**（生产环境）

4. **实施速率限制**防止暴力破解

5. **定期更新依赖包**
   ```bash
   npm audit fix
   ```

## 🐛 常见问题排查

### 问题1：MongoDB连接失败

**错误**: `MongoDB 连接失败: connect ECONNREFUSED`

**解决**:
- 确认MongoDB服务正在运行
- Windows: `net start MongoDB`
- macOS: `brew services list` 查看状态
- 检查 `MONGODB_URI` 配置

### 问题2：端口被占用

**错误**: `EADDRINUSE: address already in use :::5000`

**解决**:
- 修改 `server/.env` 中的 `PORT` 值
- 或关闭占用端口的程序

### 问题3：前端无法连接后端

**检查**:
- 确认后端服务器正在运行
- 检查 `.env` 中的 `VITE_API_URL` 是否正确
- 浏览器控制台查看网络请求错误

### 问题4：注册/登录失败

**检查**:
- 后端控制台查看错误信息
- 确认MongoDB连接正常
- 检查请求数据格式是否正确

## 📊 API接口文档

### 认证接口

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|----------|
| POST | /api/auth/register | 用户注册 | ❌ |
| POST | /api/auth/login | 用户登录 | ❌ |
| GET | /api/auth/me | 获取当前用户 | ✅ |
| PUT | /api/auth/profile | 更新用户资料 | ✅ |

### 商家接口

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | /api/merchants | 获取商家列表 | ❌ |
| GET | /api/merchants/:id | 获取商家详情 | ❌ |
| POST | /api/merchants | 创建商家 | ✅ |
| PUT | /api/merchants/:id | 更新商家 | ✅ |
| DELETE | /api/merchants/:id | 删除商家 | ✅ |
| GET | /api/merchants/search | 搜索商家 | ❌ |

## 🎯 下一步优化建议

1. **添加刷新Token机制** - 实现长期登录
2. **添加输入验证** - 使用Joi或express-validator
3. **实现日志系统** - 使用winston或morgan
4. **添加速率限制** - 使用express-rate-limit
5. **实现文件上传** - 用户头像、商家图片
6. **添加分页功能** - 优化大数据量查询
7. **实现缓存** - 使用Redis提高性能
8. **添加单元测试** - 使用Jest或Mocha
9. **API文档** - 使用Swagger生成文档
10. **错误监控** - 集成Sentry等监控工具

## 📚 学习资源

- [Express官方文档](https://expressjs.com/)
- [MongoDB文档](https://docs.mongodb.com/)
- [Mongoose文档](https://mongoosejs.com/)
- [JWT最佳实践](https://jwt.io/introduction)

## ✨ 总结

你现在拥有一个完整的全栈应用：
- ✅ React前端（Vite）
- ✅ Node.js后端（Express）
- ✅ MongoDB数据库
- ✅ JWT认证系统
- ✅ RESTful API
- ✅ 密码加密
- ✅ 前后端分离架构

这是一个生产级别的应用架构基础，可以根据需求继续扩展功能！

---

**祝你开发愉快！** 🎉

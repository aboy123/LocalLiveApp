# HTML5应用后端数据库 - 快速启动指南

## 🚀 快速开始（3步启动）

### 前提条件
确保已安装：
- Node.js (v14+)
- MongoDB

### 步骤1：启动MongoDB

**Windows用户：**
```powershell
net start MongoDB
```

**如果MongoDB未安装：**
1. 下载地址：https://www.mongodb.com/try/download/community
2. 安装后会自动作为服务运行

### 步骤2：启动后端服务器

打开终端1：
```bash
cd server
npm start
```

看到以下信息表示成功：
```
=================================
服务器运行在端口: 5000
环境: development
API地址: http://localhost:5000/api
=================================
MongoDB 连接成功: localhost
```

### 步骤3：启动前端应用

打开终端2：
```bash
npm run dev
```

前端将在 http://localhost:5173 运行

---

## 📦 首次使用需要做的

### 1. 初始化数据库数据（可选）

```bash
cd server
npm run seed
```

这会添加6个示例商家到数据库。

### 2. 测试系统

访问以下地址测试：
- 前端应用：http://localhost:5173
- API健康检查：http://localhost:5000/api/health

---

## 🔧 常用命令

### 后端命令
```bash
cd server

# 启动服务器（生产模式）
npm start

# 启动服务器（开发模式，自动重启）
npm run dev

# 初始化数据库
npm run seed
```

### 前端命令
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 📝 环境变量配置

### 后端 (server/.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/html5app
JWT_SECRET=your-secret-key-change-in-production
```

### 前端 (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 遇到问题？

### MongoDB连接失败
```bash
# Windows
net start MongoDB

# 检查MongoDB状态
mongod --version
```

### 端口被占用
修改 `server/.env` 中的 `PORT` 值

### 前端无法连接后端
1. 确认后端正在运行
2. 检查 `.env` 中的 `VITE_API_URL`
3. 查看浏览器控制台错误

---

## 📚 更多信息

详细文档请查看：
- [DATABASE_SETUP_GUIDE.md](./DATABASE_SETUP_GUIDE.md) - 完整设置指南
- [server/README.md](./server/README.md) - 后端详细说明

---

## ✨ 功能特性

✅ 用户注册/登录  
✅ JWT认证  
✅ 密码加密  
✅ 商家管理  
✅ RESTful API  
✅ MongoDB数据库  
✅ 前后端分离  

---

**开始使用吧！** 🎉

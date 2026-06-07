# MongoDB Atlas 配置指南

MongoDB Atlas 是 MongoDB 官方提供的云端数据库服务，提供免费层级（512MB存储空间）。

## 📋 注册和设置步骤

### 第1步：创建账户

1. 访问 https://www.mongodb.com/cloud/atlas/register
2. 使用邮箱、Google或GitHub账户注册
3. 选择免费套餐（M0 Sandbox）

### 第2步：创建集群

1. 登录后，点击 **"Build a Database"**
2. 选择 **M0 FREE** 套餐
3. 选择云服务提供商（推荐 AWS）
4. 选择离你最近的区域：
   - 中国用户推荐：**Asia Pacific (Tokyo)** 或 **Asia Pacific (Singapore)**
5. 点击 **"Create Cluster"**
6. 等待集群创建完成（约3-5分钟）

### 第3步：配置数据库访问权限

#### 3.1 创建数据库用户

1. 点击左侧菜单 **"Database Access"**
2. 点击 **"Add New Database User"**
3. 选择 **"Password"** 认证方式
4. 填写用户名和密码（**务必保存密码！**）
5. 在 "Database User Privileges" 中选择 **"Read and write to any database"**
6. 点击 **"Add User"**

#### 3.2 配置网络访问

1. 点击左侧菜单 **"Network Access"**
2. 点击 **"Add IP Address"**
3. 对于Vercel部署，选择：
   - ✅ **"Allow Access from Anywhere"** (0.0.0.0/0)
   - 或者添加Vercel的IP范围
4. 点击 **"Confirm"**

**注意：** 允许所有IP访问在生产环境是常见的做法，因为MongoDB有用户名密码保护。

### 第4步：获取连接字符串

1. 点击左侧菜单 **"Database"**
2. 找到你的集群，点击 **"Connect"**
3. 选择 **"Connect your application"**
4. 选择驱动：**Node.js**，版本：**5.5 or later**
5. 复制连接字符串，格式类似：
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. 将 `<password>` 替换为你在第3.1步设置的密码
7. 在末尾添加数据库名称：`/html5app`

最终格式：
```
mongodb+srv://username:your-password@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
```

### 第5步：配置到项目

#### 本地开发

编辑 `server/.env`：
```env
MONGODB_URI=mongodb+srv://username:your-password@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
```

#### Vercel部署

1. 登录 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加环境变量：
   - Key: `MONGODB_URI`
   - Value: 你的MongoDB连接字符串
5. 点击 **Save**

## 🔐 安全建议

1. **不要将连接字符串提交到Git**
   - `.env` 文件已在 `.gitignore` 中
   
2. **使用强密码**
   - 至少12个字符
   - 包含大小写字母、数字、特殊字符

3. **定期更换密码**
   - 每3-6个月更换一次

4. **监控数据库活动**
   - 在Atlas Dashboard查看连接数和活动

## 💰 免费层级限制

- **存储空间**: 512 MB
- **共享RAM**: 512 MB
- **共享vCPU**: 部分
- **备份**: 无（生产环境建议升级）
- **适合**: 个人项目、小型应用、测试

## 📊 监控使用情况

1. 登录 MongoDB Atlas
2. 进入 **Metrics** 标签
3. 查看：
   - 存储空间使用
   - 连接数
   - 操作次数

当接近限制时，考虑升级到付费计划（M10起 $57/月）。

## 🚀 初始化数据

连接到MongoDB Atlas后，运行种子脚本：

```bash
cd server
npm run seed
```

这会将示例商家数据导入到云端数据库。

## ❓ 常见问题

### Q1: 连接超时？

**解决方案：**
- 检查 Network Access 是否已配置
- 确认密码正确（注意特殊字符需要URL编码）
- 检查防火墙设置

### Q2: 认证失败？

**解决方案：**
- 确认用户名和密码正确
- 检查数据库用户是否有读写权限
- 确认连接字符串格式正确

### Q3: 如何重置密码？

1. 进入 **Database Access**
2. 找到用户，点击 **"Edit"**
3. 点击 **"Edit Password"**
4. 设置新密码并保存

### Q4: 如何删除集群？

1. 进入 **Database**
2. 点击集群右侧的 **"..."**
3. 选择 **"Terminate"**
4. 输入集群名称确认删除

**警告：** 删除后数据无法恢复！

## 📞 获取帮助

- MongoDB官方文档: https://docs.atlas.mongodb.com/
- 社区论坛: https://www.mongodb.com/community/forums/
- 支持工单: Atlas Dashboard → Support

---

配置完成后，你的应用就可以使用云端数据库了！🎉

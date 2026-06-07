# MongoDB Atlas 快速连接指南（5分钟完成）

## 🎯 目标
将你的应用从本地MongoDB切换到云端MongoDB Atlas（免费）

---

## ⚡ 快速3步

### 第1步：注册并创建集群（2分钟）

1. **访问**: https://www.mongodb.com/cloud/atlas/register
2. **注册**: 使用Google/GitHub快速登录
3. **创建集群**:
   - 点击 "Build a Database"
   - 选择 **M0 FREE**（免费）
   - 选择 **AWS** 云服务商
   - 选择区域：**Asia Pacific (Tokyo)** 或 **Singapore**（离中国近）
   - 点击 "Create Cluster"
   - 等待3-5分钟创建完成

---

### 第2步：配置访问权限（2分钟）

#### 2.1 创建数据库用户

1. 左侧菜单 → **Database Access**
2. 点击 **Add New Database User**
3. 设置：
   - Authentication: **Password**
   - Username: `admin`（或自定义）
   - Password: 生成一个强密码（**务必保存！**）
   - Database User Privileges: **Read and write to any database**
4. 点击 **Add User**

⚠️ **重要**: 复制保存用户名和密码！

#### 2.2 允许网络访问

1. 左侧菜单 → **Network Access**
2. 点击 **Add IP Address**
3. 点击 **Allow Access from Anywhere**（0.0.0.0/0）
4. 点击 **Confirm**

✅ 这样Vercel和本地都能访问

---

### 第3步：获取连接字符串（1分钟）

1. 左侧菜单 → **Database**
2. 找到你的集群，点击 **Connect**
3. 选择 **Connect your application**
4. 驱动选择：**Node.js**，版本：**5.5 or later**
5. 复制连接字符串，类似：
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **修改连接字符串**：
   - 将 `<password>` 替换为你的实际密码
   - 在末尾添加数据库名 `/html5app`
   
   最终格式：
   ```
   mongodb+srv://admin:你的密码@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
   ```

---

## 🔧 配置到项目

### 本地开发

编辑 `server/.env` 文件：

```env
# 注释掉或删除这一行
# MONGODB_URI=mongodb://localhost:27017/html5app

# 添加这一行（替换为你的连接字符串）
MONGODB_URI=mongodb+srv://admin:你的密码@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
```

### Vercel部署

1. 登录 https://vercel.com
2. 选择你的项目
3. Settings → Environment Variables
4. 添加：
   - Key: `MONGODB_URI`
   - Value: 你的完整连接字符串
5. 点击 Save
6. Redeploy 项目

---

## ✅ 测试连接

### 方法1：运行种子脚本

```bash
cd server
npm run seed
```

如果看到：
```
MongoDB 连接成功: cluster0.xxxxx.mongodb.net
已清空商家数据
成功插入 6 条商家数据
数据库种子数据完成！
```

✅ 连接成功！

### 方法2：启动服务器

```bash
cd server
npm start
```

看到：
```
MongoDB 连接成功: cluster0.xxxxx.mongodb.net
=================================
服务器运行在端口: 5000
=================================
```

✅ 连接成功！

### 方法3：访问API

浏览器打开：http://localhost:5000/api/health

应该返回：
```json
{
  "success": true,
  "message": "服务器运行正常"
}
```

然后访问：http://localhost:5000/api/merchants

应该返回商家列表数据。

---

## 🐛 常见问题解决

### 问题1：连接超时

**错误**: `MongoNetworkTimeoutError`

**解决**:
1. 检查 Network Access 是否设置为 0.0.0.0/0
2. 确认防火墙没有阻止出站连接
3. 尝试更换集群区域（选离你近的）

### 问题2：认证失败

**错误**: `Authentication failed`

**解决**:
1. 确认密码正确（区分大小写）
2. 如果密码包含特殊字符，需要URL编码：
   - `@` → `%40`
   - `:` → `%3A`
   - `/` → `%2F`
   - `#` → `%23`
3. 确认用户名正确

**URL编码工具**: https://www.urlencoder.org/

### 问题3：找不到数据库

**错误**: `database not found`

**解决**:
确认连接字符串末尾有 `/html5app`

### 问题4：IP被拒绝

**错误**: `IP address not allowed`

**解决**:
1. Database → Network Access
2. 确认有 0.0.0.0/0 的规则
3. 如果没有，点击 Add IP Address → Allow Access from Anywhere

---

## 💡 实用技巧

### 查看数据库内容

1. Database → Collections
2. 可以看到所有集合：
   - users（用户）
   - merchants（商家）
   - posts（帖子）

### 监控使用情况

1. Database → Metrics
2. 查看：
   - Operations（操作次数）
   - Connections（连接数）
   - Storage（存储空间）

免费层级限制：
- 存储：512 MB
- 足够小型应用使用

### 备份数据

免费层级不支持自动备份，建议：
1. 定期导出数据
2. 或使用付费层级（M10起）

---

## 🎉 完成检查清单

- [ ] MongoDB Atlas账户已注册
- [ ] M0免费集群已创建
- [ ] 数据库用户已创建（用户名和密码已保存）
- [ ] Network Access已配置（0.0.0.0/0）
- [ ] 连接字符串已获取并修改
- [ ] server/.env 已更新
- [ ] 运行 `npm run seed` 测试成功
- [ ] 服务器启动无错误
- [ ] API可以正常访问

---

## 📞 需要帮助？

1. **查看完整文档**: [MONGODB_ATLAS_GUIDE.md](./MONGODB_ATLAS_GUIDE.md)
2. **官方文档**: https://docs.atlas.mongodb.com/
3. **社区论坛**: https://www.mongodb.com/community/forums/

---

**现在你的应用已经连接到云端数据库了！** 🚀

数据会永久保存，即使重启电脑或部署到Vercel都不会丢失！

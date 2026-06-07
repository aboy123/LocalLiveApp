# MongoDB Atlas 连接 - 图文步骤指南

## 📸 完整操作流程

### 第1步：注册账户

```
访问: https://www.mongodb.com/cloud/atlas/register

选择登录方式:
□ Google账号（推荐，最快）
□ GitHub账号
□ 邮箱注册
```

---

### 第2步：创建免费集群

```
登录后看到欢迎页面 → 点击 "Build a Database"

选择套餐:
┌─────────────────────┐
│  ☑️ M0 FREE         │ ← 选择这个（免费）
│     512MB 存储      │
│     共享资源        │
└─────────────────────┘

云服务商: AWS (默认)

选择区域:
┌──────────────────────────┐
│ Asia Pacific (Tokyo)     │ ← 中国用户推荐
│ Asia Pacific (Singapore) │ ← 或者这个
│ US East (Virginia)       │
└──────────────────────────┘

点击 "Create Cluster"
等待 3-5 分钟... ⏳
```

---

### 第3步：创建数据库用户

```
左侧菜单 → Database Access → Add New Database User

┌────────────────────────────────────┐
│ Authentication Method              │
│   ☑️ Password                      │
│                                    │
│ Username                           │
│   [ admin        ]                 │ ← 输入用户名
│                                    │
│ Password                           │
│   [••••••••••••] 自动生成/手动输入  │ ← 务必保存！
│                                    │
│ Database User Privileges           │
│   ☑️ Read and write to any database│
└────────────────────────────────────┘

点击 "Add User" ✅
```

⚠️ **重要**: 复制保存用户名和密码到安全的地方！

---

### 第4步：配置网络访问

```
左侧菜单 → Network Access → Add IP Address

┌────────────────────────────────────┐
│                                    │
│   ☑️ Allow Access from Anywhere    │ ← 选择这个
│      0.0.0.0/0                     │
│                                    │
│   或者添加特定IP地址                │
└────────────────────────────────────┘

点击 "Confirm" ✅
```

这样Vercel和本地都能访问数据库。

---

### 第5步：获取连接字符串

```
左侧菜单 → Database → 找到你的集群 → Connect

选择: Connect your application

┌────────────────────────────────────┐
│ Driver: Node.js                    │
│ Version: 5.5 or later              │
│                                    │
│ Connection String:                 │
│ ┌──────────────────────────────┐  │
│ │mongodb+srv://admin:<password>│  │
│ │@cluster0.xxxxx.mongodb.net/  │  │
│ │?retryWrites=true&w=majority  │  │
│ └──────────────────────────────┘  │
│                                    │
│ [Copy] ← 点击复制按钮              │
└────────────────────────────────────┘
```

---

### 第6步：修改连接字符串

**原始字符串:**
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**修改步骤:**

1. 将 `<password>` 替换为你的实际密码
2. 在 `.net/` 后面添加数据库名 `html5app`

**最终字符串:**
```
mongodb+srv://admin:你的实际密码@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
```

📝 **示例:**
```
如果密码是: MyPass123!
连接字符串就是:
mongodb+srv://admin:MyPass123!@cluster0.abc123.mongodb.net/html5app?retryWrites=true&w=majority
```

⚠️ **如果密码包含特殊字符，需要URL编码:**
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `#` → `%23`
- `!` → `%21`

使用在线工具: https://www.urlencoder.org/

---

### 第7步：配置到项目

#### 方法A：本地开发

编辑文件: `server/.env`

```env
# 注释掉或删除本地MongoDB配置
# MONGODB_URI=mongodb://localhost:27017/html5app

# 添加MongoDB Atlas配置
MONGODB_URI=mongodb+srv://admin:你的密码@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
```

#### 方法B：Vercel部署

```
1. 登录 https://vercel.com
2. 选择你的项目
3. Settings → Environment Variables
4. 点击 "Add New"

┌─────────────────────────────────┐
│ Key:                            │
│ [ MONGODB_URI          ]        │
│                                 │
│ Value:                          │
│ [ mongodb+srv://...    ]        │ ← 粘贴完整连接字符串
│                                 │
│ Environment:                    │
│   ☑️ Production                 │
│   ☑️ Preview                    │
│   ☑️ Development                │
└─────────────────────────────────┘

5. 点击 Save
6. 重新部署项目
```

---

### 第8步：测试连接

#### 快速测试

```bash
cd server
npm run test-connection
```

**成功输出:**
```
🔍 开始测试 MongoDB Atlas 连接...

📋 连接字符串: mongodb+srv://admin:****@cluster0.xxxxx.mongodb.net/...

⏳ 正在连接...
✅ MongoDB 连接成功!
📍 主机: cluster0.xxxxx.mongodb.net
📊 数据库: html5app

📁 现有集合:
   (空数据库，可以运行 npm run seed 初始化数据)

🧪 测试读写操作...
✅ 写入测试成功
✅ 读取测试成功
✅ 清理测试数据成功

🎉 所有测试通过！MongoDB Atlas 连接正常！
```

#### 初始化数据

```bash
npm run seed
```

**成功输出:**
```
MongoDB 连接成功: cluster0.xxxxx.mongodb.net
已清空商家数据
成功插入 6 条商家数据
数据库种子数据完成！
```

#### 启动服务器

```bash
npm start
```

**成功输出:**
```
=================================
服务器运行在端口: 5000
环境: production
API地址: http://localhost:5000/api
=================================
MongoDB 连接成功: cluster0.xxxxx.mongodb.net
```

---

## ✅ 验证清单

完成以下检查确认连接成功：

- [ ] MongoDB Atlas账户已创建
- [ ] M0免费集群状态为绿色（正常运行）
- [ ] 数据库用户已创建（有用户名和密码）
- [ ] Network Access包含 0.0.0.0/0
- [ ] 连接字符串已正确修改（包含密码和数据库名）
- [ ] server/.env 文件已更新
- [ ] 运行 `npm run test-connection` 成功
- [ ] 运行 `npm run seed` 成功
- [ ] 服务器启动无错误
- [ ] 浏览器访问 http://localhost:5000/api/health 返回成功
- [ ] 浏览器访问 http://localhost:5000/api/merchants 返回数据

---

## 🎯 下一步

连接成功后：

1. **启动前端应用**
   ```bash
   cd ..
   npm run dev
   ```

2. **访问应用**
   - 打开 http://localhost:5173
   - 注册新用户
   - 浏览商家列表
   - 发布论坛帖子

3. **查看数据库内容**
   - 回到 MongoDB Atlas Dashboard
   - Database → Collections
   - 可以看到 users, merchants, posts 等集合

---

## 💡 小贴士

### 查看使用情况
Database → Metrics → 查看存储、连接数、操作次数

### 备份数据
免费层级不支持自动备份，建议定期导出数据

### 升级方案
当接近512MB限制时，考虑升级到M10（$57/月）

### 安全提醒
- 不要分享连接字符串
- 不要在代码中硬编码密码
- 定期更换数据库密码

---

**恭喜！你现在拥有云端数据库了！** 🎉

数据会永久保存，随时随地可访问！

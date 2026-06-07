# Vercel 部署 - 图文流程指南

## 📸 完整操作流程（带截图说明）

---

## 第1步：准备 GitHub

### 1.1 提交代码

```bash
git add .
git commit -m "准备部署"
git push origin main
```

### 1.2 在 GitHub 确认

访问: https://github.com/你的用户名/仓库名

✅ 看到所有代码文件

---

## 第2步：注册 Vercel

### 2.1 访问官网

打开: https://vercel.com

看到首页：
```
┌─────────────────────────────────┐
│                                 │
│   Develop. Preview. Ship.       │
│                                 │
│   [Sign Up]  [Log In]           │
│                                 │
└─────────────────────────────────┘
```

点击 **Sign Up**

### 2.2 选择登录方式

```
┌─────────────────────────────────┐
│ Sign up for Vercel              │
│                                 │
│  [🔵 Continue with GitHub]      │ ← 推荐
│  [⚫ Continue with GitLab]      │
│  [🔴 Continue with Google]     │
│                                 │
└─────────────────────────────────┘
```

点击 **Continue with GitHub**

授权后自动登录！

---

## 第3步：创建项目

### 3.1 Dashboard

登录后看到：
```
┌─────────────────────────────────┐
│ Welcome to Vercel               │
│                                 │
│  [Add New... ▼]                 │ ← 点击这里
│                                 │
│  Recent Projects                │
│  (空)                           │
└─────────────────────────────────┘
```

点击 **Add New...** → **Project**

### 3.2 导入仓库

```
┌─────────────────────────────────┐
│ Import Git Repository           │
│                                 │
│  Search repositories...         │
│  ┌───────────────────────────┐  │
│  │ ✓ html5-app               │  │ ← 找到你的仓库
│  │   your-username/html5-app │  │
│  └───────────────────────────┘  │
│                                 │
│  [Import]                       │ ← 点击
└─────────────────────────────────┘
```

点击 **Import**

### 3.3 配置项目

```
┌──────────────────────────────────────┐
│ Configure Project                    │
│                                      │
│  Project Name                        │
│  ┌────────────────────────────────┐  │
│  │ html5-app                      │  │ ← 可自定义
│  └────────────────────────────────┘  │
│                                      │
│  Framework Preset                    │
│  ┌────────────────────────────────┐  │
│  │ Vite                   [▼]     │  │ ← 自动检测
│  └────────────────────────────────┘  │
│                                      │
│  Root Directory                      │
│  ┌────────────────────────────────┐  │
│  │ ./                             │  │ ← 默认
│  └────────────────────────────────┘  │
│                                      │
│  Build Command                       │
│  ┌────────────────────────────────┐  │
│  │ npm run build                  │  │ ← 默认
│  └────────────────────────────────┘  │
│                                      │
│  Output Directory                    │
│  ┌────────────────────────────────┐  │
│  │ dist                           │  │ ← 默认
│  └────────────────────────────────┘  │
│                                      │
│  [◀ Back]        [Next ▶]            │
└──────────────────────────────────────┘
```

点击 **Next**

---

## 第4步：配置环境变量 ⭐

### 4.1 进入环境变量页面

点击 **"Environment Variables"** 标签

看到：
```
┌──────────────────────────────────────┐
│ Environment Variables                │
│                                      │
│  No environment variables found.     │
│                                      │
│  [Add New]                           │ ← 点击这里
└──────────────────────────────────────┘
```

### 4.2 添加 MONGODB_URI

点击 **Add New**

```
┌──────────────────────────────────────┐
│ Add Environment Variable             │
│                                      │
│  Key                                 │
│  ┌────────────────────────────────┐  │
│  │ MONGODB_URI                    │  │
│  └────────────────────────────────┘  │
│                                      │
│  Value                               │
│  ┌────────────────────────────────┐  │
│  │ mongodb+srv://admin:...        │  │ ← 粘贴连接字符串
│  └────────────────────────────────┘  │
│                                      │
│  Environment                         │
│  ☑️ Production                       │
│  ☑️ Preview                          │
│  ☑️ Development                      │
│                                      │
│  [Cancel]        [Save]              │
└──────────────────────────────────────┘
```

点击 **Save**

### 4.3 添加 JWT_SECRET

先在本机生成密钥：

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

复制输出的长字符串，然后：

点击 **Add New**

```
Key: JWT_SECRET
Value: （粘贴刚才生成的长字符串）
Environment: 全选
```

点击 **Save**

### 4.4 添加 NODE_ENV

点击 **Add New**

```
Key: NODE_ENV
Value: production
Environment: 全选
```

点击 **Save**

### 4.5 确认所有变量

应该看到：
```
┌──────────────────────────────────────┐
│ Environment Variables                │
│                                      │
│  ✅ MONGODB_URI          [Edit] [...]│
│  ✅ JWT_SECRET           [Edit] [...]│
│  ✅ NODE_ENV             [Edit] [...]│
│                                      │
│  [Add New]                           │
└──────────────────────────────────────┘
```

点击 **Deploy**

---

## 第5步：等待部署

### 5.1 部署进度

看到：
```
┌──────────────────────────────────────┐
│ Deploying...                         │
│                                      │
│  ⏳ Building                         │
│  ├─ ✅ Installing dependencies      │
│  ├─ ⏳ Running build command        │
│  └─ ○ Optimizing                     │
│                                      │
│  Estimated time: 1-2 minutes         │
└──────────────────────────────────────┘
```

等待完成...

### 5.2 部署成功

看到：
```
┌──────────────────────────────────────┐
│ 🎉 Congratulations!                  │
│                                      │
│  Your project has been deployed.     │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ https://html5-app.vercel.app   │  │ ← 复制这个URL
│  └────────────────────────────────┘  │
│                                      │
│  [Visit]  [Dashboard]                │
└──────────────────────────────────────┘
```

**复制 URL！**

---

## 第6步：更新 API 地址

### 6.1 回到设置

1. 点击 **Dashboard**
2. 选择你的项目
3. Settings → Environment Variables

### 6.2 添加 VITE_API_URL

点击 **Add New**

```
Key: VITE_API_URL
Value: https://html5-app.vercel.app/api
                                    ^^^^
                                必须有 /api
Environment: 全选
```

点击 **Save**

### 6.3 重新部署

1. 进入 **Deployments** 标签
2. 找到最新部署
3. 点击右侧 **...**
4. 选择 **Redeploy**
5. 确认

等待1-2分钟...

---

## 第7步：验证部署

### 7.1 访问应用

浏览器打开：`https://html5-app.vercel.app`

应该看到你的应用首页！

### 7.2 测试 API

访问：`https://html5-app.vercel.app/api/health`

应该看到：
```json
{
  "success": true,
  "message": "服务器运行正常",
  "timestamp": "2024-..."
}
```

### 7.3 测试功能

- 注册账户 ✅
- 登录 ✅
- 浏览商家 ✅
- 查看帖子 ✅

---

## 🎯 快速参考

### 环境变量清单

| Key | Value | 来源 |
|-----|-------|------|
| MONGODB_URI | mongodb+srv://... | MongoDB Atlas |
| JWT_SECRET | 随机字符串 | node 命令生成 |
| NODE_ENV | production | 固定值 |
| VITE_API_URL | https://xxx.vercel.app/api | 部署后更新 |

### 常用命令

```bash
# 生成 JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 推送代码（触发自动部署）
git push origin main

# 本地测试构建
npm run build
```

### 重要链接

- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- 项目 URL: https://你的项目.vercel.app

---

## 💡 小贴士

### 自动部署

每次 git push 都会自动部署：
```bash
git add .
git commit -m "更新功能"
git push
# Vercel 自动部署新版本
```

### 查看日志

Dashboard → Deployments → 点击部署 → Logs

### 性能监控

Dashboard → Analytics → 查看访问数据

---

**恭喜！你的应用已经上线！** 🎉

分享 URL 给朋友吧！

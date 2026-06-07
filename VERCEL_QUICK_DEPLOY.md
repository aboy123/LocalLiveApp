# Vercel 部署快速指南（10分钟上线）

## 🎯 目标
将你的 React + Node.js + MongoDB 应用部署到 Vercel（完全免费）

---

## ⚡ 快速5步

### 第1步：准备 GitHub 仓库（2分钟）

#### 1.1 确保代码已提交

```bash
# 检查 Git 状态
git status

# 添加所有文件
git add .

# 提交
git commit -m "准备部署到Vercel"
```

⚠️ **重要**: 确认 `.env` 文件没有被提交（应该在 `.gitignore` 中）

#### 1.2 推送到 GitHub

```bash
# 如果还没有远程仓库，先在 GitHub 创建
# 然后执行：
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

✅ 在 GitHub 上确认代码已上传

---

### 第2步：注册 Vercel 账户（1分钟）

1. **访问**: https://vercel.com
2. **登录**: 点击 "Sign Up"
3. **选择**: Continue with GitHub（推荐）
4. **授权**: 允许 Vercel 访问你的 GitHub

✅ 自动登录成功！

---

### 第3步：创建 Vercel 项目（3分钟）

#### 3.1 导入项目

1. 登录后看到 Dashboard
2. 点击 **"Add New Project"**
3. 选择 **"Import Git Repository"**
4. 找到你的仓库，点击 **"Import"**

#### 3.2 配置项目

```
┌─────────────────────────────────────┐
│ Configure Project                   │
│                                     │
│ Project Name                        │
│ [ html5-app               ]         │ ← 自定义名称
│                                     │
│ Framework Preset                    │
│ [ Vite                    ▼ ]       │ ← 自动检测到
│                                     │
│ Root Directory                      │
│ [ ./                      ]         │ ← 默认
│                                     │
│ Build Command                       │
│ [ npm run build           ]         │ ← 默认
│                                     │
│ Output Directory                    │
│ [ dist                    ]         │ ← 默认
│                                     │
│ Install Command                     │
│ [ npm install             ]         │ ← 默认
└─────────────────────────────────────┘
```

点击 **"Next"**

#### 3.3 配置环境变量 ⭐ 最重要

点击 **"Environment Variables"**

需要添加以下变量：

| Key | Value | 说明 |
|-----|-------|------|
| `MONGODB_URI` | `mongodb+srv://...` | MongoDB Atlas 连接字符串 |
| `JWT_SECRET` | 运行命令生成 | JWT 密钥 |
| `NODE_ENV` | `production` | 运行环境 |
| `VITE_API_URL` | 先留空 | API 地址（部署后更新） |

**生成 JWT_SECRET：**

在终端运行：
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

会输出一长串随机字符，复制它作为 JWT_SECRET 的值。

**添加步骤：**

1. 点击 "Add New"
2. 填写 Key 和 Value
3. 勾选所有环境（Production, Preview, Development）
4. 点击 "Save"
5. 重复添加所有变量

完成后应该看到：
```
✅ MONGODB_URI
✅ JWT_SECRET  
✅ NODE_ENV
```

点击 **"Deploy"**

---

### 第4步：等待部署完成（2分钟）

部署过程：
```
⏳ Building...
⏳ Installing dependencies...
⏳ Running build command...
⏳ Optimizing...
✅ Ready!
```

部署成功后会显示：
```
🎉 Congratulations!
Your project has been deployed.

https://html5-app.vercel.app
```

**复制这个 URL！**

---

### 第5步：更新 API 地址并重新部署（2分钟）

#### 5.1 更新 VITE_API_URL

1. 回到项目设置
2. Settings → Environment Variables
3. 添加或更新：
   - Key: `VITE_API_URL`
   - Value: `https://你的项目名.vercel.app/api`
   
   例如：
   ```
   VITE_API_URL=https://html5-app.vercel.app/api
   ```

4. 点击 Save

#### 5.2 重新部署

1. 进入 Deployments 标签
2. 找到最新的部署
3. 点击右侧的 "..."
4. 选择 "Redeploy"
5. 确认重新部署

等待1-2分钟，部署完成！

---

## ✅ 验证部署成功

### 1. 访问应用

浏览器打开：`https://你的项目名.vercel.app`

应该看到你的应用首页。

### 2. 测试 API

访问：`https://你的项目名.vercel.app/api/health`

应该返回：
```json
{
  "success": true,
  "message": "服务器运行正常",
  "timestamp": "2024-..."
}
```

### 3. 测试功能

- ✅ 注册新用户
- ✅ 登录
- ✅ 浏览商家列表
- ✅ 查看帖子
- ✅ 发布新帖（需要先登录）

### 4. 检查控制台

按 F12 打开开发者工具：
- Console 标签：无错误
- Network 标签：API 请求成功（状态码 200）

---

## 🐛 常见问题解决

### 问题1：构建失败

**错误**: `Build Failed`

**查看日志**:
1. Deployments → 点击失败的部署
2. 查看 "Build Logs"

**常见原因**:
- 依赖缺失：检查 package.json
- 环境变量缺失：确认所有变量已设置
- 代码错误：本地先运行 `npm run build` 测试

**解决**:
```bash
# 本地测试构建
npm run build

# 如果有错误，修复后重新推送
git add .
git commit -m "修复构建错误"
git push
```

### 问题2：数据库连接失败

**错误**: `MongoDB 连接失败`

**检查**:
1. MONGODB_URI 是否正确
2. MongoDB Atlas Network Access 是否为 0.0.0.0/0
3. 密码是否正确

**解决**:
- 回到 MongoDB Atlas 确认连接字符串
- 检查 Network Access 设置
- 在 Vercel 中重新设置 MONGODB_URI

### 问题3：API 返回 404

**原因**: 路由配置问题

**检查**:
- vercel.json 中的路由规则
- API 路径是否以 `/api/` 开头

**解决**:
确认 vercel.json 包含：
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    }
  ]
}
```

### 问题4：前端无法连接后端

**错误**: CORS 错误或网络错误

**检查**:
- VITE_API_URL 是否正确
- 是否包含 `/api` 后缀

**解决**:
```
VITE_API_URL=https://你的项目.vercel.app/api
                                                  ^^^^
                                              必须有这个
```

### 问题5：JWT 认证失败

**错误**: `未授权，token无效`

**检查**:
- JWT_SECRET 是否设置
- 前后端是否使用相同的密钥

**解决**:
1. 重新生成 JWT_SECRET
2. 在 Vercel 中更新
3. Redeploy

---

## 🔧 高级配置

### 自定义域名

1. Settings → Domains
2. 输入你的域名
3. 按照提示配置 DNS
4. 等待 DNS 传播（最多48小时）

### 查看实时日志

1. Functions 标签
2. 点击任意函数
3. 查看实时日志

### 性能优化

1. **启用 Edge Functions**（高级）
   - 更快的响应速度
   - 减少冷启动时间

2. **添加缓存头**
   - 在 vercel.json 中配置
   - 静态资源缓存

---

## 💰 费用说明

**Vercel 免费层级：**
- ✅ 无限个人项目
- ✅ 100GB 带宽/月
- ✅ 1000小时函数运行时间/月
- ✅ 自动 HTTPS
- ✅ 全球 CDN

**对于个人项目，基本不会超出限制！**

---

## 📊 监控和维护

### 查看使用情况

1. Dashboard → 选择项目
2. 查看 Analytics
3. 监控：
   - 访问量
   - 带宽使用
   - 函数调用次数

### 持续部署

Vercel 会自动部署：

```bash
# 每次推送到 main 分支
git push origin main

# Vercel 自动检测并部署
```

### 预览部署

创建 Pull Request 时：
- 自动生成预览链接
- 方便测试和审查

---

## 🎯 部署检查清单

部署前确认：

- [ ] 代码已推送到 GitHub
- [ ] .env 文件未提交
- [ ] MongoDB Atlas 已配置
- [ ] MONGODB_URI 已获取
- [ ] JWT_SECRET 已生成
- [ ] Vercel 账户已注册
- [ ] 项目已导入
- [ ] 所有环境变量已设置
- [ ] 首次部署成功
- [ ] VITE_API_URL 已更新
- [ ] 已重新部署
- [ ] 应用可以正常访问
- [ ] API 健康检查通过
- [ ] 所有功能测试通过

---

## 📞 需要帮助？

1. **查看完整文档**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. **Vercel 官方文档**: https://vercel.com/docs
3. **社区支持**: https://github.com/vercel/vercel/discussions

---

## 🎉 恭喜！

你的应用现在已经在线上了！

**分享你的应用 URL 给朋友吧！** 🚀

---

*提示：每次修改代码后，只需 git push，Vercel 会自动部署新版本！*

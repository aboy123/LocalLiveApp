# 🚀 Vercel 部署完整指南

本指南将帮助你把应用部署到 Vercel，使用 MongoDB Atlas 作为数据库。

## 📋 前置准备

### 1. GitHub账户
- 如果没有，注册: https://github.com

### 2. Vercel账户
- 使用GitHub账户登录: https://vercel.com
- 完全免费用于个人项目

### 3. MongoDB Atlas账户
- 注册: https://www.mongodb.com/cloud/atlas/register
- 选择免费层级（M0）
- 详细配置见 [MONGODB_ATLAS_GUIDE.md](./MONGODB_ATLAS_GUIDE.md)

---

## 🎯 部署步骤（5步完成）

### 第1步：准备代码

#### 1.1 确保代码已提交到Git

```bash
# 初始化Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "准备部署到Vercel"
```

#### 1.2 推送到GitHub

```bash
# 在GitHub创建新仓库
# 然后执行：
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

**重要：** 确保 `.env` 文件没有被提交（已在 `.gitignore` 中）

---

### 第2步：配置MongoDB Atlas

参考 [MONGODB_ATLAS_GUIDE.md](./MONGODB_ATLAS_GUIDE.md) 完成：

1. ✅ 创建MongoDB Atlas账户
2. ✅ 创建免费集群（M0）
3. ✅ 创建数据库用户
4. ✅ 配置网络访问（允许所有IP）
5. ✅ 获取连接字符串

保存好你的连接字符串，格式类似：
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/html5app?retryWrites=true&w=majority
```

---

### 第3步：在Vercel上创建项目

#### 方法A：通过Vercel Dashboard（推荐）

1. **登录Vercel**
   - 访问 https://vercel.com
   - 点击 "Sign Up" 使用GitHub登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择你刚才推送的GitHub仓库
   - 点击 "Import"

3. **配置项目**
   - **Project Name**: 自定义项目名称
   - **Framework Preset**: Vite（会自动检测）
   - **Root Directory**: `./` （默认）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **配置环境变量** ⭐ 重要
   
   点击 "Environment Variables"，添加以下变量：

   | Key | Value | 
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://username:password@...` |
   | `JWT_SECRET` | 运行命令生成：`node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
   | `NODE_ENV` | `production` |
   | `VITE_API_URL` | 先留空，部署后更新 |

   **生成JWT_SECRET的方法：**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   复制输出的长字符串作为JWT_SECRET的值

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成（约1-2分钟）

6. **获取域名**
   - 部署成功后，你会得到一个域名，如：`https://your-app.vercel.app`
   - 复制这个域名

7. **更新前端API地址**
   - 回到项目设置 → Environment Variables
   - 添加或更新：`VITE_API_URL = https://your-app.vercel.app/api`
   - 点击 "Save"
   
8. **重新部署**
   - 进入 "Deployments" 标签
   - 点击最新的部署
   - 点击 "Redeploy"

#### 方法B：通过Vercel CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 按提示操作
# - Set up and deploy? Y
# - Which scope? 选择你的账户
# - Link to existing project? N
# - Project name? 输入名称
# - Directory? ./
# - Override settings? N

# 设置环境变量
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add NODE_ENV production

# 生产部署
vercel --prod
```

---

### 第4步：初始化数据库数据

部署完成后，需要初始化商家数据。

#### 方法A：通过Vercel运行脚本

```bash
# 在本地执行（会连接到云端数据库）
cd server

# 临时设置环境变量
$env:MONGODB_URI="你的MongoDB连接字符串"  # PowerShell
# 或
export MONGODB_URI="你的MongoDB连接字符串"  # Mac/Linux

# 运行种子脚本
npm run seed
```

#### 方法B：手动添加数据

你也可以通过应用的界面添加商家数据。

---

### 第5步：测试部署

1. **访问你的应用**
   ```
   https://your-app.vercel.app
   ```

2. **测试功能**
   - ✅ 注册新用户
   - ✅ 登录
   - ✅ 浏览商家列表
   - ✅ 查看商家详情

3. **检查API健康**
   ```
   https://your-app.vercel.app/api/health
   ```
   应该返回：
   ```json
   {
     "success": true,
     "message": "服务器运行正常",
     "timestamp": "..."
   }
   ```

---

## 🔧 常见问题排查

### 问题1：构建失败

**错误信息**: `Build Failed`

**解决方案：**
1. 查看构建日志，找到具体错误
2. 常见原因：
   - 依赖缺失：确保 `package.json` 包含所有依赖
   - 环境变量缺失：检查是否设置了所有必需的环境变量
   - 代码错误：本地先运行 `npm run build` 测试

### 问题2：数据库连接失败

**错误信息**: `MongoDB 连接失败`

**解决方案：**
1. 检查 `MONGODB_URI` 环境变量是否正确
2. 确认MongoDB Atlas的网络访问已配置（允许所有IP）
3. 确认数据库用户名和密码正确
4. 查看Vercel函数日志：Dashboard → Functions → 查看日志

### 问题3：API返回404

**解决方案：**
1. 检查 `vercel.json` 中的路由配置
2. 确认API路径以 `/api/` 开头
3. 查看Vercel部署日志

### 问题4：前端无法连接后端

**解决方案：**
1. 检查浏览器控制台的错误信息
2. 确认 `VITE_API_URL` 环境变量设置正确
3. 确认URL格式：`https://your-app.vercel.app/api`
4. 清除浏览器缓存后重试

### 问题5：JWT认证失败

**解决方案：**
1. 确认 `JWT_SECRET` 环境变量已设置
2. 确认前后端使用相同的JWT_SECRET
3. 检查token是否正确传递

---

## 🌐 自定义域名（可选）

### 设置自定义域名

1. 进入Vercel项目 → Settings → Domains
2. 输入你的域名，如：`www.yourdomain.com`
3. 按照提示配置DNS记录
4. 等待DNS传播（最多48小时）

### 免费域名选项

- **Freenom**: https://freenom.com（免费注册.tk, .ml等域名）
- **Eu.org**: https://nic.eu.org（免费注册.eu.org子域名）

---

## 📊 监控和维护

### 查看日志

1. **部署日志**
   - Vercel Dashboard → Deployments → 点击部署 → Logs

2. **函数日志**
   - Vercel Dashboard → Functions → 查看实时日志

3. **浏览器控制台**
   - F12打开开发者工具
   - 查看Console和Network标签

### 性能优化

1. **启用Edge Functions**（高级）
   - 减少冷启动时间
   - 更快的响应速度

2. **添加缓存**
   - 使用Redis或其他缓存服务
   - 缓存常用查询结果

3. **图片优化**
   - 使用CDN托管图片
   - 压缩图片大小

---

## 💰 成本说明

### Vercel 免费层级

✅ **完全免费**，包括：
- 无限个人项目
- 自动HTTPS
- 全球CDN
- 100GB带宽/月
- 1000小时Serverless函数运行时间/月

对于个人项目，基本不会超出限制。

### MongoDB Atlas 免费层级

✅ **完全免费**，包括：
- 512MB存储空间
- 共享RAM和CPU
- 适合小型应用

---

## 🔄 持续部署

Vercel会自动部署：

1. **推送到main分支**
   ```bash
   git push origin main
   ```
   Vercel会自动检测并部署

2. **Pull Request预览**
   - 创建PR时自动生成预览链接
   - 方便测试和审查

3. **手动触发**
   - Vercel Dashboard → Deployments → Redeploy

---

## 🎉 部署完成！

恭喜！你的应用现在已经在线上了！

### 下一步建议

1. **分享你的应用**
   - 将URL分享给朋友测试

2. **监控使用情况**
   - 定期检查Vercel和MongoDB的使用量

3. **收集反馈**
   - 根据用户反馈改进功能

4. **考虑升级**
   - 当用户量增长时，考虑付费计划获得更多资源

---

## 📞 获取帮助

- **Vercel文档**: https://vercel.com/docs
- **MongoDB文档**: https://docs.mongodb.com/
- **社区论坛**: 
  - Vercel: https://github.com/vercel/vercel/discussions
  - MongoDB: https://www.mongodb.com/community/forums/

---

**祝你部署顺利！** 🚀

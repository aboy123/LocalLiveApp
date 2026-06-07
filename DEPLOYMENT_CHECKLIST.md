# 📋 部署检查清单

在部署到Vercel之前，请确保完成以下所有步骤。

## ✅ 准备阶段

### 1. 代码准备
- [ ] 所有代码已提交到Git
- [ ] `.env` 文件未提交（检查 `.gitignore`）
- [ ] 本地测试通过（`npm run dev`）
- [ ] 构建测试通过（`npm run build`）

### 2. 账户准备
- [ ] GitHub账户已注册
- [ ] Vercel账户已创建（使用GitHub登录）
- [ ] MongoDB Atlas账户已注册

### 3. MongoDB Atlas配置
- [ ] 创建了免费集群（M0）
- [ ] 创建了数据库用户
- [ ] 记录了用户名和密码
- [ ] 配置了网络访问（允许所有IP 0.0.0.0/0）
- [ ] 获取了连接字符串
- [ ] 测试连接字符串格式正确

---

## ✅ 部署阶段

### 4. 推送代码到GitHub
- [ ] 创建了GitHub仓库
- [ ] 代码已推送到main分支
- [ ] 在GitHub上确认代码完整

### 5. Vercel项目配置
- [ ] 在Vercel中导入GitHub仓库
- [ ] 项目名称已设置
- [ ] Framework Preset: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### 6. 环境变量配置 ⭐ 重要
- [ ] `MONGODB_URI` - MongoDB连接字符串
- [ ] `JWT_SECRET` - 使用命令生成的强随机密钥
- [ ] `NODE_ENV` - 设置为 `production`
- [ ] `VITE_API_URL` - 先留空，部署后更新

**生成JWT_SECRET命令：**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 7. 首次部署
- [ ] 点击Deploy开始部署
- [ ] 等待构建完成（1-2分钟）
- [ ] 确认部署成功（绿色对勾）
- [ ] 复制分配的域名（如：your-app.vercel.app）

### 8. 更新API地址
- [ ] 在Vercel环境变量中添加/更新 `VITE_API_URL`
- [ ] 值设置为：`https://your-app.vercel.app/api`
- [ ] 保存环境变量
- [ ] 触发重新部署（Redeploy）

### 9. 初始化数据库
- [ ] 本地运行种子脚本连接到云端数据库
- [ ] 或通过应用界面添加初始数据
- [ ] 确认数据已成功写入

---

## ✅ 测试阶段

### 10. 功能测试
- [ ] 访问主页正常加载
- [ ] 可以注册新用户
- [ ] 可以登录
- [ ] 可以浏览商家列表
- [ ] 可以查看商家详情
- [ ] 搜索功能正常工作

### 11. API测试
- [ ] 访问 `/api/health` 返回成功
- [ ] 注册API正常工作
- [ ] 登录API返回token
- [ ] 商家列表API返回数据

### 12. 浏览器测试
- [ ] Chrome浏览器测试通过
- [ ] Firefox浏览器测试通过
- [ ] Safari浏览器测试通过（可选）
- [ ] 移动端浏览器测试通过

### 13. 控制台检查
- [ ] 无JavaScript错误
- [ ] 无网络请求失败
- [ ] 无CORS错误
- [ ] Token正确存储和发送

---

## ✅ 优化阶段

### 14. 性能检查
- [ ] 页面加载时间 < 3秒
- [ ] API响应时间 < 1秒
- [ ] 图片已优化（如有）
- [ ] 无不必要的依赖

### 15. 安全检查
- [ ] `.env` 文件未提交到Git
- [ ] JWT_SECRET是强随机字符串
- [ ] MongoDB密码足够强
- [ ] HTTPS已启用（Vercel自动提供）

### 16. 监控设置
- [ ] 知道如何查看Vercel日志
- [ ] 知道如何查看MongoDB使用情况
- [ ] 设置了错误监控（可选）

---

## ✅ 发布阶段

### 17. 最终确认
- [ ] 所有测试通过
- [ ] 环境变量配置正确
- [ ] 数据库连接正常
- [ ] 应用功能完整

### 18. 分享应用
- [ ] 记录应用URL
- [ ] 分享给朋友测试
- [ ] 收集反馈

### 19. 文档更新
- [ ] README包含部署信息
- [ ] 记录了部署日期
- [ ] 记录了使用的服务

---

## 🐛 问题排查

如果遇到问题，检查：

1. **构建失败** → 查看Vercel构建日志
2. **数据库连接失败** → 检查MONGODB_URI和网络访问配置
3. **API 404** → 检查vercel.json路由配置
4. **认证失败** → 检查JWT_SECRET是否一致
5. **前端无法连接后端** → 检查VITE_API_URL是否正确

详细解决方案见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📞 需要帮助？

- Vercel文档: https://vercel.com/docs
- MongoDB文档: https://docs.mongodb.com/
- 项目Issues: 在GitHub仓库提issue

---

**完成所有检查项后，你的应用就成功部署了！** 🎉

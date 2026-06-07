# AI聊天配置总览

## 🎯 三种方案对比

| 方案 | 费用 | 智能度 | 配置难度 | 推荐场景 |
|------|------|--------|---------|---------|
| **本地智能回复** | ✅ 完全免费 | ⭐⭐⭐ | ⭐ 无需配置 | 开发测试、演示 |
| **DeepSeek** | 🎁 新用户50元 | ⭐⭐⭐⭐⭐ | ⭐⭐ 简单 | 个人使用 ⭐推荐 |
| **通义千问** | 🎁 有免费额度 | ⭐⭐⭐⭐⭐ | ⭐⭐ 简单 | 企业应用 |

---

## 📖 快速导航

### 1️⃣ 想立即使用（无需配置）
✅ **直接使用本地智能回复**
- 当前已默认启用
- 运行 `npm run dev` 即可
- 查看：[AI_SMART_GUIDE.md](./AI_SMART_GUIDE.md)

### 2️⃣ 想体验真正AI（推荐DeepSeek）
🚀 **5分钟快速配置**
- 查看：[DEEPSEEK_QUICK_START.md](./DEEPSEEK_QUICK_START.md)
- 新用户送50元免费额度
- 智能度高，中文优化好

### 3️⃣ 想了解所有方案
📚 **完整配置指南**
- 查看：[FREE_AI_GUIDE.md](./FREE_AI_GUIDE.md)
- 包含所有免费AI服务对比
- 详细的配置步骤和常见问题

### 4️⃣ 想配置通义千问
💡 **阿里云方案**
- 查看：[QWEN_CONFIG_GUIDE.md](./QWEN_CONFIG_GUIDE.md)
- 查看：[QUICK_START_QWEN.md](./QUICK_START_QWEN.md)

---

## 🔧 配置文件说明

### `.env.example` - 环境变量模板
复制为 `.env` 并填入你的配置：

```env
# 是否启用外部AI
VITE_USE_EXTERNAL_AI=false  # false=本地, true=外部API

# API类型
VITE_AI_API_TYPE=deepseek   # deepseek | qwen | openai

# API密钥
VITE_AI_API_KEY=sk-你的密钥

# 模型名称
VITE_AI_MODEL=deepseek-chat
```

### `.gitignore` - 保护密钥
已配置，`.env` 文件不会被提交到Git。

---

## 💰 费用对比

### 本地智能回复
- **费用：** ¥0（完全免费）
- **限制：** 无
- **适合：** 所有人

### DeepSeek
- **免费额度：** 50元（新用户）
- **收费标准：** ¥2/百万tokens
- **估算：** 100次对话 ≈ ¥0.2-0.4元
- **适合：** 个人用户 ⭐推荐

### 通义千问
- **免费额度：** 有一定额度
- **收费标准：** ¥2-40/百万tokens（取决于模型）
- **适合：** 企业用户、阿里生态

---

## 🚀 开始使用

### 方案A：零配置（推荐新手）

```bash
# 直接运行
npm run dev
```

打开浏览器访问 http://localhost:5173，点击"智能助手"开始聊天！

**优点：**
- ✅ 完全免费
- ✅ 无需注册
- ✅ 即刻可用
- ✅ 隐私安全

**缺点：**
- ⚠️ 基于模板，不如真AI智能

---

### 方案B：DeepSeek（推荐进阶）

#### 第1步：获取API密钥
1. 访问 https://platform.deepseek.com
2. 注册并完成实名认证
3. 创建API Key并复制

#### 第2步：配置项目
```powershell
copy .env.example .env
notepad .env
```

修改：
```env
VITE_USE_EXTERNAL_AI=true
VITE_AI_API_TYPE=deepseek
VITE_AI_API_KEY=sk-你的密钥
VITE_AI_MODEL=deepseek-chat
```

#### 第3步：启动
```bash
npm run dev
```

**优点：**
- ✅ 真正的AI智能
- ✅ 新用户50元免费
- ✅ 中文优化好
- ✅ 速度快

**缺点：**
- ⚠️ 需要实名认证
- ⚠️ 额度用完需充值

---

## 📊 性能对比

| 指标 | 本地回复 | DeepSeek | 通义千问 |
|------|---------|----------|---------|
| 响应速度 | <1秒 | 1-3秒 | 1-3秒 |
| 智能程度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 中文支持 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 离线可用 | ✅ | ❌ | ❌ |
| 隐私保护 | ✅✅✅ | ✅✅ | ✅✅ |
| 成本 | ¥0 | ¥0-低 | ¥0-中 |

---

## 🛡️ 安全建议

### 保护API密钥
1. ✅ 使用 `.env` 文件存储密钥
2. ✅ `.env` 已加入 `.gitignore`
3. ❌ 不要将密钥硬编码在代码中
4. ❌ 不要公开分享密钥

### 生产环境建议
- 使用后端代理调用API
- 设置预算提醒
- 定期轮换密钥
- 监控用量

---

## 🐛 故障排查

### 问题1：API请求失败 401
**原因：** API密钥错误  
**解决：** 检查密钥是否正确复制

### 问题2：API请求失败 403
**原因：** 服务未开通或额度用完  
**解决：** 确认已开通服务，检查余额

### 问题3：响应很慢
**原因：** 网络问题  
**解决：** 检查网络连接，稍后再试

### 问题4：不想注册账号
**解决：** 使用本地智能回复（默认已启用）

---

## 📚 文档索引

| 文档 | 内容 | 适合人群 |
|------|------|---------|
| [README.md](./README.md) | 项目介绍 | 所有人 |
| [AI_SMART_GUIDE.md](./AI_SMART_GUIDE.md) | AI功能说明 | 所有人 |
| [FREE_AI_GUIDE.md](./FREE_AI_GUIDE.md) | 免费AI完整指南 | 想了解所有方案 |
| [DEEPSEEK_QUICK_START.md](./DEEPSEEK_QUICK_START.md) | DeepSeek快速配置 | 想用DeepSeek |
| [QWEN_CONFIG_GUIDE.md](./QWEN_CONFIG_GUIDE.md) | 通义千问详细配置 | 想用通义千问 |
| [QUICK_START_QWEN.md](./QUICK_START_QWEN.md) | 通义千问快速配置 | 想快速配置通义千问 |

---

## 💡 最佳实践

### 开发阶段
✅ 使用本地智能回复
- 完全免费
- 快速迭代
- 无需担心费用

### 测试阶段
✅ 使用DeepSeek
- 50元免费额度充足
- 体验真实AI效果
- 收集用户反馈

### 生产环境
✅ 根据需求选择
- 预算充足：DeepSeek 或 通义千问
- 注重隐私：本地回复 + 后端代理
- 成本控制：设置预算上限

---

## 🎉 总结

**最简单的开始方式：**
```bash
npm run dev
```
直接使用本地智能回复，完全免费！

**想体验真正AI：**
1. 注册DeepSeek获取50元免费额度
2. 配置 `.env` 文件（5分钟）
3. 重启服务
4. 享受智能对话！

**祝使用愉快！🚀**

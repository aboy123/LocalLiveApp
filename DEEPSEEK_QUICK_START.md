# DeepSeek 快速配置（5分钟搞定）

## 🚀 超快配置流程

### 第1步：获取API密钥（2分钟）

1. **访问**: https://platform.deepseek.com
2. **注册**: 手机号或邮箱
3. **认证**: 完成实名认证（需要身份证）
4. **创建密钥**: 
   - 进入 https://platform.deepseek.com/api_keys
   - 点击"创建API Key"
   - 复制密钥（`sk-xxxxx...`）

**🎁 福利**: 新用户注册即送 **50元** 免费额度！

---

### 第2步：配置项目（1分钟）

#### Windows PowerShell

```powershell
# 复制配置文件
copy .env.example .env

# 用记事本打开
notepad .env
```

#### 在 `.env` 文件中修改

```env
VITE_USE_EXTERNAL_AI=true
VITE_AI_API_TYPE=deepseek
VITE_AI_API_KEY=sk-你的实际密钥粘贴在这里
VITE_AI_MODEL=deepseek-chat
```

保存并关闭记事本。

---

### 第3步：启动测试（1分钟）

```bash
npm run dev
```

打开浏览器 http://localhost:5173，点击"智能助手"，发送消息测试！

---

## ✅ 验证成功

发送："你好，请介绍一下自己"

**成功标志：**
- ✅ 收到智能、个性化的回复
- ✅ 回复内容自然流畅
- ✅ 浏览器控制台无错误

**失败标志：**
- ❌ "API请求失败: 401" → 密钥错误
- ❌ "API请求失败: 403" → 账户问题
- ❌ 一直加载 → 网络问题

---

## 💰 费用说明

**免费额度：** 50元（新用户）

**收费标准：**
- deepseek-chat: ¥2 / 百万tokens
- 一次对话约 1000-2000 tokens
- 100次对话 ≈ ¥0.2-0.4元

**估算：**
- 50元 ≈ 12500-25000次对话
- 正常使用可以用很久！

---

## 🔧 常见问题

### Q: 401错误？
**A:** API密钥错误
- 检查是否正确复制
- 确认没有多余空格
- 重新生成密钥试试

### Q: 不想实名认证？
**A:** 使用本地智能回复（默认已启用）
- 完全免费
- 无需注册
- 虽然不如真AI，但也不错

### Q: 如何查看用量？
**A:** 访问 https://platform.deepseek.com/usage

### Q: 额度用完了？
**A:** 
1. 切换回本地模式（改 `.env` 中 `VITE_USE_EXTERNAL_AI=false`）
2. 充值继续使用（很便宜）

---

## 📝 模型选择

| 模型 | 特点 | 推荐场景 |
|------|------|---------|
| deepseek-chat | 通用对话 | 日常聊天、问答 ⭐推荐 |
| deepseek-coder | 编程专用 | 代码生成、调试 |

**建议：** 使用 `deepseek-chat`

---

## 🎯 下一步

配置成功后：
1. ✅ 测试不同话题的回复
2. ✅ 体验真正的AI智能
3. ✅ 监控用量（避免超额）
4. ✅ 根据需要调整模型

---

## 📚 需要更多帮助？

- 📖 [完整配置指南](./FREE_AI_GUIDE.md)
- 🔗 [DeepSeek官方文档](https://platform.deepseek.com/docs)
- 💬 [社区论坛](https://chat.deepseek.com)

---

**祝使用愉快！🎉**

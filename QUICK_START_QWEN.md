# 通义千问快速配置指南

## 🚀 3分钟快速配置

### 步骤1：获取API密钥（1分钟）

1. 访问 [阿里云百炼平台](https://dashscope.aliyun.com)
2. 登录/注册阿里云账号
3. 进入 [API-KEY管理](https://dashscope.console.aliyun.com/apiKey)
4. 点击"创建新的API-KEY"
5. 复制密钥（格式：`sk-xxxxxxxxxxxxx`）

### 步骤2：配置项目（1分钟）

#### 方法A：使用环境变量（推荐）

1. 复制 `.env.example` 为 `.env`：
   ```powershell
   copy .env.example .env
   ```

2. 编辑 `.env` 文件，填入你的API密钥：
   ```env
   VITE_USE_EXTERNAL_AI=true
   VITE_AI_API_TYPE=qwen
   VITE_AI_API_KEY=sk-你的实际密钥
   VITE_AI_MODEL=qwen-turbo
   ```

#### 方法B：直接修改代码

打开 `src/data/aiChatData.js`，找到第16-31行，修改为：

```javascript
export const aiApiConfig = {
  useExternalApi: true,
  apiType: 'qwen',
  apiKey: 'sk-你的实际密钥',
  apiUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
  model: 'qwen-turbo',
};
```

### 步骤3：启动测试（1分钟）

```bash
npm run dev
```

打开浏览器，点击首页的"智能助手"，发送消息测试！

---

## ✅ 验证配置成功

发送测试消息："你好，请介绍一下自己"

**成功标志：**
- ✅ 收到智能、个性化的回复
- ✅ 回复速度快（1-3秒）
- ✅ 浏览器控制台无错误

**失败标志：**
- ❌ 提示 "API请求失败: 401" → API密钥错误
- ❌ 提示 "API请求失败: 403" → 服务未开通
- ❌ 一直显示"输入中" → 网络问题

---

## 📝 常用模型对比

| 模型 | 速度 | 智能度 | 价格 | 推荐场景 |
|------|------|--------|------|---------|
| qwen-turbo | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | ¥ | 开发测试、日常对话 |
| qwen-plus | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | ¥¥ | 生产环境、专业咨询 |
| qwen-max | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | ¥¥¥ | 复杂任务、创意写作 |

**建议：** 先用 `qwen-turbo` 测试，满意后再考虑升级

---

## 🔧 常见问题速查

### Q: 401错误怎么办？
**A:** API密钥错误，检查：
- 密钥是否正确复制
- 是否有多余空格
- 重新生成密钥试试

### Q: 403错误怎么办？
**A:** 服务未开通或配额用完：
- 确认已开通通义千问服务
- 检查账户余额
- 查看免费额度是否用完

### Q: 如何查看用量？
**A:** 访问 [用量查询](https://dashscope.console.aliyun.com/usage)

### Q: 响应太慢？
**A:** 
- 切换到 qwen-turbo（更快）
- 检查网络连接
- 稍后再试

---

## 💰 费用参考

**新用户福利：** 通常有免费额度

**收费标准（qwen-turbo）：**
- 输入：¥0.002 / 1000 tokens
- 输出：¥0.006 / 1000 tokens

**估算：**
- 100次普通对话 ≈ ¥0.5-1元
- 1000次对话 ≈ ¥5-10元

**省钱技巧：**
1. 设置预算提醒
2. 使用 qwen-turbo（最便宜）
3. 定期查看用量

---

## 📚 详细文档

需要更多帮助？查看完整文档：
- 📖 [QWEN_CONFIG_GUIDE.md](./QWEN_CONFIG_GUIDE.md) - 详细配置指南
- 🔗 [官方文档](https://help.aliyun.com/zh/dashscope/)
- 💬 [社区论坛](https://developer.aliyun.com/group/dashscope)

---

## 🎉 配置完成！

现在你的AI聊天已经接入真正的AI智能了！

**下一步：**
1. 测试不同话题的回复质量
2. 根据需求调整模型
3. 监控用量，控制成本

祝使用愉快！🚀

# 通义千问配置 - 快速参考

## 📌 一键配置（推荐）

### PowerShell命令（Windows）

```powershell
# 1. 复制配置文件
copy .env.example .env

# 2. 用记事本打开编辑
notepad .env
```

### 在 `.env` 文件中填写：

```env
VITE_USE_EXTERNAL_AI=true
VITE_AI_API_TYPE=qwen
VITE_AI_API_KEY=sk-你的密钥
VITE_AI_MODEL=qwen-turbo
```

### 启动测试

```bash
npm run dev
```

---

## 🔑 获取API密钥

1. 访问：https://dashscope.aliyun.com
2. 登录/注册阿里云账号
3. 进入：https://dashscope.console.aliyun.com/apiKey
4. 创建并复制API密钥

---

## 🎯 模型选择

| 模型 | 适用场景 |
|------|---------|
| qwen-turbo | 开发测试、日常对话（最快最便宜）|
| qwen-plus | 生产环境、专业咨询（推荐）|
| qwen-max | 复杂任务、创意写作（最智能）|

---

## ✅ 验证成功

发送消息："你好"

**成功：** 收到智能回复  
**失败：** 检查控制台错误信息

---

## 🐛 常见错误

| 错误代码 | 原因 | 解决方法 |
|---------|------|---------|
| 401 | API密钥错误 | 检查密钥是否正确 |
| 403 | 服务未开通 | 开通通义千问服务 |
| 超时 | 网络问题 | 检查网络连接 |

---

## 💰 费用估算

**qwen-turbo：**
- 100次对话 ≈ ¥0.5-1元
- 新用户有免费额度

---

## 📚 更多帮助

- 📖 [详细配置指南](./QWEN_CONFIG_GUIDE.md)
- 🚀 [3分钟快速配置](./QUICK_START_QWEN.md)
- 🔗 [官方文档](https://help.aliyun.com/zh/dashscope/)

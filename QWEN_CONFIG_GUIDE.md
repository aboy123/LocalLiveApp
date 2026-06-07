# 阿里云通义千问配置指南

## 📋 快速开始

本指南将帮助你配置阿里云通义千问API，让AI聊天更智能。

---

## 🔑 步骤1：获取API密钥

### 1.1 注册阿里云账号

1. 访问 [阿里云官网](https://www.aliyun.com)
2. 点击右上角"免费注册"
3. 完成账号注册和实名认证

### 1.2 开通通义千问服务

1. 访问 [阿里云百炼平台](https://dashscope.aliyun.com)
2. 使用阿里云账号登录
3. 点击"开通服务"（新用户有免费额度）

### 1.3 创建API密钥

1. 登录后，进入 [API-KEY管理页面](https://dashscope.console.aliyun.com/apiKey)
2. 点击"创建新的API-KEY"
3. 复制生成的密钥（格式类似：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

**⚠️ 重要提示：**
- 请妥善保管你的API密钥
- 不要将密钥提交到Git仓库
- 建议设置使用限额防止超额消费

---

## ⚙️ 步骤2：配置项目

有两种配置方式，推荐使用方法二（环境变量）。

### 方法一：直接修改配置文件（简单但不推荐）

打开 `src/data/aiChatData.js`，找到 `aiApiConfig` 部分：

```javascript
export const aiApiConfig = {
  // 设置为 true 启用外部API
  useExternalApi: true,
  
  // API类型改为 'qwen'
  apiType: 'qwen',
  
  // 填入你的通义千问API密钥
  apiKey: 'sk-你的API密钥在这里',
  
  // 通义千问API端点
  apiUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
  
  // 模型名称（可选）
  model: 'qwen-turbo',  // 或 'qwen-plus', 'qwen-max'
};
```

### 方法二：使用环境变量（推荐✅）

#### 2.1 创建 `.env` 文件

在项目根目录创建 `.env` 文件：

```env
# 通义千问配置
VITE_USE_EXTERNAL_AI=true
VITE_AI_API_TYPE=qwen
VITE_AI_API_KEY=sk-你的API密钥在这里
VITE_AI_MODEL=qwen-turbo
```

#### 2.2 修改代码读取环境变量

打开 `src/data/aiChatData.js`，修改配置部分：

```javascript
export const aiApiConfig = {
  // 从环境变量读取配置
  useExternalApi: import.meta.env.VITE_USE_EXTERNAL_AI === 'true',
  apiType: import.meta.env.VITE_AI_API_TYPE || 'qwen',
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  apiUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
  model: import.meta.env.VITE_AI_MODEL || 'qwen-turbo',
};
```

#### 2.3 添加到 .gitignore

确保 `.env` 文件不会被提交到Git：

```gitignore
# 在 .gitignore 文件中添加
.env
.env.local
.env.*.local
```

---

## 🎯 步骤3：选择模型

通义千问提供多个模型，根据需求选择：

| 模型 | 特点 | 适用场景 | 价格 |
|------|------|---------|------|
| **qwen-turbo** | 速度快，成本低 | 日常对话、简单问答 | 便宜 |
| **qwen-plus** | 平衡性能和成本 | 复杂任务、专业咨询 | 中等 |
| **qwen-max** | 最强性能 | 深度分析、创意写作 | 较贵 |
| **qwen-long** | 支持长文本 | 文档分析、长对话 | 中等 |

**推荐：** 开发测试用 `qwen-turbo`，生产环境用 `qwen-plus`

---

## 🧪 步骤4：测试配置

### 4.1 启动开发服务器

```bash
npm run dev
```

### 4.2 测试聊天

1. 打开浏览器访问 http://localhost:5173
2. 点击首页的"智能助手"卡片
3. 发送一条消息，例如："你好，请介绍一下自己"
4. 如果收到智能回复，说明配置成功！

### 4.3 检查控制台

打开浏览器开发者工具（F12），查看Console：
- ✅ 没有错误信息 = 配置成功
- ❌ 如果有401错误 = API密钥错误
- ❌ 如果有403错误 = 服务未开通或配额不足

---

## 💰 费用说明

### 免费额度

新用户通常有免费额度：
- qwen-turbo：每月赠送一定token
- 具体额度查看 [官方定价页面](https://help.aliyun.com/zh/dashscope/developer-reference/tongyi-qianwen-large-language-models/)

### 收费标准（参考）

以 qwen-turbo 为例：
- 输入：¥0.002 / 1000 tokens
- 输出：¥0.006 / 1000 tokens

**估算：** 
- 一次普通对话约消耗 500-1000 tokens
- 100次对话约 ¥0.5-1 元

### 设置预算提醒

1. 进入 [费用中心](https://usercenter2.aliyun.com/expense/manage/overview)
2. 设置月度预算提醒
3. 避免意外超额消费

---

## 🔧 常见问题

### Q1: 提示 "API请求失败: 401"

**原因：** API密钥错误或无效

**解决：**
1. 检查密钥是否正确复制
2. 确认密钥没有多余空格
3. 重新生成密钥试试

### Q2: 提示 "API请求失败: 403"

**原因：** 服务未开通或配额用完

**解决：**
1. 确认已开通通义千问服务
2. 检查账户余额
3. 查看是否达到免费额度上限

### Q3: 响应很慢

**原因：** 网络问题或模型负载高

**解决：**
1. 尝试切换到 qwen-turbo（更快）
2. 检查网络连接
3. 稍后再试

### Q4: 中文回复质量不好

**解决：**
1. 尝试使用 qwen-plus 或 qwen-max
2. 在 systemPrompt 中强调使用中文回复

### Q5: 如何查看用量？

**查看方法：**
1. 访问 [用量查询](https://dashscope.console.aliyun.com/usage)
2. 查看每日/每月使用情况
3. 监控token消耗

---

## 🛡️ 安全最佳实践

### 1. 不要硬编码密钥

❌ **错误做法：**
```javascript
apiKey: 'sk-xxxxxxxxxxxxx'  // 直接写在代码里
```

✅ **正确做法：**
```javascript
apiKey: import.meta.env.VITE_AI_API_KEY  // 使用环境变量
```

### 2. 前端代理（生产环境推荐）

由于API密钥在前端可能暴露，生产环境建议：

1. 创建后端代理服务
2. 前端调用自己的后端
3. 后端再调用通义千问API

示例后端代理（Node.js + Express）：

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.QWEN_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

### 3. 设置使用限制

在阿里云控制台：
1. 设置每日/每月消费上限
2. 开启用量提醒
3. 定期审查使用情况

---

## 📚 更多资源

- [通义千问官方文档](https://help.aliyun.com/zh/dashscope/)
- [API参考文档](https://help.aliyun.com/zh/dashscope/developer-reference/api-details)
- [SDK下载](https://help.aliyun.com/zh/dashscope/developer-reference/sdk-reference)
- [社区论坛](https://developer.aliyun.com/group/dashscope)

---

## 🎉 配置完成！

现在你的AI聊天已经接入通义千问，可以享受真正的AI智能了！

**下一步建议：**
1. 测试不同模型的回复质量
2. 根据实际需求调整 model 参数
3. 监控用量，控制成本
4. 考虑实现后端代理保护密钥

祝你使用愉快！🚀

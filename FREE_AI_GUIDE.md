# 免费AI智能体聊天配置指南

## 🎯 推荐方案对比

| 方案 | 免费额度 | 智能程度 | 配置难度 | 推荐指数 |
|------|---------|---------|---------|---------|
| **本地智能回复** | ✅ 完全免费 | ⭐⭐⭐ | ⭐ 无需配置 | ⭐⭐⭐⭐ |
| **DeepSeek** | ✅ 新用户送50元 | ⭐⭐⭐⭐⭐ | ⭐⭐ 简单 | ⭐⭐⭐⭐⭐ |
| **通义千问** | ✅ 新用户有额度 | ⭐⭐⭐⭐⭐ | ⭐⭐ 简单 | ⭐⭐⭐⭐ |
| OpenAI GPT | ❌ 付费 | ⭐⭐⭐⭐⭐ | ⭐⭐ 简单 | ⭐⭐⭐ |

---

## 🚀 方案1：本地智能回复（完全免费，已默认启用）

### 特点
- ✅ **完全免费**，无需API密钥
- ✅ **离线可用**，不需要网络
- ✅ **隐私安全**，数据不上传
- ✅ **响应快速**，<1秒
- ⚠️ 基于模板，智能度有限

### 使用方法
**无需任何配置！** 直接运行即可：

```bash
npm run dev
```

当前配置已经是本地模式（`VITE_USE_EXTERNAL_AI=false`），开箱即用。

---

## 🌟 方案2：DeepSeek API（强烈推荐）

### 为什么选择DeepSeek？
- 🎁 **新用户赠送50元额度**（约可使用数千次对话）
- 🧠 **智能度高**，接近GPT-4水平
- 💰 **价格便宜**，超出免费额度后也很便宜
- 🇨🇳 **中文优化**，对中文理解很好
- ⚡ **速度快**，响应迅速

### 配置步骤

#### 步骤1：注册并获取API密钥（2分钟）

1. 访问 [DeepSeek开放平台](https://platform.deepseek.com)
2. 点击"注册"，使用手机号或邮箱注册
3. 完成实名认证（需要身份证）
4. 进入 [API Keys页面](https://platform.deepseek.com/api_keys)
5. 点击"创建API Key"
6. 复制密钥（格式：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

**💰 免费额度：** 新用户注册即送50元，足够长期使用！

#### 步骤2：配置项目

##### 方法A：使用环境变量（推荐）

1. 复制配置文件：
   ```powershell
   copy .env.example .env
   ```

2. 编辑 `.env` 文件：
   ```env
   VITE_USE_EXTERNAL_AI=true
   VITE_AI_API_TYPE=deepseek
   VITE_AI_API_KEY=sk-你的DeepSeek密钥
   VITE_AI_MODEL=deepseek-chat
   ```

##### 方法B：直接修改代码

打开 `src/data/aiChatData.js`，找到第16-31行：

```javascript
export const aiApiConfig = {
  useExternalApi: true,
  apiType: 'deepseek',
  apiKey: 'sk-你的DeepSeek密钥',
  apiUrl: '',  // 会自动设置
  model: 'deepseek-chat',
};
```

#### 步骤3：启动测试

```bash
npm run dev
```

打开浏览器，发送消息测试！

---

## 💡 方案3：阿里云通义千问

### 特点
- 🎁 新用户有免费额度
- 🧠 智能度高
- 📚 阿里生态整合好

### 配置步骤

1. 访问 [阿里云百炼](https://dashscope.aliyun.com)
2. 注册/登录阿里云账号
3. 开通通义千问服务
4. 获取API密钥：[API-KEY管理](https://dashscope.console.aliyun.com/apiKey)
5. 配置 `.env`：
   ```env
   VITE_USE_EXTERNAL_AI=true
   VITE_AI_API_TYPE=qwen
   VITE_AI_API_KEY=sk-你的通义千问密钥
   VITE_AI_MODEL=qwen-turbo
   ```

详细配置请查看 [QWEN_CONFIG_GUIDE.md](./QWEN_CONFIG_GUIDE.md)

---

## 📊 DeepSeek vs 通义千问对比

| 特性 | DeepSeek | 通义千问 |
|------|----------|---------|
| 免费额度 | 50元（新用户） | 有一定额度 |
| 智能程度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 中文支持 | 优秀 | 优秀 |
| 速度 | 快 | 快 |
| 价格 | ¥2/百万tokens | ¥2-4/百万tokens |
| 注册难度 | 需实名认证 | 需实名认证 |
| 推荐场景 | 日常对话、编程 | 阿里生态、企业应用 |

**建议：** 个人用户优先选择 **DeepSeek**

---

## 🔧 常见问题

### Q1: 不想注册，有没有完全免费的方案？
**A:** 有！使用本地智能回复（默认已启用）。虽然不如真正的AI智能，但已经相当不错，能识别情绪和话题。

### Q2: DeepSeek的50元能用多久？
**A:** 
- deepseek-chat模型：约 ¥2/百万tokens
- 一次普通对话约消耗 1000-2000 tokens
- 50元 ≈ 2500万次tokens ≈ 12500-25000次对话
- 正常使用可以用很久！

### Q3: 免费额度用完了怎么办？
**A:** 
1. 切换回本地智能回复（完全免费）
2. 充值继续使用（DeepSeek很便宜）
3. 尝试其他有免费额度的服务

### Q4: 如何查看用量？
**A:** 
- DeepSeek: [用量查询](https://platform.deepseek.com/usage)
- 通义千问: [用量查询](https://dashscope.console.aliyun.com/usage)

### Q5: API调用失败怎么办？
**A:** 
1. 检查API密钥是否正确
2. 确认账户余额充足
3. 查看控制台错误信息
4. 检查网络连接

---

## 🛡️ 安全提示

### ⚠️ 重要！保护你的API密钥

1. **不要将密钥提交到Git**
   - `.env` 文件已在 `.gitignore` 中
   - 永远不要公开分享你的密钥

2. **定期轮换密钥**
   - 如果怀疑密钥泄露，立即重新生成

3. **设置预算提醒**
   - 在API平台设置消费上限
   - 避免意外超额消费

4. **生产环境建议使用后端代理**
   - 前端直接调用会暴露密钥
   - 建议创建后端服务作为代理

---

## 💰 费用参考

### DeepSeek定价
- **deepseek-chat**: ¥2 / 百万tokens
- **deepseek-coder**: ¥2 / 百万tokens

### 通义千问定价
- **qwen-turbo**: ¥2 / 百万tokens
- **qwen-plus**: ¥4 / 百万tokens
- **qwen-max**: ¥40 / 百万tokens

### 估算示例（以DeepSeek为例）
- 100次普通对话 ≈ ¥0.2-0.4元
- 1000次对话 ≈ ¥2-4元
- 新用户50元额度 ≈ 12500-25000次对话

---

## 🎯 最佳实践建议

### 开发/学习阶段
✅ **推荐使用本地智能回复**
- 完全免费
- 无需配置
- 足够展示功能

### 想体验真正AI智能
✅ **推荐DeepSeek**
- 新用户50元免费额度
- 智能度高
- 中文优化好

### 生产环境
✅ **根据需求选择**
- 预算充足：DeepSeek 或 通义千问
- 注重隐私：本地回复 + 后端代理
- 成本控制：设置预算提醒

---

## 📚 更多资源

- [DeepSeek官方文档](https://platform.deepseek.com/docs)
- [通义千问官方文档](https://help.aliyun.com/zh/dashscope/)
- [本地智能回复说明](./AI_SMART_GUIDE.md)

---

## 🎉 开始使用

**最简单的开始方式：**

1. **完全免费（无需配置）**
   ```bash
   npm run dev
   ```
   直接使用本地智能回复！

2. **体验真正AI（5分钟配置）**
   - 注册DeepSeek获取免费额度
   - 配置 `.env` 文件
   - 重启服务
   - 享受智能对话！

祝你使用愉快！🚀

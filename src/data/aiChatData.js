// AI聊天助手数据管理

// AI角色定义 - 综合智能助手
export const aiRoles = [
  {
    id: 'smart_assistant',
    name: '智能助手',
    icon: '🤖',
    description: '全能AI助手，提供情感支持、职业建议、知识问答和轻松聊天',
    greeting: '你好！我是你的智能助手。我可以陪你聊天、解答问题、提供建议，或者只是倾听你的心声。今天想聊点什么呢？',
    systemPrompt: '你是一位全能、智能、富有同理心的AI助手。你能够：\n1. 提供情感支持和心理疏导\n2. 给出职业规划和职场建议\n3. 回答各种知识性问题\n4. 像朋友一样轻松聊天\n\n请根据用户的问题类型自动调整回复风格：\n- 情感问题时：温暖、共情、支持\n- 职场问题时：专业、实用、具体\n- 知识问题时：准确、清晰、有条理\n- 日常聊天时：自然、亲切、幽默\n\n始终保持友好、专业的态度。',
  },
];

// AI API配置（可配置外部AI API）
export const aiApiConfig = {
  // 设置为 true 启用外部API，false 使用本地回复
  useExternalApi: import.meta.env.VITE_USE_EXTERNAL_AI === 'true' || false,
  
  // API类型: 'deepseek' | 'qwen' | 'openai' | 'custom'
  apiType: import.meta.env.VITE_AI_API_TYPE || 'deepseek',
  
  // API密钥（从环境变量读取或手动填写）
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  
  // API端点 - 根据apiType自动选择
  apiUrl: '',
  
  // 模型名称
  model: import.meta.env.VITE_AI_MODEL || 'deepseek-chat',
};

// 获取API端点
export function getApiUrl(apiType) {
  const endpoints = {
    deepseek: 'https://api.deepseek.com/v1/chat/completions',
    qwen: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    openai: 'https://api.openai.com/v1/chat/completions',
  };
  return endpoints[apiType] || endpoints.deepseek;
}

// 更智能的本地回复生成器（方案2）
class SmartResponseGenerator {
  constructor() {
    this.contextMemory = new Map(); // 简单的上下文记忆
  }

  // 分析用户意图
  analyzeIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // 情绪检测
    const emotions = {
      negative: ['难过', '伤心', '痛苦', '失望', '沮丧', '焦虑', '压力', '烦', '累', '苦'],
      positive: ['开心', '高兴', '快乐', '棒', '好', '喜欢', '爱', '兴奋', '激动'],
      confused: ['不知道', '怎么办', '如何', '怎么', '为什么', '疑问', '困惑'],
      seeking_help: ['帮助', '建议', '指导', '请教', '求助'],
    };

    let detectedEmotion = null;
    for (const [emotion, keywords] of Object.entries(emotions)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        detectedEmotion = emotion;
        break;
      }
    }

    // 话题分类
    const topics = {
      work: ['工作', '职场', '面试', '升职', '同事', '老板', '工资', '加班'],
      relationship: ['恋爱', '感情', '分手', '结婚', '朋友', '家人', '关系'],
      health: ['健康', '运动', '饮食', '睡眠', '生病', '减肥', '健身'],
      study: ['学习', '考试', '学校', '课程', '知识', '读书'],
      life: ['生活', '日常', '习惯', '兴趣', '爱好', '旅行'],
    };

    let detectedTopic = 'general';
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        detectedTopic = topic;
        break;
      }
    }

    return { emotion: detectedEmotion, topic: detectedTopic };
  }

  // 生成上下文相关的回复
  generateContextualResponse(roleId, message, conversationHistory) {
    const { emotion, topic } = this.analyzeIntent(message);
    const role = aiRoles.find(r => r.id === roleId);
    
    // 保存上下文
    if (!this.contextMemory.has(roleId)) {
      this.contextMemory.set(roleId, []);
    }
    this.contextMemory.get(roleId).push({ message, emotion, topic });
    
    // 只保留最近5条上下文
    if (this.contextMemory.get(roleId).length > 5) {
      this.contextMemory.get(roleId).shift();
    }

    return this.createResponse(roleId, emotion, topic, conversationHistory);
  }

  // 创建回复
  createResponse(roleId, emotion, topic, history) {
    // 现在只有一个角色，直接使用综合模板
    const responses = this.getSmartAssistantTemplates(emotion, topic);
    
    // 根据历史对话调整回复
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    // 如果有历史对话，添加个性化内容
    if (history.length > 2) {
      response = this.addPersonalization(response, history);
    }
    
    return response;
  }

  // 获取综合智能助手的回复模板库
  getSmartAssistantTemplates(emotion, topic) {
    const templates = {
      // 情绪相关回复
      negative: [
        '我能感受到你现在的痛苦。这种情绪是很正常的，每个人都会有低谷期。\n\n我想告诉你：\n• 你的感受是重要的\n• 允许自己有这样的情绪\n• 这不是你的错\n• 你值得被关爱\n\n试着深呼吸几次，我在这里陪着你。你想多说说具体情况吗？',
        '听到你这么说，我很关心你。负面情绪就像乌云，虽然暂时遮住了阳光，但它终会散去。\n\n现在你可以：\n1. 找个安静的地方，给自己一些空间\n2. 写下你的感受，释放情绪\n3. 做一些让自己舒服的事\n4. 联系信任的人\n\n记住，寻求帮助是勇敢的表现。',
        '我理解这种感受真的很煎熬。但请相信，困难只是暂时的。\n\n让我们一起想想：\n✨ 是什么让你感到这样？\n✨ 之前遇到类似情况时，你是怎么走出来的？\n✨ 现在有什么小事可以让你感觉好一点？\n\n慢慢来，不着急。',
      ],
      positive: [
        '太棒了！听到你这么说我真为你高兴！😊\n\n保持这样的好心情很重要。分享一下是什么让你这么开心吗？也许可以给其他人也带来正能量！',
        '真好！生活中的这些小确幸最值得珍惜。\n\n建议你：\n• 记录下这个美好时刻\n• 和身边的人分享这份喜悦\n• 继续保持积极的心态\n\n你值得拥有这样的快乐！',
        '哇塞！这也太棒了吧！🎉 快跟我详细说说！',
      ],
      confused: [
        '我理解你的困惑。迷茫的时候确实让人不安，但这也是成长的契机。\n\n让我们一步步来：\n1. 先理清你最关心的是什么\n2. 列出可能的选择\n3. 分析每个选择的利弊\n4. 听听内心的声音\n\n不用急着做决定，我可以陪你一起思考。',
        '困惑说明你在认真思考，这是好事。\n\n试着问自己：\n• 我真正想要的是什么？\n• 什么对我最重要？\n• 如果不受限制，我会怎么做？\n\n有时候答案就在问题中。你想详细说说吗？',
      ],
      seeking_help: [
        '我很乐意帮助你！请告诉我更多细节，这样我可以给出更精准的建议。',
        '没问题，我们一起来解决这个问题。你先说说具体情况？',
      ],
      
      // 话题相关回复
      work: [
        '关于职场问题，我给你一些实用建议：\n\n📌 **沟通技巧**\n• 主动与上级沟通期望和目标\n• 学会说"不"，合理管理工作量\n• 建立良好的人际关系网络\n\n📌 **职业发展**\n• 定期更新简历和技能清单\n• 寻找mentor或导师\n• 参加行业活动和培训\n\n你目前遇到的具体问题是什么？我可以给出更有针对性的建议。',
        '职场挑战是成长的机会。让我帮你分析：\n\n1️⃣ **明确问题核心**\n   - 是工作内容、人际关系还是发展空间？\n\n2️⃣ **制定行动计划**\n   - 短期目标（1-3个月）\n   - 中期目标（6-12个月）\n   - 长期规划（1-3年）\n\n3️⃣ **执行与调整**\n   - 每周回顾进展\n   - 根据实际情况调整策略\n\n分享更多细节，我们一起制定方案。',
      ],
      relationship: [
        '人际关系确实重要。建议：\n\n✅ **与人相处**\n• 保持真诚，建立信任\n• 学会倾听，理解他人\n• 尊重差异，包容不同观点\n\n✅ **处理冲突**\n• 冷静分析，对事不对人\n• 寻求双赢解决方案\n• 必要时寻求第三方帮助\n\n你遇到的是哪种情况？',
      ],
      health: [
        '健康是最重要的财富！给你一些建议：\n\n🏃 **运动建议**\n• 每周至少150分钟中等强度运动\n• 结合有氧和力量训练\n• 找到自己喜欢的运动方式\n\n🥗 **饮食原则**\n• 均衡营养，多样化饮食\n• 多吃蔬菜水果和全谷物\n• 控制糖分和加工食品\n• 充足饮水（每天8杯水）\n\n😴 **睡眠质量**\n• 保持规律作息\n• 睡前1小时远离电子设备\n• 创造舒适的睡眠环境\n• 7-9小时充足睡眠\n\n你有什么具体的健康问题吗？',
      ],
      study: [
        '关于学习，我给你一些科学的方法：\n\n📖 **高效学习法**\n• 费曼技巧：用简单语言解释复杂概念\n• 间隔重复：分散学习时间，加强记忆\n• 主动回忆：测试自己而不是被动阅读\n\n🎯 **时间管理**\n• 番茄工作法：25分钟专注+5分钟休息\n• 优先级排序：重要且紧急的事先做\n• 避免多任务：一次只做一件事\n\n🧠 **记忆技巧**\n• 联想记忆：将新知识与已知事物联系\n• 思维导图：可视化知识结构\n• 实践应用：学以致用\n\n你在学习什么内容？我可以提供更具体的建议。',
      ],
      life: [
        '生活就是这样，有起有落。重要的是保持好心情！\n\n要不要一起想想解决办法？说不定会有新灵感！\n\n或者，你也可以：\n• 培养一个新爱好\n• 去旅行放松一下\n• 和朋友聚聚\n• 尝试新鲜事物\n\n你想聊点什么？',
      ],
      general: [
        '这是一个很好的问题！让我为你详细解答。\n\n从多个角度来看：\n\n1️⃣ **基本事实**\n   提供准确的基础信息\n\n2️⃣ **深度分析**\n   探讨背后的原理和逻辑\n\n3️⃣ **实用建议**\n   给出可操作的建议\n\n4️⃣ **延伸阅读**\n   推荐相关资源\n\n你能提供更多背景信息吗？这样我可以给出更精准的回答。',
        '感谢你的分享。作为智能助手，我想说：每个人都有权利表达自己的想法。\n\n无论你想聊什么——情感问题、职场困惑、知识疑问，还是只是想找人聊天，我都会认真倾听并尽力帮助。你可以继续说下去，或者问我任何问题。',
        '我在听。有时候，仅仅是说出来就能让人感觉好一些。\n\n如果你想深入探讨某个话题，或者需要具体的建议，随时告诉我。',
        '哈哈，有意思！继续说继续说～ 😊',
        '你说的对！我也是这么想的～',
      ],
    };

    // 优先返回匹配情绪的模板
    if (emotion && templates[emotion]) {
      return templates[emotion];
    }
    
    // 其次返回匹配话题的模板
    if (topic !== 'general' && templates[topic]) {
      return templates[topic];
    }
    
    // 默认返回通用模板
    return templates.general;
  }

  // 添加个性化内容
  addPersonalization(response, history) {
    const recentTopics = history.slice(-3).map(h => h.content.substring(0, 20));
    const personalization = '\n\n---\n💡 基于我们之前的对话，我觉得这个话题对你很重要。如果你有更多疑问，随时可以继续讨论！';
    return response + personalization;
  }
}

// 创建全局实例
const smartGenerator = new SmartResponseGenerator();

// 模拟AI回复(支持方案2和方案3)
export const generateAIResponse = async (message, roleId, conversationHistory = []) => {
  const role = aiRoles.find(r => r.id === roleId);
  
  // 方案3：如果启用了外部API，调用真实AI
  if (aiApiConfig.useExternalApi && aiApiConfig.apiKey) {
    try {
      return await callExternalAI(message, roleId, conversationHistory);
    } catch (error) {
      console.error('外部API调用失败，降级到本地回复:', error);
      // 降级到方案2
    }
  }
  
  // 方案2：使用改进的智能本地回复
  const response = smartGenerator.generateContextualResponse(
    roleId, 
    message, 
    conversationHistory
  );
  
  // 模拟网络延迟，让体验更真实
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  return {
    role: 'assistant',
    content: response,
    timestamp: new Date().toISOString(),
  };
};

// 调用外部AI API（方案3）
async function callExternalAI(message, roleId, conversationHistory) {
  const role = aiRoles.find(r => r.id === roleId);
  
  // 构建消息历史
  const messages = [
    {
      role: 'system',
      content: role.systemPrompt,
    },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    {
      role: 'user',
      content: message,
    },
  ];

  // 获取API端点
  const apiUrl = getApiUrl(aiApiConfig.apiType);
  
  // 根据不同API类型构建请求
  let requestBody, headers;
  
  switch (aiApiConfig.apiType) {
    case 'deepseek': // DeepSeek（有免费额度）
      requestBody = {
        model: aiApiConfig.model || 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      };
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiApiConfig.apiKey}`,
      };
      break;
      
    case 'openai':
      requestBody = {
        model: aiApiConfig.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      };
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiApiConfig.apiKey}`,
      };
      break;
      
    case 'qwen': // 通义千问（兼容OpenAI格式）
      requestBody = {
        model: aiApiConfig.model || 'qwen-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 0.8,
      };
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiApiConfig.apiKey}`,
      };
      break;
      
    default:
      throw new Error('不支持的API类型');
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API请求失败: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  // 解析响应格式（所有API都兼容OpenAI格式）
  const content = data.choices[0].message.content;

  return {
    role: 'assistant',
    content: content,
    timestamp: new Date().toISOString(),
  };
}

// 获取对话历史
export const getConversationHistory = (roleId) => {
  const key = `chat_history_${roleId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

// 保存对话历史
export const saveConversationHistory = (roleId, messages) => {
  const key = `chat_history_${roleId}`;
  localStorage.setItem(key, JSON.stringify(messages));
};

// 清除对话历史
export const clearConversationHistory = (roleId) => {
  const key = `chat_history_${roleId}`;
  localStorage.removeItem(key);
};

// 获取所有角色的对话摘要
export const getAllConversationsSummary = () => {
  return aiRoles.map(role => {
    const history = getConversationHistory(role.id);
    return {
      roleId: role.id,
      roleName: role.name,
      roleIcon: role.icon,
      messageCount: history.length,
      lastMessage: history.length > 0 ? history[history.length - 1] : null,
    };
  });
};

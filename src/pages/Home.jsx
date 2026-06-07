import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { aiRoles, generateAIResponse, getConversationHistory, saveConversationHistory, clearConversationHistory } from '../data/aiChatData';
import '../styles/Home.css';

const Home = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedRole) {
      const history = getConversationHistory(selectedRole.id);
      if (history.length === 0) {
        const greetingMessage = {
          role: 'assistant',
          content: selectedRole.greeting,
          timestamp: new Date().toISOString(),
        };
        setMessages([greetingMessage]);
        saveConversationHistory(selectedRole.id, [greetingMessage]);
      } else {
        setMessages(history);
      }
    }
  }, [selectedRole]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedRole) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(
        userMessage.content,
        selectedRole.id,
        newMessages
      );

      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
      saveConversationHistory(selectedRole.id, updatedMessages);
    } catch (error) {
      console.error('AI回复失败:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (selectedRole && window.confirm('确定要清空聊天记录吗?')) {
      clearConversationHistory(selectedRole.id);
      const greetingMessage = {
        role: 'assistant',
        content: selectedRole.greeting,
        timestamp: new Date().toISOString(),
      };
      setMessages([greetingMessage]);
      saveConversationHistory(selectedRole.id, [greetingMessage]);
    }
  };

  if (!selectedRole) {
    return (
      <div className="home-container">
        <div className="home-content">
          {/* AI聊天入口 */}
          <div className="ai-chat-section">
            <h2>🤖 智能AI助手</h2>
            <p className="selection-title">点击开始与AI助手聊天</p>
            <div className="role-grid">
              {aiRoles.map((role) => (
                <div
                  key={role.id}
                  className="role-card"
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="role-icon">{role.icon}</div>
                  <h3 className="role-name">{role.name}</h3>
                  <p className="role-description">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="home-actions">
            {/* <Link to="/local-life" className="btn-primary">🏙️ 本地生活</Link> */}
            <Link to="/login" className="btn-secondary">登录</Link>
            <Link to="/register" className="btn-secondary">注册</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="chat-header">
        <button onClick={() => setSelectedRole(null)} className="btn-back">← 返回</button>
        <div className="chat-header-info">
          <span className="header-icon">{selectedRole.icon}</span>
          <h2>{selectedRole.name}</h2>
        </div>
        <button onClick={handleClearChat} className="btn-clear" title="清空聊天">
          🗑️
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'message-user' : 'message-ai'}`}
          >
            <div className="message-avatar">
              {message.role === 'user' ? '👤' : selectedRole.icon}
            </div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message message-ai">
            <div className="message-avatar">{selectedRole.icon}</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`给${selectedRole.name}发消息...`}
          disabled={isTyping}
        />
        <button type="submit" className="btn-send" disabled={isTyping || !inputMessage.trim()}>
          发送
        </button>
      </form>
    </div>
  );
};

export default Home;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCategories, getPostsByCategory, addPost, likePost } from '../data/forumData';
import '../styles/Forum.css';

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    try {
      const data = await getPostsByCategory(selectedCategory);
      setPosts(data);
    } catch (error) {
      console.error('加载帖子失败:', error);
      setPosts([]);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/forum/${postId}`);
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    try {
      const newLikes = await likePost(postId);
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: newLikes } : p));
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    return `${Math.floor(diff / 86400000)}天前`;
  };

  const handleBack = () => {
    navigate('/local-life');
  };

  return (
    <div className="forum-container">
      <header className="forum-header">
        <button onClick={handleBack} className="btn-back">← 返回</button>
        <h2>💬 社区论坛</h2>
        <button onClick={() => setShowNewPostModal(true)} className="btn-new-post">
          + 发帖
        </button>
      </header>

      {/* 分类导航 */}
      <div className="category-tabs">
        {postCategories.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span className="tab-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 帖子列表 */}
      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>😕 暂无帖子</p>
            <button onClick={() => setShowNewPostModal(true)} className="btn-create-first">
              发布第一个帖子
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <span className="post-category">
                  {postCategories.find(c => c.id === post.category)?.icon}
                  {' '}
                  {postCategories.find(c => c.id === post.category)?.name}
                </span>
              </div>
              
              <p className="post-preview">
                {post.content.substring(0, 100)}
                {post.content.length > 100 ? '...' : ''}
              </p>

              <div className="post-tags">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>

              <div className="post-footer">
                <div className="post-meta">
                  <span className="author">👤 {post.author}</span>
                  <span className="time">{formatTime(post.createdAt)}</span>
                </div>
                <div className="post-stats">
                  <button 
                    className="stat-btn like-btn"
                    onClick={(e) => handleLike(e, post.id)}
                  >
                    ❤️ {post.likes}
                  </button>
                  <span className="stat-item">💬 {post.comments.length}</span>
                  <span className="stat-item">👁️ {post.views}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 新建帖子模态框 */}
      {showNewPostModal && (
        <NewPostModal 
          onClose={() => setShowNewPostModal(false)}
          onSuccess={() => {
            setShowNewPostModal(false);
            loadPosts();
          }}
        />
      )}
    </div>
  );
};

// 新建帖子组件
const NewPostModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'life',
    tags: '',
    author: '匿名用户',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      await addPost(postData);
      onSuccess();
    } catch (error) {
      console.error('发布帖子失败:', error);
      alert('发布失败，请重试');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>发布新帖子</h3>
          <button onClick={onClose} className="btn-close">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="new-post-form">
          <div className="form-group">
            <label>标题</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="请输入帖子标题"
            />
          </div>

          <div className="form-group">
            <label>分类</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {postCategories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>内容</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
              rows="6"
              placeholder="分享你的想法..."
            />
          </div>

          <div className="form-group">
            <label>标签(用逗号分隔)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="例如: 生活, 分享, 推荐"
            />
          </div>

          <div className="form-group">
            <label>昵称</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              placeholder="你的昵称"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">取消</button>
            <button type="submit" className="btn-submit">发布</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forum;

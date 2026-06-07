import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, addComment, deleteComment, likePost, postCategories } from '../data/forumData';
import '../styles/ForumDetail.css';

const ForumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('匿名用户');

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (error) {
      console.error('加载帖子失败:', error);
    }
  };

  const handleBack = () => {
    navigate('/forum');
  };

  const handleLike = async () => {
    if (post) {
      try {
        const newLikes = await likePost(post.id);
        setPost({ ...post, likes: newLikes });
      } catch (error) {
        console.error('点赞失败:', error);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      await addComment(post.id, {
        author: commentAuthor,
        content: commentContent.trim(),
      });

      setCommentContent('');
      await loadPost();
    } catch (error) {
      console.error('添加评论失败:', error);
      alert('评论失败，请重试');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('确定要删除这条评论吗?')) {
      try {
        await deleteComment(post.id, commentId);
        await loadPost();
      } catch (error) {
        console.error('删除评论失败:', error);
        alert('删除失败，请重试');
      }
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!post) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="forum-detail-container">
      <header className="detail-header">
        <button onClick={handleBack} className="btn-back">← 返回</button>
        <h2>帖子详情</h2>
      </header>

      <div className="post-detail">
        {/* 帖子头部 */}
        <div className="post-main">
          <div className="post-title-section">
            <h1 className="post-title">{post.title}</h1>
            <span className="post-category-badge">
              {postCategories.find(c => c.id === post.category)?.icon}
              {' '}
              {postCategories.find(c => c.id === post.category)?.name}
            </span>
          </div>

          <div className="post-meta-info">
            <span className="author">👤 {post.author}</span>
            <span className="time">🕒 {formatTime(post.createdAt)}</span>
            <span className="views">👁️ {post.views} 浏览</span>
          </div>

          <div className="post-content">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>

          <div className="post-actions">
            <button className="action-btn like-btn" onClick={handleLike}>
              ❤️ 点赞 ({post.likes})
            </button>
          </div>
        </div>

        {/* 评论区 */}
        <div className="comments-section">
          <h3 className="comments-title">💬 评论 ({post.comments.length})</h3>

          <div className="comments-list">
            {post.comments.length === 0 ? (
              <p className="no-comments">暂无评论,快来抢沙发!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">👤 {comment.author}</span>
                    <span className="comment-time">{formatTime(comment.createdAt)}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                  <button 
                    className="btn-delete-comment"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    删除
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 发表评论 */}
          <form onSubmit={handleAddComment} className="comment-form">
            <h4>发表评论</h4>
            <div className="form-group">
              <input
                type="text"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="你的昵称"
              />
            </div>
            <div className="form-group">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="写下你的评论..."
                rows="3"
                required
              />
            </div>
            <button type="submit" className="btn-submit-comment">
              发表评论
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForumDetail;

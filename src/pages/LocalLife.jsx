import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { categories, getMerchantsByCategory, searchMerchants } from '../data/localLifeData';
import '../styles/LocalLife.css';

const LocalLife = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [merchants, setMerchants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMerchants();
  }, [selectedCategory]);

  const loadMerchants = async () => {
    try {
      if (searchKeyword) {
        const results = await searchMerchants(searchKeyword);
        setMerchants(results);
      } else {
        const data = await getMerchantsByCategory(selectedCategory);
        setMerchants(data);
      }
    } catch (error) {
      console.error('加载商家数据失败:', error);
      setMerchants([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadMerchants();
  };

  const handleMerchantClick = (merchantId) => {
    navigate(`/local-life/${merchantId}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) stars += '½';
    return stars;
  };

  return (
    <div className="local-life-container">
      {/* 快捷入口 */}
      <div className="quick-access">
        <Link to="/ai-chat" className="access-card ai-chat-card">
          <div className="access-icon">🤖</div>
          <h3>AI聊天助手</h3>
          <p>智能对话，情感陪伴</p>
        </Link>
        <Link to="/forum" className="access-card forum-card">
          <div className="access-icon">💬</div>
          <h3>社区论坛</h3>
          <p>分享交流，互助讨论</p>
        </Link>
      </div>

      {/* 头部搜索 */}
      <header className="local-life-header">
        <h1>🏙️ 本地生活</h1>
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="搜索商家、服务..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </header>

      {/* 分类导航 */}
      <div className="category-nav">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              backgroundColor: selectedCategory === cat.id ? cat.color : 'white',
              color: selectedCategory === cat.id ? 'white' : '#333',
            }}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 商家列表 */}
      <div className="merchants-grid">
        {merchants.length === 0 ? (
          <div className="empty-state">
            <p>😕 暂无相关商家</p>
          </div>
        ) : (
          merchants.map((merchant) => (
            <div
              key={merchant.id}
              className="merchant-card"
              onClick={() => handleMerchantClick(merchant.id)}
            >
              <div className="merchant-image">{merchant.image}</div>
              <div className="merchant-info">
                <h3 className="merchant-name">{merchant.name}</h3>
                <div className="merchant-rating">
                  <span className="stars">{renderStars(merchant.rating)}</span>
                  <span className="rating-score">{merchant.rating}</span>
                  <span className="review-count">({merchant.reviews}条评价)</span>
                </div>
                <p className="merchant-address">📍 {merchant.address}</p>
                <div className="merchant-tags">
                  {merchant.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="merchant-footer">
                  <span className="min-price">人均 ¥{merchant.minPrice}</span>
                  <span className="view-detail">查看详情 →</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocalLife;

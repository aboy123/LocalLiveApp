import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMerchantById } from '../data/localLifeData';
import '../styles/MerchantDetail.css';

const MerchantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMerchant = async () => {
      try {
        const data = await getMerchantById(id);
        if (data) {
          setMerchant(data);
        }
      } catch (error) {
        console.error('加载商家详情失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMerchant();
  }, [id]);

  const handleBack = () => {
    navigate('/local-life');
  };

  const handleCall = () => {
    window.location.href = `tel:${merchant.phone}`;
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (!merchant) {
    return (
      <div className="not-found">
        <h2>😕 商家不存在</h2>
        <button onClick={handleBack} className="btn-back">返回</button>
      </div>
    );
  }

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
    <div className="merchant-detail-container">
      {/* 头部导航 */}
      <header className="detail-header">
        <button onClick={handleBack} className="btn-back">← 返回</button>
        <h2>商家详情</h2>
      </header>

      {/* 商家信息卡片 */}
      <div className="detail-card">
        <div className="detail-image">{merchant.image}</div>
        <div className="detail-info">
          <h1 className="detail-name">{merchant.name}</h1>
          <div className="detail-rating">
            <span className="stars">{renderStars(merchant.rating)}</span>
            <span className="rating-score">{merchant.rating}</span>
            <span className="review-count">{merchant.reviews}条评价</span>
          </div>
          <div className="detail-tags">
            {merchant.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="detail-sections">
        <section className="detail-section">
          <h3>📋 商家介绍</h3>
          <p>{merchant.description}</p>
        </section>

        <section className="detail-section">
          <h3>📍 地址信息</h3>
          <p>{merchant.address}</p>
        </section>

        <section className="detail-section">
          <h3>🕒 营业时间</h3>
          <p>{merchant.businessHours}</p>
        </section>

        <section className="detail-section">
          <h3>💰 价格信息</h3>
          <p>人均消费: ¥{merchant.minPrice}</p>
        </section>

        <section className="detail-section">
          <h3>📞 联系方式</h3>
          <p>{merchant.phone}</p>
        </section>
      </div>

      {/* 底部操作栏 */}
      <div className="detail-actions">
        <button onClick={handleCall} className="btn-call">
          📞 拨打电话
        </button>
        <button className="btn-favorite">
          ⭐ 收藏
        </button>
      </div>
    </div>
  );
};

export default MerchantDetail;

import { Link } from 'react-router-dom';
import '../styles/Activities.css';

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: '周末亲子活动',
      icon: '👨‍👩‍👧‍👦',
      date: '2026-05-16',
      location: '市中心公园',
      description: '适合全家参与的户外活动，增进亲子关系',
      participants: 45,
    },
    {
      id: 2,
      title: '瑜伽健身课程',
      icon: '🧘',
      date: '2026-05-17',
      location: '健身中心',
      description: '专业瑜伽教练指导，放松身心',
      participants: 30,
    },
    {
      id: 3,
      title: '美食烹饪 workshop',
      icon: '👨‍🍳',
      date: '2026-05-18',
      location: '厨艺学校',
      description: '学习制作美味佳肴，享受烹饪乐趣',
      participants: 20,
    },
    {
      id: 4,
      title: '摄影技巧分享会',
      icon: '📷',
      date: '2026-05-19',
      location: '艺术中心',
      description: '专业摄影师分享拍摄技巧和心得',
      participants: 35,
    },
    {
      id: 5,
      title: '读书会',
      icon: '📚',
      date: '2026-05-20',
      location: '图书馆',
      description: '一起分享好书，交流阅读心得',
      participants: 25,
    },
    {
      id: 6,
      title: '户外徒步活动',
      icon: '🥾',
      date: '2026-05-21',
      location: '郊外山区',
      description: '亲近自然，锻炼身体，欣赏美景',
      participants: 50,
    },
  ];

  return (
    <div className="activities-container">
      <div className="activities-header">
        <h1>🎉 精彩活动</h1>
        <p>发现身边的精彩活动，丰富你的生活</p>
      </div>

      <div className="activities-grid">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-icon">{activity.icon}</div>
            <h3 className="activity-title">{activity.title}</h3>
            <div className="activity-info">
              <p className="activity-date">📅 {activity.date}</p>
              <p className="activity-location">📍 {activity.location}</p>
            </div>
            <p className="activity-description">{activity.description}</p>
            <div className="activity-footer">
              <span className="participants">👥 {activity.participants}人已报名</span>
              <button className="btn-join">报名参加</button>
            </div>
          </div>
        ))}
      </div>

      <div className="back-link">
        <Link to="/" className="btn-back-home">← 返回首页</Link>
      </div>
    </div>
  );
};

export default Activities;

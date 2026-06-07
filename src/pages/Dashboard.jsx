import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>仪表板</h1>
      </header>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>欢迎, {user?.name || '用户'}!</h2>
          <p>邮箱: {user?.email}</p>
          <p>您已成功登录系统</p>
        </div>

        <div className="info-cards">
          <Link to="/local-life" className="info-card-link">
            <div className="info-card">
              <h3>🏙️ 本地生活</h3>
              <p>探索周边美食、购物、娱乐</p>
            </div>
          </Link>
          <div className="info-card">
            <h3>📊 数据统计</h3>
            <p>这里可以展示您的个人数据</p>
          </div>
          <div className="info-card">
            <h3>⚙️ 设置</h3>
            <p>管理您的账户设置</p>
          </div>
          <div className="info-card">
            <h3>🔔 通知</h3>
            <p>查看您的消息通知</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

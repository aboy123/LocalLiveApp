import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/housekeeping', label: '家政', icon: '🧹' },
    { path: '/activities', label: '活动', icon: '🎉' },
    { path: '/forum', label: '论坛', icon: '💬' },
  ];

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      // 已登录用户点击头像，显示确认退出对话框
      if (window.confirm('确定要退出登录吗？')) {
        logout();
        navigate('/');
      } else {
        // 取消退出，跳转到个人中心
        navigate('/dashboard');
      }
    } else {
      // 未登录用户点击头像，跳转到登录页
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path} className="navbar-item">
              <Link
                to={item.path}
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="navbar-user">
          {isAuthenticated ? (
            <div className="user-avatar" onClick={handleAvatarClick} title="点击退出登录">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          ) : (
            <div className="user-avatar guest" onClick={handleAvatarClick} title="登录/注册">
              👤
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

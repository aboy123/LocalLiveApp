import { Link } from 'react-router-dom';
import '../styles/Housekeeping.css';

const Housekeeping = () => {
  const services = [
    {
      id: 1,
      name: '日常保洁',
      icon: '🧹',
      description: '家庭日常清洁打扫，保持家居环境整洁',
      price: '¥40/小时',
    },
    // {
    //   id: 2,
    //   name: '深度清洁',
    //   icon: '✨',
    //   description: '全方位深度清洁，包括厨房、卫生间等',
    //   price: '¥80/小时',
    // },
    // {
    //   id: 3,
    //   name: '擦玻璃',
    //   icon: '🪟',
    //   description: '专业擦玻璃服务，让窗户明亮如新',
    //   price: '¥100/次',
    // },
    {
      id: 4,
      name: '家电清洗',
      icon: '🔧',
      description: '空调、洗衣机、油烟机等家电清洗',
      price: '¥50/台',
    },
    {
      id: 5,
      name: '保姆服务',
      icon: '👩‍🍼',
      description: '专业保姆，照顾老人、小孩',
      price: '¥300/天',
    },
    // {
    //   id: 6,
    //   name: '月嫂服务',
    //   icon: '👶',
    //   description: '专业月嫂，产后护理和新生儿照顾',
    //   price: '¥300/天',
    // },
  ];

  return (
    <div className="housekeeping-container">
      <div className="housekeeping-header">
        <h1>🧹 家政服务</h1>
        <p>专业家政，让生活更轻松</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-price">{service.price}</div>
            <button className="btn-book">预约服务</button>
          </div>
        ))}
      </div>

      <div className="back-link">
        <Link to="/" className="btn-back-home">← 返回首页</Link>
      </div>
    </div>
  );
};

export default Housekeeping;

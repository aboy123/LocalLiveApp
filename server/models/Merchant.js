const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, '商家名称是必填项'],
    trim: true
  },
  category: { 
    type: String, 
    required: [true, '分类是必填项'],
    index: true
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5
  },
  reviews: { 
    type: Number, 
    default: 0 
  },
  address: { 
    type: String,
    trim: true
  },
  phone: { 
    type: String,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  image: { 
    type: String,
    default: ''
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  businessHours: { 
    type: String,
    trim: true
  },
  minPrice: { 
    type: Number,
    default: 0
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 索引优化查询性能
merchantSchema.index({ name: 'text', description: 'text', tags: 'text' });
merchantSchema.index({ category: 1, rating: -1 });

// 更新updatedAt字段
merchantSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Merchant', merchantSchema);

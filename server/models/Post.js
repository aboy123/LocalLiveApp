const mongoose = require('mongoose');

// 评论子文档Schema
const commentSchema = new mongoose.Schema({
  author: { 
    type: String, 
    required: [true, '评论作者是必填项']
  },
  content: { 
    type: String, 
    required: [true, '评论内容是必填项'],
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 帖子主Schema
const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, '标题是必填项'],
    trim: true,
    maxlength: [200, '标题不能超过200个字符']
  },
  content: { 
    type: String, 
    required: [true, '内容是必填项'],
    trim: true
  },
  author: { 
    type: String, 
    required: [true, '作者是必填项'],
    trim: true
  },
  category: { 
    type: String, 
    required: [true, '分类是必填项'],
    index: true
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  likes: { 
    type: Number, 
    default: 0,
    min: 0
  },
  views: { 
    type: Number, 
    default: 0,
    min: 0
  },
  comments: [commentSchema],
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// 索引优化查询性能
postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ category: 1, createdAt: -1 });
postSchema.index({ likes: -1 });

// 更新updatedAt字段
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 虚拟字段：评论数量
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// 确保虚拟字段在JSON输出中
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);

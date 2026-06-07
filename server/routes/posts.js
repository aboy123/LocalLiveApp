const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    获取所有帖子
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20, sortBy = 'createdAt' } = req.query;
    
    let query = {};

    // 按分类筛选
    if (category && category !== 'all') {
      query.category = category;
    }

    // 搜索功能
    if (search) {
      query.$text = { $search: search };
    }

    // 排序
    let sortOption = {};
    switch (sortBy) {
      case 'likes':
        sortOption = { likes: -1 };
        break;
      case 'views':
        sortOption = { views: -1 };
        break;
      case 'createdAt':
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // 分页
    const skip = (page - 1) * limit;
    
    const posts = await Post.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: posts
    });
  } catch (error) {
    console.error('获取帖子列表错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    根据ID获取帖子详情
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    // 增加浏览量
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('获取帖子详情错误:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: '帖子不存在' });
    }
    
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    创建新帖子
// @route   POST /api/posts
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    // 验证必填字段
    if (!title || !content || !category) {
      return res.status(400).json({ message: '请提供标题、内容和分类' });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.name,
      category,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('创建帖子错误:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    更新帖子
// @route   PUT /api/posts/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    // 检查是否是作者
    if (post.author !== req.user.name) {
      return res.status(403).json({ message: '无权修改此帖子' });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('更新帖子错误:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    删除帖子
// @route   DELETE /api/posts/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    // 检查是否是作者
    if (post.author !== req.user.name) {
      return res.status(403).json({ message: '无权删除此帖子' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: '帖子已删除'
    });
  } catch (error) {
    console.error('删除帖子错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    点赞帖子
// @route   POST /api/posts/:id/like
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    post.likes += 1;
    await post.save();

    res.json({
      success: true,
      likes: post.likes
    });
  } catch (error) {
    console.error('点赞错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    添加评论
// @route   POST /api/posts/:id/comments
// @access  Public
router.post('/:id/comments', async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!author || !content) {
      return res.status(400).json({ message: '请提供作者和评论内容' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    const comment = {
      author,
      content
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({
      success: true,
      data: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    console.error('添加评论错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    删除评论
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Public
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    const comment = post.comments.id(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({ message: '评论不存在' });
    }

    comment.remove();
    await post.save();

    res.json({
      success: true,
      message: '评论已删除'
    });
  } catch (error) {
    console.error('删除评论错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    搜索帖子
// @route   GET /api/posts/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: '请提供搜索关键词' });
    }

    const posts = await Post.find({
      $text: { $search: keyword }
    })
    .sort({ createdAt: -1 })
    .select('-__v');

    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('搜索帖子错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

module.exports = router;

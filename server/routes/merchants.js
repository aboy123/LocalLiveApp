const express = require('express');
const Merchant = require('../models/Merchant');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    获取所有商家
// @route   GET /api/merchants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    
    let query = { isActive: true };

    // 按分类筛选
    if (category && category !== 'all') {
      query.category = category;
    }

    // 搜索功能
    if (search) {
      query.$text = { $search: search };
    }

    // 分页
    const skip = (page - 1) * limit;
    
    const merchants = await Merchant.find(query)
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Merchant.countDocuments(query);

    res.json({
      success: true,
      count: merchants.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: merchants
    });
  } catch (error) {
    console.error('获取商家列表错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    根据ID获取商家详情
// @route   GET /api/merchants/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if (!merchant) {
      return res.status(404).json({ message: '商家不存在' });
    }

    res.json({
      success: true,
      data: merchant
    });
  } catch (error) {
    console.error('获取商家详情错误:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: '商家不存在' });
    }
    
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    创建新商家
// @route   POST /api/merchants
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      category,
      address,
      phone,
      description,
      image,
      tags,
      businessHours,
      minPrice,
      location
    } = req.body;

    // 验证必填字段
    if (!name || !category) {
      return res.status(400).json({ message: '请提供商家名称和分类' });
    }

    const merchant = await Merchant.create({
      name,
      category,
      address,
      phone,
      description,
      image,
      tags,
      businessHours,
      minPrice,
      location
    });

    res.status(201).json({
      success: true,
      data: merchant
    });
  } catch (error) {
    console.error('创建商家错误:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    更新商家信息
// @route   PUT /api/merchants/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let merchant = await Merchant.findById(req.params.id);

    if (!merchant) {
      return res.status(404).json({ message: '商家不存在' });
    }

    merchant = await Merchant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: merchant
    });
  } catch (error) {
    console.error('更新商家错误:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    删除商家
// @route   DELETE /api/merchants/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if (!merchant) {
      return res.status(404).json({ message: '商家不存在' });
    }

    await Merchant.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: '商家已删除'
    });
  } catch (error) {
    console.error('删除商家错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

// @desc    搜索商家
// @route   GET /api/merchants/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: '请提供搜索关键词' });
    }

    const merchants = await Merchant.find({
      $text: { $search: keyword },
      isActive: true
    }).sort({ rating: -1 });

    res.json({
      success: true,
      count: merchants.length,
      data: merchants
    });
  } catch (error) {
    console.error('搜索商家错误:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
});

module.exports = router;

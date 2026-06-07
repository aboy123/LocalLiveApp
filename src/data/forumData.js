// 社区论坛数据管理
import apiService from '../services/api';

// 帖子分类
export const postCategories = [
  { id: 'all', name: '全部', icon: '📋' },
  { id: 'life', name: '生活分享', icon: '🌟' },
  { id: 'advice', name: '求助建议', icon: '❓' },
  { id: 'experience', name: '经验分享', icon: '💡' },
  { id: 'chat', name: '闲聊灌水', icon: '💬' },
];

// 初始帖子数据
const initialPosts = [
  {
    id: 1,
    title: '今天去了一家超棒的咖啡店!',
    content: '分享一下我最近发现的宝藏咖啡店,环境超级好,咖啡也很香浓。推荐给大家!',
    author: '咖啡爱好者',
    category: 'life',
    tags: ['探店', '咖啡', '推荐'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 28,
    views: 156,
    comments: [
      {
        id: 1,
        author: '路人甲',
        content: '在哪里呀?求地址!',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
      },
      {
        id: 2,
        author: '咖啡控',
        content: '我也听说过这家,确实不错!',
        createdAt: new Date(Date.now() - 21600000).toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: '面试总是紧张怎么办?',
    content: '每次面试都特别紧张,发挥不好。大家有什么缓解紧张的方法吗?',
    author: '求职者小王',
    category: 'advice',
    tags: ['面试', '职场', '求助'],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 45,
    views: 289,
    comments: [
      {
        id: 1,
        author: 'HR姐姐',
        content: '深呼吸,把面试当成聊天就好。提前准备常见问题,多练习几次就不紧张了。',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
  {
    id: 3,
    title: '分享我的时间管理技巧',
    content: '用了番茄工作法后效率提升了很多,分享给大家:\n1. 25分钟专注工作\n2. 5分钟休息\n3. 每4个番茄钟长休息15分钟\n\n坚持一周就能看到效果!',
    author: '效率达人',
    category: 'experience',
    tags: ['时间管理', '效率', '技巧'],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    likes: 67,
    views: 423,
    comments: [],
  },
];

// 获取所有帖子
export const getPosts = async (params = {}) => {
  try {
    const response = await apiService.getPosts(params);
    return response.data || [];
  } catch (error) {
    console.error('获取帖子列表失败:', error);
    return [];
  }
};

// 根据分类获取帖子
export const getPostsByCategory = async (categoryId, sortBy = 'createdAt') => {
  try {
    const params = { category: categoryId, sortBy };
    const response = await apiService.getPosts(params);
    return response.data || [];
  } catch (error) {
    console.error('获取分类帖子失败:', error);
    return [];
  }
};

// 根据ID获取帖子详情
export const getPostById = async (id) => {
  try {
    const response = await apiService.getPostById(id);
    return response.data || null;
  } catch (error) {
    console.error('获取帖子详情失败:', error);
    return null;
  }
};

// 添加新帖子
export const addPost = async (postData) => {
  try {
    const response = await apiService.createPost(postData);
    return response.data;
  } catch (error) {
    console.error('添加帖子失败:', error);
    throw error;
  }
};

// 删除帖子
export const deletePost = async (postId) => {
  try {
    await apiService.deletePost(postId);
  } catch (error) {
    console.error('删除帖子失败:', error);
    throw error;
  }
};

// 点赞帖子
export const likePost = async (postId) => {
  try {
    const response = await apiService.likePost(postId);
    return response.likes;
  } catch (error) {
    console.error('点赞失败:', error);
    return 0;
  }
};

// 添加评论
export const addComment = async (postId, commentData) => {
  try {
    const response = await apiService.addComment(postId, commentData);
    return response.data;
  } catch (error) {
    console.error('添加评论失败:', error);
    return null;
  }
};

// 删除评论
export const deleteComment = async (postId, commentId) => {
  try {
    await apiService.deleteComment(postId, commentId);
  } catch (error) {
    console.error('删除评论失败:', error);
    throw error;
  }
};

// 搜索帖子
export const searchPosts = async (keyword) => {
  try {
    if (!keyword) {
      return await getPosts();
    }
    const response = await apiService.searchPosts(keyword);
    return response.data || [];
  } catch (error) {
    console.error('搜索帖子失败:', error);
    return [];
  }
};

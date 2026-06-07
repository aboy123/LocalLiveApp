const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // 获取请求头
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // 通用请求方法
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '请求失败');
      }

      return data;
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  }

  // ==================== 认证相关API ====================

  // 用户登录
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // 用户注册
  async register(name, email, password, phone) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone }),
    });
  }

  // 获取当前用户信息
  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // 更新用户资料
  async updateProfile(userData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // ==================== 商家相关API ====================

  // 获取所有商家
  async getMerchants(params = {}) {
    const { category, search, page = 1, limit = 20 } = params;
    const queryParams = new URLSearchParams();
    
    if (category) queryParams.append('category', category);
    if (search) queryParams.append('search', search);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);

    const queryString = queryParams.toString();
    return this.request(`/merchants${queryString ? '?' + queryString : ''}`);
  }

  // 根据ID获取商家详情
  async getMerchantById(id) {
    return this.request(`/merchants/${id}`);
  }

  // 创建新商家
  async createMerchant(merchantData) {
    return this.request('/merchants', {
      method: 'POST',
      body: JSON.stringify(merchantData),
    });
  }

  // 更新商家信息
  async updateMerchant(id, merchantData) {
    return this.request(`/merchants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(merchantData),
    });
  }

  // 删除商家
  async deleteMerchant(id) {
    return this.request(`/merchants/${id}`, {
      method: 'DELETE',
    });
  }

  // 搜索商家
  async searchMerchants(keyword) {
    return this.request(`/merchants/search?keyword=${encodeURIComponent(keyword)}`);
  }

  // ==================== 论坛相关API ====================

  // 获取所有帖子
  async getPosts(params = {}) {
    const { category, search, page = 1, limit = 20, sortBy = 'createdAt' } = params;
    const queryParams = new URLSearchParams();
    
    if (category) queryParams.append('category', category);
    if (search) queryParams.append('search', search);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (sortBy) queryParams.append('sortBy', sortBy);

    const queryString = queryParams.toString();
    return this.request(`/posts${queryString ? '?' + queryString : ''}`);
  }

  // 根据ID获取帖子详情
  async getPostById(id) {
    return this.request(`/posts/${id}`);
  }

  // 创建新帖子
  async createPost(postData) {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  // 更新帖子
  async updatePost(id, postData) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  // 删除帖子
  async deletePost(id) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // 点赞帖子
  async likePost(id) {
    return this.request(`/posts/${id}/like`, {
      method: 'POST',
    });
  }

  // 添加评论
  async addComment(postId, commentData) {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  // 删除评论
  async deleteComment(postId, commentId) {
    return this.request(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // 搜索帖子
  async searchPosts(keyword) {
    return this.request(`/posts/search?keyword=${encodeURIComponent(keyword)}`);
  }
}

export default new ApiService();

// 本地生活服务数据管理
import apiService from '../services/api';

// 分类列表
export const categories = [
  { id: 'housekeeping', name: '家政', icon: '🧹', color: '#ff6b6b' },
  { id: 'chat', name: '聊天', icon: '💬', color: '#4ecdc4' },
];

// 获取所有商家
export const getMerchants = async () => {
  try {
    const response = await apiService.getMerchants();
    return response.data || [];
  } catch (error) {
    console.error('获取商家列表失败:', error);
    // 如果API调用失败，返回空数组
    return [];
  }
};

// 根据分类获取商家
export const getMerchantsByCategory = async (categoryId) => {
  try {
    const response = await apiService.getMerchants({ category: categoryId });
    return response.data || [];
  } catch (error) {
    console.error('获取分类商家失败:', error);
    return [];
  }
};

// 根据ID获取商家详情
export const getMerchantById = async (id) => {
  try {
    const response = await apiService.getMerchantById(id);
    return response.data || null;
  } catch (error) {
    console.error('获取商家详情失败:', error);
    return null;
  }
};

// 搜索商家
export const searchMerchants = async (keyword) => {
  try {
    if (!keyword) {
      return await getMerchants();
    }
    const response = await apiService.searchMerchants(keyword);
    return response.data || [];
  } catch (error) {
    console.error('搜索商家失败:', error);
    return [];
  }
};

// 添加新商家
export const addMerchant = async (merchant) => {
  try {
    const response = await apiService.createMerchant(merchant);
    return response.data;
  } catch (error) {
    console.error('添加商家失败:', error);
    throw error;
  }
};

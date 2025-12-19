// 模拟数据生成工具
export interface MockDataItem {
  id: string;
  name: string;
  status: string;
  createTime: number; // 改为时间戳
  amount: number;
}

export const generateMockData = (count = 10): MockDataItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index + 1}`,
    name: `项目 ${index + 1}`,
    status: index % 2 === 0 ? '启用' : '禁用',
    createTime: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000, // 生成时间戳
    amount: Math.floor(Math.random() * 10000) + 100, // 生成100-10099之间的随机金额
  }));
};

export const mockSearchApi = (params: {
  [key: string]: any;
  page: { pageNo: number; pageSize: number };
}): Promise<{ data: MockDataItem[]; page: { total: number; pageNo: number; pageSize: number } }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = generateMockData(50);
      const filteredData = mockData.filter((item) => {
        if (params.name && !item.name.includes(params.name)) {
          return false;
        }
        if (params.status && item.status !== params.status) {
          return false;
        }
        return true;
      });

      const { pageNo, pageSize } = params.page;
      const start = (pageNo - 1) * pageSize;
      const end = start + pageSize;

      resolve({
        data: filteredData.slice(start, end),
        page: { total: filteredData.length, pageNo, pageSize },
      });
    }, 500);
  });
};
import { Filter, SearchTable, useSearchTable } from '@finfe/beetle-ui';
import React, { useMemo } from 'react';
import { mockSearchApi } from './utils/mockData';
import { renderFormItems } from './utils/renderFormItem';

// 时间格式化工具函数
const formatTimestamp = (timestamp: number | string) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
};

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: '名称' },
  { 
    accessorKey: 'status', 
    header: '状态',
    cell: ({ getValue }: any) => {
      const status = getValue();
      return (
        <span style={{ 
          color: status === '启用' ? '#52c41a' : '#ff4d4f',
          fontWeight: 'bold' 
        }}>
          {status}
        </span>
      );
    }
  },
  { 
    accessorKey: 'createTime', 
    header: '创建时间',
    cell: ({ getValue }: any) => {
      const timestamp = getValue();
      return formatTimestamp(timestamp);
    }
  },
];


export default function SearchTableBase() {
  const { config } = useSearchTable({
    onSearch: async (params) => {
      const res = await mockSearchApi({
        ...params.filters,
        page: params.pagination,
      });
      return {
        data: res.data,
        pagination: res.page,
      };
    },
  });
  

  const formItems = useMemo(() => renderFormItems(), []);

  return (
    <SearchTable config={config}>
      <Filter.Root>
        <Filter.Panel>
          {formItems}
          <Filter.ButtonArea />
        </Filter.Panel>
      </Filter.Root>
      <SearchTable.Table columns={columns} />
    </SearchTable>
  );
}
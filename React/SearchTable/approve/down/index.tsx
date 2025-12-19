import { Filter, SearchTable, useSearchTable } from '@finfe/beetle-ui';
import { transformSearchParams } from '@react/pages/approve/utils/searchParamsTransform';
import { queryOperateExpenses } from '@tmc/business/src/apis';
import { GetApproveExpenseListParams } from '@tmc/business/src/apis/approve';
import { SortType2ExpenseList } from '@tmc/business/src/apis/home';
import { ExpenseListQueryType } from '@tmc/business/src/constance/approval';
import { useMemo, useEffect } from 'react';
import { useTableFilters } from '../component/TableFilter';
import columns from '../component/tableColumns';

export default function SearchTableBase() {
  const { filters, selectedStaff, formInstanceRef, setSearchCommand } = useTableFilters();

  const { config, commands } = useSearchTable({
    onSearch: async (params) => {
      // 参数格式化：MIS、日期
      const transformedFilters = transformSearchParams(params.filters, {
        selectedStaff,
      });

      const queryParams: GetApproveExpenseListParams = {
        expenseCatalogList: [],
        expenseNo: '',
        receiveStatusList: [],
        searchTagList: [],
        sortQuery: { descending: true, sortField: 'workflowUpdateTime' },
        sortType: SortType2ExpenseList.Default,
        submitTimeFrom: '',
        submitTimeTo: '',
        type: ExpenseListQueryType.AUDITED,
        workflowStatusList: [],
        ...transformedFilters,
        pageNo: params.pagination.pageNo,
        pageSize: params.pagination.pageSize,
      };
      const res = await queryOperateExpenses(queryParams);
      return {
        data: res.data.result,
        pagination: {
          pageNo: res.data.pageNo,
          pageSize: res.data.pageSize,
          total: res.data.totalCount,
        },
      };
    },
  });

  // 将搜索命令传递给过滤器Hook
  useEffect(() => {
    if (commands?.search) {
      setSearchCommand(commands.search);
    }
  }, [commands?.search, setSearchCommand]);

  const formItems = useMemo(() => filters, [filters]); // 响应MIS号搜索结果

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

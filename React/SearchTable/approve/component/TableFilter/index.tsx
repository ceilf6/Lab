import { BeFormItem, BeMInput } from '@finfe/beetle-ui';
import { RangePicker, Select } from '@finfe/materiel-mtd';
import { BudgetSearch } from '@react/components/BudgetSearch';
import { StaffSearch } from '@react/pages/detail/components/Fee/AtomFormItem/StaffSearch';
import { GetApproveExpenseListParams } from '@tmc/business';
import { StaffModel } from '@tmc/business/src/apis/staff';
import {
  ExpenseCatalog,
  ExpenseCategoryListMap,
  ReceiveStatusListMap,
  SearchTagListMap,
} from '@tmc/business/src/constance/approval';
import { ReceiveStatus } from '@tmc/business/src/types/expenseItem';
import { useDebounceFn } from 'ahooks';
import React, { useMemo, useRef, useState } from 'react';

// export interface TableFilteProps {
//     onChange: (params: GetApproveExpenseListParams) => void
// }

// export  const TableFilter = (props: TableFilteProps) => {
//     const [filters, setFiilters] = useState({})

//     return <>
//      <BeFormItem fieldName="expenseNo" key="expenseNo" label="单据号">
//         <BeMInput
//             placeholder="请输入单据号"
//             onChange={(value) => setFiilters({...filters, expenseNo: value})}
//         />
//       </BeFormItem>,

//     </>
// }

/**
 * 筛选器组件Hook
 */
export const useTableFilters = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffModel | null>(null);

  // 用于存储表单实例的引用
  const formInstanceRef = useRef<any>(null);
  
  // 用于存储搜索命令的引用
  const searchCommandRef = useRef<((formValues?: any) => Promise<any>) | null>(null);

  // 设置搜索命令的方法
  const setSearchCommand = (searchFn: (formValues?: any) => Promise<any>) => {
    searchCommandRef.current = searchFn;
  };

  // 触发自动搜索的方法
  const triggerAutoSearch = () => {
    if (searchCommandRef.current) {
      searchCommandRef.current();
    }
  };

  // 使用防抖的自动搜索
  const { run: debouncedAutoSearch } = useDebounceFn(
    triggerAutoSearch,
    { wait: 500 } // 500ms 防抖延迟
  );

  // 单据类型枚举选项
  const expenseCategoryOptions = useMemo(() => {
    return Object.entries(ExpenseCategoryListMap).map(([value, label]) => ({
      label,
      value: Number(value),
    }));
  }, []);

  const searchTagListOptions = useMemo(() => {
    return Object.entries(SearchTagListMap).map(([value, label]) => ({
      label,
      value: Number(value),
    }));
  }, []);

  const ReceiveStatusListOptions = useMemo(() => {
    return Object.entries(ReceiveStatusListMap).map(([value, label]) => ({
      label,
      value: Number(value),
    }));
  }, []);

  const filters = useMemo(
    () => [
      <BeFormItem fieldName="expenseNo" key="expenseNo" label="单据号">
        <BeMInput 
          placeholder="请输入单据号" 
          onChange={() => debouncedAutoSearch()}
        />
      </BeFormItem>,
      <BeFormItem
        fieldName="expenseCatalogList"
        key="expenseCatalogList"
        label="单据类型"
      >
        <Select
          clearable
          fieldNames={{ label: 'label', value: 'value' }}
          multiple
          options={expenseCategoryOptions}
          placeholder="请选择单据类型"
          onChange={() => debouncedAutoSearch()}
        />
      </BeFormItem>,
      <BeFormItem
        fieldName="proposerStaffId"
        key="proposerStaffId"
        label="申请人"
      >
        <StaffSearch.Single
          clearable={true}
          onChange={(staff) => {
            setSelectedStaff(staff);
            // 如果有表单实例，设置隐藏字段的值
            if (formInstanceRef.current && staff) {
              formInstanceRef.current.setFieldValue(
                'proposerStaffId',
                staff.staffId
              );
            }
            // 触发自动搜索
            debouncedAutoSearch();
          }}
          placeholder="请输入MIS号或姓名搜索"
          value={selectedStaff}
        />
      </BeFormItem>,
      <BeFormItem fieldName="budgetCode" key="budgetCode" label="预算项目">
        <BudgetSearch 
          placeholder="请输入预算项目" 
          onChange={() => debouncedAutoSearch()}
        />
      </BeFormItem>,
      <BeFormItem
        fieldName="submitTimeRange"
        key="submitTimeRange"
        label="提交时间"
      >
        <RangePicker
          clearable
          format="YYYY-MM-DD"
          placeholder={['开始日期', '结束日期']}
          single
          onChange={() => debouncedAutoSearch()}
        />
      </BeFormItem>,
      <BeFormItem
        fieldName="searchTagList"
        key="searchTagList"
        label="单据标签"
      >
        <Select
          clearable
          fieldNames={{ label: 'label', value: 'value' }}
          multiple
          options={searchTagListOptions}
          placeholder="请选择单据标签"
          onChange={() => debouncedAutoSearch()}
        />
      </BeFormItem>,
      <BeFormItem
        fieldName="receiveStatusList"
        key="receiveStatusList"
        label="收单状态"
      >
        <Select
          clearable
          fieldNames={{ label: 'label', value: 'value' }}
          multiple
          options={ReceiveStatusListOptions}
          placeholder="请选择收单状态"
          onChange={() => debouncedAutoSearch()}
        />
      </BeFormItem>,
    ],
    [
      selectedStaff,
      expenseCategoryOptions,
      searchTagListOptions,
      ReceiveStatusListOptions,
      debouncedAutoSearch,
    ]
  );

  return {
    filters,
    selectedStaff,
    setSelectedStaff,
    formInstanceRef,
    setSearchCommand,
  };
};

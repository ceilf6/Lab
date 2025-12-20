/*
🔑 重要说明：onSearch 回调中的 params.filters 自动数据收集机制

是的！params.filters 会自动从输入框中获取数据，具体机制如下：

1. 框架扫描所有 <BeFormItem fieldName="xxx"> 组件
2. 当点击搜索按钮时，自动读取每个输入框的当前值  
3. 按照 fieldName 作为键名，组装成 filters 对象
4. 连同分页信息一起传递给 onSearch 回调

示例数据流：
┌─────────────────────────────────────────────────────────────┐
│ 用户操作                                                     │
├─────────────────────────────────────────────────────────────┤
│ 在 fieldName="name" 的输入框输入: "测试项目"                  │
│ 在 fieldName="status" 的输入框输入: "启用"                   │
│ 点击搜索按钮                                                 │
└─────────────────────────────────────────────────────────────┘
                           ⬇️
┌─────────────────────────────────────────────────────────────┐
│ 框架自动收集并传递给 onSearch                                │
├─────────────────────────────────────────────────────────────┤
│ params = {                                                  │
│   filters: {                                               │
│     name: "测试项目",                                        │
│     status: "启用"                                          │
│   },                                                        │
│   pagination: { pageNo: 1, pageSize: 10 }                  │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘

关键点：
- fieldName 决定了数据在 params.filters 中的键名
- 空值的输入框通常不会包含在 filters 中
- fieldName 必须与 API 期望的字段名一致
*/

import {
  BeFormItem,
  BeMInput,
  BeMInputNumber,
  BeSearchTable,
  BeSpace,
  createColumnHelper,
  Filter,
  TableAction,
  useRowEdit,
  useSearchTable,
} from '@finfe/beetle-ui';
import { message, Modal } from '@ss/mtd-react3';
import React, { useMemo } from 'react';
import { delay } from './utils/delay';
import { MockDataItem, mockSearchApi } from './utils/mockRowEditData';

interface FilterForm {
  name?: string;
  status?: string;
}

const columnHelper = createColumnHelper<MockDataItem>();

export default function SearchTableWithActions() {
  // 1. 声明行编辑逻辑
  const rowEditProps = useRowEdit<MockDataItem>({
    getRowId: (row) => row.id,
    // 保存数据
    onSave: async (value, oldValue) => {
      console.log('=== 保存编辑', value, oldValue);
      // 模拟请求延迟
      await delay(500);

      // 根据不同的case实现不同的保存逻辑
      if (value.id === 'item-3') {
        // Case3: 保存失败
        message.error({ message: '保存失败' });
        throw new Error('保存失败');
      } else {
        // Case2: 保存成功
        message.success({ message: '保存成功' });
      }
    },
    // 取消前弹窗提示
    onCancel: async () => {
      return new Promise((resolve, reject) => {
        Modal.confirm({
          message: '结果不会被保存，确认取消吗？',
          onOk: resolve,
          onCancel: reject,
        });
      });
    },
    // 编辑支持前置校验
    onEdit: async (row) => {
      if (row.id === 'item-1') {
        await delay(500);
        message.error({ message: '暂不支持编辑' });
        throw new Error('暂不支持编辑');
      }
      if (row.id === 'item-4') {
        message.info({ message: '进入联动编辑模式，修改原价或折扣将自动计算最终价格' });
      }
    },
    // UI定义，同tanstack table cell定义，支持类型推导
    editUI: {
      name: () => <BeMInput />,
      // 原价输入框，当原价变化时自动计算最终价格
      originalPrice: (info) => (
        <BeMInputNumber
          min={0}
          controls={false}
          precision={2}
          onChange={(value) => {
            const currValues = info.row.rowEdit?.getCurrValues();
            if (currValues && value !== undefined) {
              // 使用当前折扣计算新的最终价格
              const newFinalPrice = value * currValues.discount;
              // 使用便捷的setRowValue方法更新最终价格
              info.row.rowEdit?.setRowValue({ finalPrice: newFinalPrice });
            }
          }}
        />
      ),
      // 折扣输入框，当折扣变化时自动计算最终价格
      discount: (info) => (
        <BeMInputNumber
          min={0}
          max={1}
          step={0.01}
          precision={2}
          controls={false}
          onChange={(value) => {
            const currValues = info.row.rowEdit?.getCurrValues();
            if (currValues && value !== undefined) {
              // 使用当前原价计算新的最终价格
              const newFinalPrice = currValues.originalPrice * value;
              // 使用便捷的setRowValue方法更新最终价格
              info.row.rowEdit?.setRowValue({ finalPrice: newFinalPrice });
            }
          }}
        />
      ),
      // 最终价格显示框（只读），展示联动计算结果
      finalPrice: (info) => {
        const currValues = info.row.rowEdit?.getCurrValues();
        const rawValues = info.row.rowEdit?.getRawValues();

        // 比较当前值和原始值，如果有变化则高亮显示
        const hasChanged = currValues && rawValues && currValues.finalPrice !== rawValues.finalPrice;

        return (
          <BeMInputNumber
            readOnly
            precision={2}
            controls={false}
            style={{
              backgroundColor: hasChanged ? '#fff7e6' : undefined,
              borderColor: hasChanged ? '#ffa940' : undefined,
            }}
          />
        );
      },
    },
  });

  const { config } = useSearchTable<FilterForm, MockDataItem>({
    rowEdit: rowEditProps,
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

  // 定义包含操作列的表格列
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        size: 100,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: '名称',
        size: 150,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: '状态',
        size: 80,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('createTime', {
        header: '创建时间',
        size: 100,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('originalPrice', {
        header: '原价',
        size: 90,
        cell: (info) => `¥${info.getValue()}`,
      }),
      columnHelper.accessor('discount', {
        header: '折扣',
        size: 90,
        cell: (info) => `${(info.getValue() * 100).toFixed(0)}%`,
      }),
      columnHelper.accessor('finalPrice', {
        header: '最终价格',
        size: 90,
        cell: (info) => {
          const currValues = info.row.rowEdit?.getCurrValues();
          const rawValues = info.row.rowEdit?.getRawValues();

          // 如果在编辑状态且价格有变化，显示高亮样式
          const isEditing = info.row.rowEdit?.isEditing;
          const hasChanged = isEditing && currValues && rawValues && currValues.finalPrice !== rawValues.finalPrice;

          return (
            <span
              style={{
                color: hasChanged ? '#fa880fff' : undefined,
                fontWeight: hasChanged ? 'bold' : undefined,
              }}
            >
              ¥{info.getValue()}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: '操作',
        size: 200,
        meta: { style: { maxWidth: 'max-content' } },
        cell: (info) => (
          <BeSpace>
            <TableAction.EditRowActions info={info} />
            {/* 会自动注入edit状态 */}
            {!info.row.rowEdit?.isEditing && <TableAction.Delete row={info.row.original} />}
          </BeSpace>
        ),
      }),
    ],
    [],
  );

  const formItems = useMemo(
    () => [
      <BeFormItem key="name" fieldName="name" label="名称">
        <BeMInput placeholder="请输入名称" />
      </BeFormItem>,
      <BeFormItem key="status" fieldName="status" label="状态">
        <BeMInput placeholder="请输入状态" />
      </BeFormItem>,
    ],
    [],
  );

  return (
    <div>
      <BeSearchTable config={config}>
        <Filter.Root>
          <Filter.Panel>
            {formItems}
            <Filter.ButtonArea />
          </Filter.Panel>
        </Filter.Root>
        <BeSearchTable.Table columns={columns} initialState={{ columnPinning: { right: ['actions'] } }} />
      </BeSearchTable>
    </div>
  );
}
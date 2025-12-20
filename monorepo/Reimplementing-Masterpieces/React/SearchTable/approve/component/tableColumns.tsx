import { MoneyRead } from '@react/components/Money';
import { NormalListResponseResult } from '@tmc/business';
import { formatDateTime } from '@tmc/business/src/logic/useTime';
import ApprovalStatusTag from './ApprovalStatusTag';
import ReceiveStatusTag from './ReceiveStatusTag';

interface CellContext {
  getValue: () => any;
  row: {
    original: NormalListResponseResult;
  };
}

interface RowOnlyContext {
  row: {
    original: NormalListResponseResult;
  };
}

interface GetValueOnlyContext {
  getValue: () => any;
}

const columns = [
  {
    accessorKey: 'expenseNo',
    header: '单据号',
    cell: ({ getValue, row }: CellContext) => {
      const expenseNo = getValue();
      const detail = row.original;

      const handleToDetail = () => {
        const url = `/smart/detail?expenseNo=${expenseNo}`;
        window.open(url, '_blank');
      };

      return (
        <span
          onClick={handleToDetail}
          style={{
            color: '#1890ff',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {expenseNo}
        </span>
      );
    },
  },
  { accessorKey: 'expenseCatalogDesc', header: '单据类型' },
  {
    accessorKey: 'proposerStaffName',
    header: '申请人',
    cell: ({ row }: RowOnlyContext) => {
      const detail = row.original;
      const formattedName = `${detail.proposerStaffName}/${detail.proposerStaffSign}`;
      return formattedName;
    },
  },
  {
    accessorKey: 'submitTime',
    header: '申请日期',
    cell: ({ getValue }: GetValueOnlyContext) => {
      const submitTime = getValue();
      return formatDateTime(submitTime, 'YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    accessorKey: 'receiveStatus',
    header: '收单状态',
    cell: ({ getValue }: GetValueOnlyContext) => {
      const receiveStatus = getValue();
      return <ReceiveStatusTag receiveStatus={receiveStatus} />;
    },
  },
  {
    accessorKey: 'expenseTotalAmount',
    header: '金额',
    cell: ({ getValue, row }: CellContext) => {
      const amount = getValue();
      const detail = row.original;
      const currency = detail.expenseCurrency || 'CNY';
      return (
        <span style={{ textAlign: 'right', display: 'block' }}>
          <MoneyRead currency={currency} value={amount} />
        </span>
      );
    },
  },
  {
    accessorKey: 'workflowStatus',
    header: '审批结果',
    cell: ({ getValue }: GetValueOnlyContext) => {
      const workflowStatus = getValue();
      return <ApprovalStatusTag workflowStatus={workflowStatus} />;
    },
  },
];

export default columns;

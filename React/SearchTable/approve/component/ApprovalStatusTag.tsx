import { WorkflowStatus } from '@tmc/business/src/constance/approval';
import React from 'react';

interface ApprovalStatusTagProps {
  workflowStatus: WorkflowStatus;
}

const ApprovalStatusTag: React.FC<ApprovalStatusTagProps> = ({
  workflowStatus,
}) => {
  const getStatusConfig = () => {
    switch (workflowStatus) {
      case WorkflowStatus.DRAFT:
        return { text: '草稿', color: '#666', backgroundColor: '#f5f5f5' };
      case WorkflowStatus.AUDITING:
        return { text: '审核中', color: '#1890ff', backgroundColor: '#e6f7ff' };
      case WorkflowStatus.WITHDRAW:
        return { text: '已撤回', color: '#666', backgroundColor: '#f5f5f5' };
      case WorkflowStatus.REJECTED:
        return { text: '已驳回', color: '#ff4d4f', backgroundColor: '#fff2f0' };
      case WorkflowStatus.PAYING:
        return { text: '支付中', color: '#1890ff', backgroundColor: '#e6f7ff' };
      case WorkflowStatus.WAITING_RECEIVE_PAPER_EXPENSE:
        return {
          text: '等待收单',
          color: '#1890ff',
          backgroundColor: '#e6f7ff',
        };
      case WorkflowStatus.CLOSED:
        return { text: '已完成', color: '#52c41a', backgroundColor: '#f6ffed' };
      default:
        return { text: '未知状态', color: '#666', backgroundColor: '#f5f5f5' };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        color: config.color,
        backgroundColor: config.backgroundColor,
        border: `1px solid ${config.color}`,
      }}
    >
      {config.text}
    </span>
  );
};

export default ApprovalStatusTag;

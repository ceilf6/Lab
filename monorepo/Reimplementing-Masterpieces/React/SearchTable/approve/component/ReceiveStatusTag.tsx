import { ReceiveStatus } from '@tmc/business/src/types/expenseItem';

const ReceiveStatusTag: React.FC<{ receiveStatus: ReceiveStatus }> = ({
  receiveStatus,
}) => {
  const getStatusConfig = () => {
    switch (receiveStatus) {
      case ReceiveStatus.UNRECEIVED:
        return { text: '未收单', color: '#666', backgroundColor: '#f5f5f5' };
      case ReceiveStatus.REJECTED:
        return { text: '已退单', color: '#ff4d4f', backgroundColor: '#fff2f0' };
      case ReceiveStatus.AUTO_HANG_UP:
        return { text: '自动暂挂', color: '#666', backgroundColor: '#f5f5f5' };
      case ReceiveStatus.HANDLE_HANG_UP:
        return { text: '手动暂挂', color: '#666', backgroundColor: '#f5f5f5' };
      case ReceiveStatus.RECEIVED:
        return { text: '已收单', color: '#52c41a', backgroundColor: '#f6ffed' };
      case ReceiveStatus.NOT_NEED:
        return {
          text: '无需收单',
          color: '#52c41a',
          backgroundColor: '#f6ffed',
        };
      default:
        return { text: '', color: '#666', backgroundColor: '#f5f5f5' };
    }
  };

  const config = getStatusConfig();

  if (!config.text) return <div></div>;

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

export default ReceiveStatusTag;

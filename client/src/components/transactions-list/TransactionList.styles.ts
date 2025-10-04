import styled from 'styled-components';
import { TxStatus } from '@/types';

export const TransactionListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

export const StatusText = styled.span<{
  $status: TxStatus;
}>`
  font-weight: 500;
  color: ${({ $status }) =>
    $status === TxStatus.Success ? 'green' : $status === TxStatus.Pending ? 'orange' : 'red'};
`;

export const TransactionTimestamp = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 4px;
`;

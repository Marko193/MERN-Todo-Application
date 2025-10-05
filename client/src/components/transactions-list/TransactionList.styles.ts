import styled, { css } from 'styled-components';
import { TxStatus } from '@/types';

const HashStyles = css`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

export const TransactionListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  div {
    display: flex;
    gap: 3px;
    align-items: center;
  }
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

export const HashLink = styled.a`
  ${HashStyles}
`;

export const SendAddress = styled.span`
  ${HashStyles}
`;

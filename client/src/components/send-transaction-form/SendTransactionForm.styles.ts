import styled from 'styled-components';

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  margin-right: 10px;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const SendTransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;

  @media (max-width: 720px) {
    align-items: start;
    flex-direction: column;
  }
`;

export const AddressInput = styled(Input)`
  width: 400px;
`;

export const AmountInput = styled(Input)`
  width: 150px;
`;

export const StatusBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const ErrorBlock = styled.div`
  color: red;
  margin-top: 5px;
`;

export const TxHash = styled.span`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

export const FormSection = styled.div`
  display: flex;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const StatusSection = styled.div``;

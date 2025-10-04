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

export const AddressInput = styled(Input)`
  width: 300px;
`;

export const AmountInput = styled(Input)`
  width: 100px;
`;

export const StatusBlock = styled.div`
  margin-top: 10px;
`;

export const ErrorBlock = styled.div`
  color: red;
  margin-top: 5px;
`;

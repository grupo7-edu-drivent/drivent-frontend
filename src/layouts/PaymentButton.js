/* eslint-disable no-console */
import styled from 'styled-components';

export default function PaymentButton({ subtitle, price, selected, onClick }) {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      <h4>{subtitle}</h4>
      <p>R$ {price}</p>
    </StyledButton >
  );
}

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 145px;
  width: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  background-color: ${props => props.selected ? '#FFEED2' : 'transparent'};
  :hover{
    background-color: #FFEED2;
    cursor: pointer;
  }
  h4{
    color: #454545;
    font-size: 16px;
  };
  p{
    color: #898989;
    font-size: 14px;
    margin-top: 7px;
  };
`;


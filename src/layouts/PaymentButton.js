import styled from 'styled-components';

export default function PaymentButton({ subtitle, price, selected }) {
  return (
    <StyledButton selected={selected}>
      <h4>{subtitle}</h4>
      <p>R$ {price}</p>
    </StyledButton>
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
  ${props => props.selected ? 'background-color:  #FFEED2;' : ''};
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

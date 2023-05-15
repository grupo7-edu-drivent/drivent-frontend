import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { HiCheckCircle } from 'react-icons/hi';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';

export default function CreditCard(props) {
  const { paymentType } = props;
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    success: false,
  });

  const [validation, setValidation] = useState({
    number: false,
    expiry: false,
    cvc: false,
    name: false,
  });

  const [showSuccessPayment, setShowSuccessPayment] = useState(false);

  const validateInput = (name, value) => {
    let valid = false;
    if (name === 'number') {
      if (/.{11,}$/.test(value)) {
        valid = true;
      }
    } else if (name === 'expiry') {
      if (/.{5,}$/.test(value)) {
        valid = true;
      }
    } else if (name === 'cvc') {
      if (/^\d{3,4}$/.test(value)) {
        valid = true;
      }
    } else if (name === 'name') {
      if (/.{4,}$/.test(value)) {
        valid = true;
      }
    }
    setValidation((prev) => ({ ...prev, [name]: valid }));
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'name') {
      let newValue = value.replace(/[^A-Za-z\s]/g, '').slice(0, 14);
      setState((prev) => ({ ...prev, [name]: newValue }));
    } else if (name === 'expiry') {
      let newValue = value.replace(/[^\d]/g, '');
      if (newValue.length > 4) {
        newValue = newValue.slice(0, 4);
      }
      if (newValue.length > 2) {
        newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
      }
      if (newValue.slice(0, 2) > 12) {
        newValue = `12/${newValue.slice(3)}`;
      }
      setState((prev) => ({ ...prev, [name]: newValue }));
    } else if (name === 'cvc') {
      let newValue = value.replace(/[^\d]/g, '');
      if (newValue.length > 3) {
        newValue = newValue.slice(0, 3);
      }
      setState((prev) => ({ ...prev, [name]: newValue }));
    } else {
      let newValue = value.replace(/\D/g, '');
      let groups = newValue.match(/.{1,4}/g);
      if (groups) {
        newValue = groups.join(' ');
      }
      if (newValue.length <= 20) {
        setState((prev) => ({ ...prev, [name]: newValue }));
      }
    }
    validateInput(name, value);
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handlePaymentButtonClick = () => {
    setShowSuccessPayment(true);
  };

  useEffect(() => {}, [paymentType]);

  return (
    <>
      <Main>
        <h1>Ingressos e pagamento</h1>
        <h2>Ingresso escolhido</h2>
        <StyledButton>
          <h4>{paymentType}</h4>
          <p>R$ {props.ticket.price}</p>
        </StyledButton>
        <h2>Pagamento</h2>
      </Main>
      {showSuccessPayment ? (
        <ContainerConfirmed>
          <HiCheckCircle size={40} color="#36B853" />
          <ContainerText>
            <h4 style={{ fontWeight: 'bold', margin: '5px 0' }}>Pagamento confirmado!</h4>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </ContainerText>
        </ContainerConfirmed>
      ) : (
        <>
          <ContainerCard>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
              success={state.success}
            />
            <Form>
              <input
                type="tel"
                name="number"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <DivInput>
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiration date"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </DivInput>
            </Form>
          </ContainerCard>
          <Button
            onClick={handlePaymentButtonClick}
            disabled={!validation.number || !validation.expiry || !validation.cvc || !validation.name}
          >
            FINALIZAR PAGAMENTO
          </Button>
        </>
      )}
    </>
  );
}

const Main = styled.div`
  h1 {
    font-size: 34px;
    color: #000000;
    margin-bottom: 40px;
  }
  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 20px;
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 290px;
  height: 108px;
  margin-top: 30px;
  margin-bottom: 30px;
  background: #ffeed2;
  border-radius: 20px;
  border-radius: 20px;
  h4 {
    color: #454545;
    font-size: 17px;
    margin-bottom: 5px;
  }
  p {
    color: #898989;
    font-size: 15px;
    margin-top: 7px;
  }
`;
const ContainerCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  margin-top: 30px;
  margin-bottom: 40px;
`;
const Form = styled.form`
  margin-left: 40px;
  margin-top: 10px;
  input {
    width: 300px;
    height: 45px;
    border-radius: 10px;
    border: 2px solid #e5e5e5;
    margin-bottom: 15px;
    padding-left: 10px;

    &:focus {
      outline: none;
    }
  }
`;
const DivInput = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  input {
    width: 140px;
  }
`;

const ContainerConfirmed = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

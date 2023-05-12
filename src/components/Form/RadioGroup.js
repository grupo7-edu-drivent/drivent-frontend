import { useState } from 'react';
import { ButtonsContainer } from '../../pages/Dashboard/Payment';
import PaymentButton from '../../layouts/PaymentButton';

export default function RadioGroup({ selectOptions, handleSelect }) {
  const [select, setSelect] = useState();

  const { options, valueKey } = selectOptions;

  function handleClick(selectedValue) {
    setSelect(selectedValue);
    handleSelect(selectedValue);
  }

  return (
    <ButtonsContainer>
      {options.map((option, idx) =>
        option[valueKey] === select ? (
          <PaymentButton
            price={option.price}
            subtitle={option.subtitle || `Opção ${idx}`}
            selected={true}
            onClick={() => handleClick(option[valueKey])}
          />
        ) : (
          <PaymentButton
            price={option.price}
            subtitle={option.subtitle || `Opção ${idx}`}
            selected={false}
            onClick={() => handleClick(option[valueKey])}
          />
        )
      )}
    </ButtonsContainer>
  );
}

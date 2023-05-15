import { useEffect } from 'react';
import styled from 'styled-components';

export default function TypeAccommodation({ types }) {
  const typesSet = new Set(types);
  let text = '';

  switch (true) {
  case typesSet.has(1) && typesSet.has(2) && typesSet.has(3):
    text = 'Single, Double e Triple';
    break;
  case typesSet.has(1) && typesSet.has(2) && !typesSet.has(3):
    text = 'Single e Double';
    break;
  case !typesSet.has(1) && typesSet.has(2) && typesSet.has(3):
    text = 'Double e Triple';
    break;
  case typesSet.has(1) && !typesSet.has(2) && typesSet.has(3):
    text = 'Single e Triple';
    break;
  case typesSet.has(1) && !typesSet.has(2) && !typesSet.has(3):
    text = 'Single';
    break;
  case !typesSet.has(1) && typesSet.has(2) && !typesSet.has(3):
    text = 'Double';
    break;
  case !typesSet.has(1) && !typesSet.has(2) && typesSet.has(3):
    text = 'Triple';
    break;
  default:
    text = 'No Room';
    break;
  }

  return <TextInfo>{text}</TextInfo>;
}

const TextInfo = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
  margin-bottom: 14px;
`;

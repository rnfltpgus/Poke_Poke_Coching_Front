import React from 'react';
import styled from 'styled-components';

import ModalWrapper from './ModalWrapper';

function ModalTerminate() {
  return (
    <ModalWrapper>
      <ModalContent>... 내용</ModalContent>
    </ModalWrapper>
  );
}

const ModalContent = styled.div`
  z-index: 100;
  position: relative;
  color: white;
  height: 80%;
`;

export default ModalTerminate;

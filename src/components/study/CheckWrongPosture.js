import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { conditionState } from '../../recoil/atom';
import Modal from '../modal/Modal';
import StudyWarningNotice from './StudyWarningNotice';

import styled from 'styled-components';

const CheckWrongPosture = () => {
  const [modalOn, setModalOn] = useState(false);
  const currentCondition = useRecoilValue(conditionState);

  const closeModal = () => {
    setModalOn(false);
  };

  useEffect(() => {
    if (currentCondition.warnings % 2 === 0) {
      closeModal();
    }

    if (currentCondition.warnings % 2 === 1) {
      setModalOn(true);
    }
  }, [currentCondition.warnings]);

  return (
    <CheckWrongPostureWrap>
      <div className='CheckWrongPosture-header'>CheckWrongPosture</div>
      <div>{currentCondition.warnings} 회</div>
      {modalOn && (
        <Modal
          backGroundColor={true}
          visible={modalOn}
          backGroundClosable={true}
          onClose={closeModal}>
          <StudyWarningNotice />
        </Modal>
      )}
    </CheckWrongPostureWrap>
  );
};

export default CheckWrongPosture;

const CheckWrongPostureWrap = styled.div`
  width: 95%;
  margin: 30px auto 10px auto;
  gap: 2rem;

  .CheckWrongPosture-header {
    background-color: #f17ca4;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;

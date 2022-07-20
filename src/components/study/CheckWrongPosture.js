import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { conditionState } from '../../recoil/atom';
import Modal from '../modal/Modal';
import StudyWarningNotice from '../modal/contextualmodal/StudyWarningNotice';

import styled from 'styled-components';

const CheckWrongPosture = () => {
  const [modalOn, setModalOn] = useState(false);
  const currentCondition = useRecoilValue(conditionState);

  useEffect(() => {
    if (currentCondition.warnings % 2 === 1) {
      setModalOn(true);
    }

    setTimeout(() => {
      closeModal();
    }, 700);
  }, [currentCondition.warnings]);

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <CheckWrongPostureWrap>
      <div className='check-wrong-posture-header'>Check Wrong Posture</div>
      <div className='warnings-count'>{currentCondition.warnings} 회</div>
      {modalOn && (
        <Modal
          visible={modalOn}
          backGroundClosable={true}
          onClose={closeModal}
          backGroundColor={'rgba(249, 60, 60, 0.6)'}>
          <StudyWarningNotice />
        </Modal>
      )}
    </CheckWrongPostureWrap>
  );
};

export default CheckWrongPosture;

const CheckWrongPostureWrap = styled.div`
  width: 95%;
  margin: 4vh auto 1vw auto;
  gap: 2rem;

  .check-wrong-posture-header {
    background-color: #f17ca4;
    color: #fff;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .warnings-count {
    margin-top: 2.5vh;
    font-size: 1.5rem;
  }
`;

import React, { useState } from 'react';
import Modal from '../components/Modal';

const MyPage = () => {
  const [modalOn, setModalOn] = useState(false);
  const openModal = () => {
    setModalOn(true);
  };
  const closeModal = () => {
    setModalOn(false);
  };
  return (
    <div>
      MyPage
      <button onClick={openModal}>Open Modal</button>
      {modalOn && (
        <Modal
          visible={modalOn}
          closable={true}
          maskClosable={true}
          onClose={closeModal}></Modal>
      )}
    </div>
  );
};

export default MyPage;

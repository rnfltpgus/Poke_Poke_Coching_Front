import React from 'react';

import styled from 'styled-components';

const CheckNotice = () => {
  return (
    <CheckNoticeWrap>
      <div className='check-title'>ππ» Check Notice</div>
      <div className='check-description'>
        μ€νΈλ μΉ­ λλ μ°μ±μ λ€λμ€λ κ²μ΄ μ’μ κ² κ°μ΅λλ€.
      </div>
      <div className='check-description-second'>
        - κ·λ³Όμ μ‘κ³  μλ°λ₯μ μλ‘ ν₯νκ² λλ¦¬μ μλ±‘ν₯μΌλ‘ λΉκΈ°λ μμΈλ₯Ό 3μ΄
        μ μ§νλ©΄ μ€νΈλ μΉ­ νμ΄μ§λ‘ μ΄λν©λλ€.
      </div>
    </CheckNoticeWrap>
  );
};

export default CheckNotice;

const CheckNoticeWrap = styled.div`
  .check-title {
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    text-align: center;
  }

  .check-description {
    margin-top: 3.8rem;
    padding: 2rem;
    font-size: 1.5rem;
    justify-content: center;
    text-align: center;
  }

  .check-description-second {
    margin: 0rem 3.2rem 0rem 4.2rem;
  }
`;

import React from 'react';

import styled from 'styled-components';

const GuideLines = () => {
  return (
    <GuideLinesWrap>
      <div className='guide-line-title'>๐งฉ Guide Lines</div>
      <div className='guide-line-description'>
        <div> 1. ๊ณต๋ถ ๋ชจ๋์ ์คํธ๋ ์นญ ๋ชจ๋๋ก ๊ตฌ์ฑ๋์ด ์์ต๋๋ค.</div>
        <div>
          2. ๊ณต๋ถ ๋ชจ๋์์ Mode Start๋ฅผ ๋๋ฅด๋ฉด ์ด๊ธฐ ์์ธ๊ฐ ์ธก์ ๋์ด, ํด๋น ์์ธ๋ก
        </div>
        <div className='guide-line-description-indent'>
          ์์ธ์ ์ฌ๋ฐ๋ฆ ์ ๋๋ฅผ ์ฒดํฌํ๊ฒ ๋ฉ๋๋ค.
        </div>
        <div>
          3. ์คํธ๋ ์นญ ๋ชจ๋ ์ง์ ํ, ์ข์ธก์ ์ด๋ฏธ์ง์ ํ๋จ์ ์ค๋ช์ ์ฐธ๊ณ ํ์ฌ, ์คํธ๋ ์นญ์
        </div>
        <div className='guide-line-description-indent'>์งํํด์ฃผ์ธ์.</div>
      </div>
    </GuideLinesWrap>
  );
};

export default GuideLines;

const GuideLinesWrap = styled.div`
  .guide-line-title {
    margin: 1rem auto 1rem auto;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    text-align: center;
  }

  .guide-line-description {
    width: 100%;
    padding: 0.4rem 1rem 1rem 1rem;
    font-size: 1.2rem;

    div {
      margin-top: 1.5rem;
    }

    .guide-line-description-indent {
      margin-left: 1.2rem;
    }
  }
`;

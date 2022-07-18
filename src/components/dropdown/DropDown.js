import React, { useState } from 'react';

import styled from 'styled-components';

const DropDown = ({ poseList, currentPose, setCurrentPose }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <DropDownWrap className='container'>
      <div className='menu-container'>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
          className='menu-trigger'>
          <span>{currentPose}</span>
          <img src='img/turtle.png' alt='stretching mode icon' />
        </button>
        <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            {poseList &&
              poseList.map((pose, index) => (
                <li onClick={() => setCurrentPose(pose)} key={index}>
                  <div>
                    <p>{pose}</p>
                  </div>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </DropDownWrap>
  );
};

export default DropDown;

const DropDownWrap = styled.div`
  img {
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 5px;
  }

  .menu-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.2vh 0.9vw;
  }

  .menu-trigger {
    background: #ffafbd;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.1vh 0.7rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    border: none;
    width: 100%;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;
    margin-left: auto;

    :hover {
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    }

    span {
      font-weight: bold;
      vertical-align: middle;
      font-size: 2rem;
      margin: 0 1rem;
    }
  }

  .menu {
    background: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 7.7vh;
    right: 0;
    width: 100%;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      border-bottom: 1px solid #dddddd;
    }

    li p {
      text-decoration: none;
      color: #333333;
      padding: 5px 20px;
      display: block;
      font-size: 1.5rem;
    }
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

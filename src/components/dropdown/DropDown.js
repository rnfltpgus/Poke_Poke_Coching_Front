import React, { useState } from 'react';

import styled from 'styled-components';

const DropDown = ({ poseList, currentPose, setCurrentPose }) => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <DropDownWrap className='container'>
      <div className='menu-container'>
        <button onClick={onClick} className='menu-trigger'>
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
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }

  .menu-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
  }

  .menu-trigger {
    background: #ffafbd;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    border: none;
    width: 100%;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;
    margin-left: auto;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .menu-trigger span {
    font-weight: 700;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 10px;
  }

  .menu-trigger img {
    border-radius: 90px;
  }

  .menu {
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 48px;
    right: 0;
    width: 100%;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu li {
    border-bottom: 1px solid #dddddd;
  }

  .menu li p {
    text-decoration: none;
    color: #333333;
    padding: 5px 20px;
    display: block;
  }
`;
# Poke_Poke_Coaching

바른자세를 유지하게 도와주며, 앉아서 생활하는 많은 현대인들을 위한 서비스 입니다.

<br/>

## 📝 Introduction

현재 사무직, 공부하는 사람들을 타겟으로 컴퓨터의 카메라를 이용하여,

- 스트레칭 모드에서는 책상에 앉아 진행이 가능한 스트레칭 동작을 진행할 수 있습니다.
- 공부 모드에서는 책상에 앉아 공부를 할떄 졸음 또는 큰 움직임을 감지하여 경고를 주거나 앉아있는 시간을 체크하거나 스톱워치, 카운트 다운 워치 등의 기능을 이용할 수 있습니다.

<br/>

## 💡 Motive

처음 아이디어는 단순히 자세를 바르게 잡아주는 서비스를 만들어 보자는 생각을 가지고 시작하게 되었습니다.

그러다 보니 무언가 다른 요소를 추가하는게 좋지않을까? 라는 생각을 하였고, 초점을 현재 놓여진 저를 기준으로 잡아 어떤 것이 있을 지? 생각을 다시 해보았습니다.

생각을 해보니, 지금에 저는 하루 중 많은 시간을 책상에 앉아서 코딩을 하면서 지내고 있습니다. 그래서 자세를 측정하여 공부하는 자세를 바로 잡아주는 기능이 있으면 좋을 것 같다고 생각하게 되었고 공부를 하면 적당한 스트레칭도 필요할 것 같아서 이를 구체화하여 **P.P.C.**를 개발하게 되었습니다.

**P.P.C. 란? Poke Poke Coaching의** 약어로 ‘콕콕 찔러 코칭해준다’ 라는 뜻으로 프로젝트 시작 시, 프로젝트 명을 지었는데, 현재 다시 보니 프로젝트 명과는 좀 의미가 엇갈리는 서비스를 만들게 된 것 같습니다.

<br/>

## 📅 Schedule

**[ 1주차 ] 2022년 06월 27일 ~ 2022년 07월 03일**

- 아이디어 및 기획
- 초기 개발환경 셋팅 및 기술 검증

**[ 2, 3주차 ] 2022년 07월 03일 ~ 2022년 07월 17일**

- 기능 개발
- 테스트 케이스 작성, UI 작업

<br/>

## 📚 Stack

### Frontend

- ES6+
- React
- Recoil
- Tensorflow : PoseNet
- Firebase
- Styled-Component
- Jest

### Backend

- Node.js
- Express
- MongoDB - Atlas
- Mongoose

<br/>

## 📁 Installation

### Frontend (React)

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어 입력

```
npm install or npm i
npm start
```

2. 환경설정 (.env file)을 아래와 같이 입력해야 합니다.

```
REACT_APP_ENV=<YOUR_SERVER_URL>
REACT_APP_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
REACT_APP_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
REACT_APP_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
REACT_APP_FIREBASE_APP_ID=<YOUR_FIREBASE_API_ID>
```

### Backend (Express)

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어 입력

```
npm install or npm i
npm start
```

2. 환경설정 (.env file)을 아래와 같이 입력해야 합니다.

```
MONGODB_URI=<YOUR_MONGODB_DATABASE_URL>
FRONTEND_URL=<YOUR_FRONTEND_URL>
```

<br/>

## ⚙️ Key Features

1. 공부 모드

- 공부 모드
  - Mode Start를 누르면 학습 타이머(Real Study Time)가 흐르고 자세를 감지합니다.
  - 자세가 흐트러지면 Check Wrong Posture에 카운트가 일정 간격으로 올라갑니다. (자세가 흐트러지면 학습 타이머가 중지하고 다시 정자세를 유지하면 학습 타이머가 올라갑니다.
- 시간 체크 기능
  - Real Time : 현재 실 시간을 확인합니다.
  - Count Down Timer : 시간을 설정하여, 시간이 종료되면 알림이 울립니다.
  - StopWatch : 시간을 체크할 수 있습니다.

2. 스트레칭 모드

- 부위별 스트레칭

  - Turtle Neck
  - Arm
  - SideNeck

- 스트레칭 유지 타이머
  - 올바른 자세를 유지할 경우 카운트가 올라가고 유지 최고 시간을 체크할 수 있습니다.

<br/>

## 🏔 Challenge

1.

<br/>

## 🤖 프로젝트 소감

1.

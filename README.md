# Poke_Poke_Coaching

P.P.C. 란? Poke Poke Coaching의 약어로 ‘콕콕 찔러 코칭해준다’ 라는 뜻을 가지고 있습니다.
바른자세를 유지하게 도와주며, 앉아서 생활하는 많은 현대인들을 위한 서비스 입니다.

[배포링크](https://spontaneous-duckanoo-b4cd63.netlify.app/)

<br/>

## 📝 Introduction

현재 사무직, 공부하는 사람들을 타겟으로 컴퓨터의 카메라를 이용하여,

- 스트레칭 모드에서는 책상에 앉아 진행이 가능한 스트레칭 동작을 진행할 수 있습니다.
- 공부 모드에서는 책상에 앉아 공부를 할떄 졸음 또는 큰 움직임을 감지하여 경고를 주거나 앉아있는 시간을 체크하거나 스톱워치, 카운트 다운 워치 등의 기능을 이용할 수 있습니다.

<br/>

## 💡 Motive

처음 아이디어는 단순히 자세를 바르게 잡아주는 서비스를 만들어 보자는 생각을 가지고 시작하게 되었습니다.

그러다 보니 단순 자세를 바르게 잡아주는 서비스가 아닌 무언가 다른 요소를 추가하면 좋을 것 같다는 생각을 문뜩하게 되었고, 현재 학원생인 저의 상황을 초점으로 두어 어떤 것이 추가되면 좋을 지? 생각을 다시 해보았습니다.

생각을 해보니, 지금에 저는 하루 중 많은 시간을 책상에 앉아서 코딩을 하면서 지내고 있습니다. 그래서 **자세를 측정하여 공부하는 자세를 바로 잡아주는 기능**이 있으면 좋을 것 같다고 생각하게 되었고 **공부를 하면 적당한 스트레칭도 필요할 것 같아**서 이 **2가지**를 **구체화하여 P.P.C.를 개발**하게 되었습니다.

<br/>

## 📅 Schedule

**[ 1주차 - 기획 ] 2022년 06월 27일 ~ 2022년 07월 03일**

- 아이디어 및 기획
- 초기 개발환경 셋팅 및 기술 검증

**[ 2, 3주차 - 개발 ] 2022년 07월 03일 ~ 2022년 07월 17일**

- 기능 개발
- 테스트 케이스 작성, UI 작업

🛠 **2022년 07월 16일 ~ 2022년 07월 24일**

- 기능점검 & 시연 준비

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

### Depoly

- Frontend
  - Netlify
- Backend
  - AWS

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

## 🧗‍♂️ Challenge

솔직히 저에게는 개인 프로젝트 그 자체가 챌린지 하였습니다. 그 중 기억에 남는 챌린지 요소는

<details>
<summary>1. Tensorflow 사용</summary>
<div markdown="1">

- 무언가 새로운 것을 한다는 것은 설래기도 하지만 걱정이나 스트레스 등 긍정의 요소보다 일반적으로 반대의 생각이 더 많이 나는 것 같습니다. 더군다나 혼자서 처음부터 끝까지 구현을 하는 개인프로젝트를 새로운 기술을 적용 시켜서 진행한다는 것은 저에게 너무나도 큰 걱정 거리였습니다.
- 기획단계에서 기술검증을 진행하면서, 많은 다양한 관련 레퍼런스를 보긴하였으나, ‘**이것을 내 프로젝트에 적용 시킬 수 있을까?’** 에 대한 두려움이 컸습니다.
- 하지만 시간에 흐름에 따라 Tensorflow - PoseNet의 일부 기능만 사용한 것이겠지만, 어느정도 익숙해지게 되었고 그래도 목표를 했던 기능에 대해서 구현을 완료할 수 있었습니다.
  - PoseNet을 이용하여, 17개의 신체 좌표를 가지고 알고리즘을 구현함에 있어서 **공부모드는 신체 좌표의 X축와 Y축의 값들을 사용하여 구현하였고, 스트레칭의 경우 좌표의 경우의 수를 boolean으로 체크하여 구현**하였습니다.
- 여기서 **배운 점**은 시간이 흐름에 따라 마음이 불안해져서, 코드의 원인을 찾기보다는 인터넷으로 남의 코드를 찾아보거나 그냥 아무대나 콘솔을 찍어보는 안 좋은 습관들을 다시 한번 느끼게 되었고, **시간이 없어도 마음을 다잡고 천천히 작성한 코드의 흐름을 파악하며 원인을 찾는 것이** 정신없이 코드를 찾아보고 콘솔을 막 찍는 것보다 **빠르다**는 것을 알게 되었습니다.
- 그리고 **새로 접하는 기술을 사용하게 될때, 문제가 생긴다면** 문제를 바로 외부에서 찾지말고, 우선적으로 **내 코드를 체크하고 그 문제의 지점이 케치되면 에러코드와 문제의 지점을 생각하면서 천천히 살펴보는 습관을 들이는 것이 좋다.** 라는 것을 느꼈습니다.

</div>
</details>
<details>
<summary>2. 공부모드 - CountDownTimer 구현</summary>
<div markdown="1">

- **해당 기능은 처음에는 어떻게 구현할까?** 를 생각하기 보다는 인터넷 검색을 해서 내가 딱 원하는 기능의 코드가 나오길 바라면서 찾아보았고 결국 찾게 되었습니다.
- 찾은 코드는 Class형으로 작성되어 있었는데, **‘KanBan이 이미 하루가 밀렸고, 시간이 없다.’ 라는 합리화**로 기존에 작성된 코드 스타일(Function형)을 무시하고, 약간의 코드만 수정하여 고치고 가져온 로직을 자세히 보지 않은 채, 작동여부만 확인하고 커밋을 진행하였습니다.
- 그 후 코드를 점검하던 중 Class형 뿐만이 아니라 다른 점을 또 있다는 것을 확인하게 되었습니다. (다른 Time 기능들은 `new Date()`를 사용하여 진행하였는데, Class형 로직은 setInterval()로 10마다 찍어, `LocalStorage를 이용해서 구현하는 방식`을 사용하고 있었다.)
- 결국 **새로 코드를 작성하기로 결정하고 진행하면서 난관이 몇 차례오기는 하였지만, 직접 작성하여 구현 완료한 코드라 찝찝함이 사라지고 마음이 뿌듯했습니다. 아래는 어려웠던 부분 중 하나인 남은 시간을 뽑는 코드입니다.** 다른 Time 코드와 어렵다고 생각한 부분은 다른 Time 코드는 흐르는 시간대로 로직을 작성하면 되는데, 설정한 시간에 흐르는데로 시간을 차감한다는 것이 머리속으로 그려지지 않아서 그랬던 것 같습니다..
- 여기서 **배운 점**은 이유가 어찌되었건, **남의 코드를 사용하는 경우**가 생기게 된다면 **충분한 분석을 통해 내 것으로 만든 후 사용하자**를 배우게 되었습니다.

```jsx
// 남은 시간을 뽑는 코드
const calculateTimeLeft = () => {
  let currantTime = new Date().getTime();
  let difference = countdownTime - currantTime;
  let timeDiff = {
    hours:
      difference > 0 ? Math.floor((difference / (1000 * 60 * 60)) % 24) : 0,
    minutes: difference > 0 ? Math.floor((difference / 1000 / 60) % 60) : 0,
    seconds: difference > 0 ? Math.floor((difference / 1000) % 60) : 0,
  };

  timeDiff.hours =
    timeDiff.hours < 10 ? `0${timeDiff.hours}` : `${timeDiff.hours}`;
  timeDiff.minutes =
    timeDiff.minutes < 10 ? `0${timeDiff.minutes}` : `${timeDiff.minutes}`;
  timeDiff.seconds =
    timeDiff.seconds < 10 ? `0${timeDiff.seconds}` : `${timeDiff.seconds}`;

  return timeDiff;
};
```

</div>
</details>

<details>
<summary>3. 함수형 프로그래밍(관심사의 분리)을 생각하며, 코드 작성하기</summary>
<div markdown="1">

- 이번 개인 프로젝트를 진행하면서 함수형 프로그래밍(관심사의 분리)를 생각하면서 진행은 하였지만, 처음에는 이루어 지는 듯 했으나 시간에 쫒기고 코드가 늘어나니 관심사의 분리를 생각 못하면서 작성하게 되었습니다.
- 그러던 중 Tensorflow를 사용하는 로직에 올바른 스트레칭을 하였을 경우 Count(시간)가 올라가고 최고 유지시간도 구하는 로직을 구현함에 있어서 어려움이 있었는데, 그 어려움은 해당 컴포넌트가 관심사의 분리가 잘 되어 있지 않고 서로 엮여 있어 작성할 부분을 쉽게 케치하지 못하여서 어려웠던 것 같습니다.
- 그 이후 코드 변경이 많이 안 되는 선에서 관심사의 분리를 적용하며 리팩토링을 진행하였는데, 코드가 더 간결해지고 해당 컴포넌트가 어떤 역할(단일 책임의 원칙)을 하는 지 등 어떤 코드인지 판단하기 쉬워지는 것을 체감할 수 있었습니다.
- 여기서 **배운 점**은 함수형 프로그래밍(관심사의 분리)을 생각하면서 코드를 단단하게 잘 작성한다면, **재사용이 쉽고 유지보수가 쉬우며, 테스트도 하기 쉬운 코드가 되어 코드의 양이 많아질 수록 시간을 더 절약할 수 있겠구나 라고 느끼게 되었습니다.**

</div>
</details>

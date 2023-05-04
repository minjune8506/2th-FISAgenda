# 2th-FISAgenda

|김민준|정민성|한윤서|공태식|
|:--|:--|:--|:--|
|![](https://avatars.githubusercontent.com/u/42430982?v=4)|![](https://avatars.githubusercontent.com/u/116792686?v=4)|![](https://avatars.githubusercontent.com/u/70616579?v=4)|![](https://avatars.githubusercontent.com/u/81614820?v=4)|

## 프로젝트
![screen](./2th-fisagenda.gif)

### 주제

우리 FISA 커리큘럼을 달력에 한눈에 보여주기 위한 프로젝트

09:00 / 18:00 기준의 날씨도 함께 보여줌으로써 상쾌한 출퇴근 가능.

### 기술 스택

<div>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />

<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>

<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

<img src="https://img.shields.io/badge/nodedotjs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>

<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"/>

<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>
</div>

## 회고
### 김민준

#### 트러블 슈팅

Table의 tr 높이가 같게 조절이 되지 않는 문제
- flex 설정 -> x
- 퍼센트로 높이 조절 -> x
- height를 auto로 설정 -> 해결

 달력을 기존에 하드코딩으로 작성
 - javascript를 이용하여 각 달의 시작일 / 마지막일 기준 달력 생성

 CORS 문제
 - express의 cors 설정을 이용하여 front / back 서버가 달라도 API 호출 허용

#### 회고

Keep
- 라벨 2개 이상 정상 출력
- 오늘 날짜 표시
- 날씨 정보 출력
- tailwind css 사용

Problem
- 공휴일 정보를 불러와서 달력에 출력되면 좋겠음
- 아젠다 수정 / 삭제 / 추가 기능이 없음
- 라벨에 대한 추가 정보 필요
- JSDoc 적용 못함
- Dark Mode 적용 못함

Try
- 공휴일 API를 이용하여 대한민국 공휴일 표시
- Backend 구성하여 CRUD 기능 추가
- 라벨별로 카테고리를 추가하여 더 세세하게 분류
- 배포 후 유지보수
- JSDoc을 이용하여 문서화
- Dark Mode 적용

### 정민성

#### 트러블 슈팅
-파이어베이스 문제
  - 문제 : 파이어베이스의 버전이 올라가면서 문법이 변경되어 구글링을 해봐도 다 옛날 문법에 대한 포스팅만 있었음
  - 해결 : 파이어베이스의 공식 문서를 참고하여 베이스 코드를 작성함, 추가적인 부분은 파이어베이스 v9 ~~~ 이렇게 검색하니 찾을 수 있었음
- Promise 객체 관련 merge 문제
  - 문제 : merge할 때 Promise 객체를 기준으로 쓰여진 코드와 Array 객체를 기준으로 쓰여진 코드에서 오류가 발생함
  - 해결 : Promise 객체와 관련된 함수에 async와 await를 붙여주면서 해결함

#### 회고
- Keep
  - 아이디어가 좋아서 실제로 배포를 하여 유지보수하며 사용하고 싶음
  - 로컬 스토리지가 아닌 외부 데이터베이스를 사용함으로써 서비스의 확장성을 높임
  - Github의 issue와 Pull Request 기능을 사용함으로써 리포지토리와 코드 관리에 용이함을 느낌
- Problem
  - Promise 객체에 대한 이해도가 낮아 오류를 고칠 때 힘들었음
  - 개인적으로 서비스를 사용할 때 스케줄을 추가, 삭제, 수정할 수 있는 기능이 들어가 있지 않음
- Try
  - Promise 객체에 대해 공부가 필요함
  - 추가, 삭제할 수 있는 이벤트를 추가하여 현재 서버 코드와 연동시키면 가능함

### 한윤서

#### 트러블 슈팅
#### 회고

### 공태식

#### 트러블 슈팅
#### 회고

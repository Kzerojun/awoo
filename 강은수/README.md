# Today I Learned

<details> <summary><strong>0304</strong></summary>

## StoryBook

### _StoryBook이란?_

- 컴포넌트 단위의 UI 개발 (Component-Driven Development, CDD) 환경 지원 도구
- React, Vue, Angular 등 다양한 프레임워크 지원

### 주요 특징

1. 독립적인 컴포넌트 개발
   - Storybook을 사용하면 전체 애플리케이션을 실행하지 않고도 개별 UI 컴포넌트를 개발하고 확인할 수 있다.
2. 컴포넌트 카탈로그
   - 개발한 모든 UI 컴포넌트를 한곳에 관리할 수 있어 디자인 시스템을 구축하는 데 유용하다.
3. 자동 문서화
   - Storybook은 컴포넌트의 Prop(속성), 상태, 이벤트 등의 정보를 자동으로 문서화해준다.
4. 상호작용 테스트
   - Jest나 Testing Library같은 도구를 사용하여 UI의 동작을 테스트할 수 있다.

### 이럴 때 쓰면 좋다!

- 컴포넌트 단위의 개발을 할 때
- 디자인 시스템을 구축할 때
- 프론트엔드와 백엔드 개발을 병렬로 진행할 때
- 디자이너, QA 팀과 협업할 때
</details>

<details> <summary><strong>0305</strong></summary>

## Next.js와 React의 차이

### _Next.js와 React의 가장 큰 차이는?_

- Next.js는 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG) 등의 기능을 기본적으로 제공한다는 점이다. React는 클라이언트 사이드 렌더링 (CSR)만 기본 지원하지만, Next.js는 CSR 뿐만 아니라 SSR, SSG, ISR(증분 정적 생성)도 가능해서 SEO나 성능 최적화에서 유리하다.

### 주요 차이점 정리

|         기능          |                React                 |                      Next.js                      |
| :-------------------: | :----------------------------------: | :-----------------------------------------------: |
|      렌더링 방식      |                 CSR                  |              CSR, SSR, SSG, ISR 지원              |
|        라우팅         |        `react-router-dom`필요        |         파일 기반 라우팅 (pages/디렉토리)         |
|          SEO          | 기본적으로 불리함(JS 실행 후 렌더링) |           SSR 및 SSG로 SEO 최적화 가능            |
|      API 라우트       |                 없음                 |        `/api/`경로에서 API 서버 제공 가능         |
|     이미지 최적화     |                 없음                 |        `next/image`로 최적화된 이미지 제공        |
| 번들링 및 성능 최적화 |            직접 설정 필요            | 자동 코드 분할, Tree Shaking, 빠른 로딩 속도 지원 |

### _이런 경우엔 Next.js가 좋다!_

- SEO가 중요한 서비스 (블로그, 쇼핑몰, 뉴스 사이트 등)
- 초기 로딩 속도를 빠르게 해야 하는 경우
- 정적 페이지를 미리 생성하여 성능을 높이고 싶은 경우
- 백엔드 없이 간단한 API 서버도 함께 운영하고 싶은 경우

### _이런 경우엔 React만 써도 좋다!_

- 단순한 SPA(싱글 페이지 애플리케이션)
- SSR이 필요 없고, 사용자 인터랙션이 많은 대시보드나 웹앱
- CSR로도 충분한 경우(SEO가 필요 없는 내부 시스템 등)

### _So What?!_

- Next.js는 React의 확장판이다.
- 기본적으로 React로 개발하는 것과 비슷하지만, 추가적인 기능(SSR, SSG, API 라우트 등)이 내장되어 있어 프로젝트에 따라 더 적합할 수도 있다.
- 요즘 채용공고에서 기술 스택으로 많이 보이던데 써보는 것도 좋을지도...!!!

</details>

<details> <summary><strong>0306</strong></summary>

</details>

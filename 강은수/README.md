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

## PWA란?

- PWA(Progressive Web App)는 웹 애플리케이션을 네이티브 앱처럼 사용할 수 있도록 만들어주는 기술.
- 기본적으로 웹에서 동작하지만, 네이티브 앱과 비슷한 사용자 경험을 제공한다.

### _PWA의 주요 특징_

1. 오프라인 지원
   - 서비스 워커 (Service Worker)를 이용해 캐싱을 관리하여 네트워크 연결이 없어도 앱을 사용할 수 있다.
2. 빠른 로딩 속도
   - 데이터를 캐싱해서 웹 페이지를 빠르게 로딩할 수 있다.
3. 푸시 알림 지원
   - 브라우저를 닫아도 푸시 알림을 받을 수 있다.
4. 홈 화면 추가 기능
   - 사용자가 앱을 설치하지 않아도 홈 화면에 아이콘을 추가하여 네이티브 앱처럼 실행할 수 있다.
5. 반응형 디자인
   - 다양한 기기(모바일, 태블릿, 데스크톱)에서 최적화된 UI를 제공한다
6. 앱 스토어 등록 없이 사용 가능
   - 네이티브 앱처럼 별도로 앱 마켓 (구글 플레이, 앱 스토어)에 등록하지 않아도 사용자가 웹에서 바로 접근 가능

### _PWA 적용을 위해 필요한 기술_

- 서비스 워커(Service Worker): 백그라운드에서 캐싱 및 푸시 알림을 담당하는 스크립트
- 웹 매니페스트(Web App Manifest): 앱의 아이콘, 색상, 시작 페이지 등을 정의하는 JSON 파일
- HTTPS: 보안성을 위해 반드시 HTTPS 환경에서 실행

### _언제 PWA를 사용할까?_

- 앱을 개발할 예산이 부족하지만, 모바일 환경에서도 원활한 UX를 제공하고 싶을 때
- 웹사이트 방문자를 앱 사용자로 유도하고 싶을 때
- 오프라인에서도 일부 기능을 제공하고 싶을 때

</details>

<details> <summary><strong>0307</strong></summary>

## Atomic Design

[Atomic Desigb - Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)

- 화학점 관점에서 영감을 얻은 디자인 시스템
- 모든 것은 **_atom(원자)_** 로 구성되어 있고 atom 들이 서로 결합하여 **_molecule(분자)_** 이 되고, molecule는 더 복잡한 **_organism(유기체)_** 로 결합하여 궁극적으로 모든 물질을 생성
- Atomic Design에서는 이 개념을 차용해서 컴포넌트를 atom, molecule, organism, template, page의 5가지 레벨 나눔
  ![5 levels from Atomic Design](image.png)

### _Atom_

- 더 이상 분해할 수 없는 기본 컴포넌트
- label, input, button과 같이 기본 HTML element 태그 혹은 글꼴, 애니메이션, 컬러 팔레트, 레이아웃과 같이 추상적인 요소도 포함 가능
- atom과 다른 atom을 결합한 molecule 혹은 organism 단위에서 여러 단위와 결합하여 유용하게 사용 가능

### _Molecule_

- 여러 개의 atom을 결합하여 자신의 고유한 특성을 가진다
- **한 가지 일을 하는 것** 이 중요한 특징!
- SRP(Single Responsibility Principle)원칙으로 인해 키워드 전송 기능이 필요한 곳에서 재사용 가능

### _Organism_

- 더 복잡하고 서비스에서 표현될 수 있는 명확한 영역과 특정 컨텍스트를 가진다.
- atom, molecule, organism으로 구성 가능
- ex) logo(atom), navigation(molecule), search form(molecule)을 포함 가능
- atom, molecule에 비해 좀 더 구체적으로 표현되고 컨텍스트를 가지기 때문에 상대적으로 재사용성이 낮아지는 특성

### _Template_

- Page를 만들 수 있도록 여러 개의 organism, molecule로 구성 가능
- 실제 콘텐츠가 없는 page 수준의 스켈레톤

### _Page_

- 유저가 볼 수 있는 실제 콘텐츠
- template의 인스턴스

</details>

<details> <summary><strong>0310</strong></summary>

### _SSR/SSG의 필요성_

- SPA 등의 클라이언트 사이드 렌더링은 그대로 사용하면 초기 표시가 지연되는 문제가 존재

#### SSR

- 서버 사이드 렌더링 (Server Side Rendering)
- 서버 사이드 자바스크립트 실행환경에서 요청에 대한 페이지를 생성해서 HTML을 반환하는 것
- 장점
  - 렌더링을 서버 사이드에서 수행한 결과를 반환하므로, 사이트를 빠르게 표시할 수 있다.
  - 서버 사이드에서 콘텐츠를 생성하므로, SPA에서는 복잡했던 SEO를 향상할 수 있다.
- 단점
  - Node.js 등 서버 사이드 자바스크립트 실행 환경이 필요하다
  - 서버 사이드에서 렌더링하므로 서버 CPU의 부하가 증가한다
  - 서버와 클라이언트에서 자바스크립트의 로직이 분산될 가능성이 있다

#### SSG

- 정적 사이트 생성 (Static Site Generation)
- 사전에 정적 파일로서 생성, 배포하는 구조
- 서버로 접근할 때 HTML을 생성하므로, 트래픽이 많을 때는 서버의 부하에 관해 고려해야만 하는 SSR의 관점을 보완

</details>

<details> <summary><strong>0311</strong></summary>

## TypeScript 1

- 자바스크립트에 정적 타입 기능 등을 탑재한 프로그래밍 언어로, 마이크로소프트가 중심이 되어 개발 추진
- 예시 자바스크립트 코드

```
function sayHello (firstName) {
   console.log('hello'+firstName)
}
let firstName = 'Hana'
sayHello(firstName)
```

- 위의 자바스크립트 코드를 타입스크립트로 변환한 코드

```
// firstName 뒤에 string 타입을 붙여, 문자열 이외의 값을 전달하지 못하게 할 수 있다.
function sayHello (firstName: string) {
   console.log('Hello'+firstName)
}
let firstName: string = 'Hana'
sayHello(firstName)
```

- 타입스크립트는 자바스크립트에 주로 다음 기능을 추가한 것
  - 타입 정의
  - 인터페이스와 클래스
  - null / undefined-safe
  - 범용적인 클래스나 메서드 타입을 실혀하는 제너릭(Generic)
  - 그 외, ECMA에서 정의되어 있는 자바스크립트의 최신 사양
- 단점
  - 프로젝트 규모에 따라 컴파일에 시간이 걸린다
  - 타입스크립트 경험자가 없을 경우, 도입을 위한 많은 학습 비용이 발생할 수도 있다.
  </details>

<details> <summary><strong>0311</strong></summary>

## useMemo와 useCallback의 차이

### _useMemo_

- 특정 값의 계산 결과를 메모이제이션하여, 디펜던시가 변경되지 않는 한 동일한 값을 반환
- 복잡한 계산을 반복적으로 수행하지 않도록 하여 성능을 최적화하는 데 유용

```
const memoizedValue = useMemo(() => {
   return computeExpensiveValue(a, b);
}. [a, b])
```

- 위의 코드에서 a와 b가 변경되지 않는 한 computeExpensiveValue 함수는 다시 호출되지 않는다.
  - 왜냐면 useMemo는 디펜던시 배열을 기반으로 메모이제이션된 값을 반환하기 때문
- useMemo는 특히 렌더링 비용이 높은 컴포넌트에서 유용
  - 복잡한 계산을 수행하거나, 대규모 데이터를 처리하는 경우에 사용하면 좋다
- **그러나** 모든 경우에 useMemo를 사용하는 것은 권장되지 않는다!
  - 왜냐면 메모이제이션 자체에도 비용이 발생하기 때문 -> 성능 최적화가 필요한 경우에만 사용하는 것이 좋다

### _useCallback_

- 특정 함수를 메모이제이션하여, 디펜던시가 변경되지 않는 한 동일한 함수를 반환. 자식 컴포넌트에 함수를 props로 전달할 때 유용

```
const memoizedCallback = useCallback(() => {
   doSomething(a, b);
}, [a, b])
```

- a와 b가 변경되지 않는 한 doSomething 함수는 새로 생성되지 않는다.
  - 왜냐하면 useCallback은 디펜던시 배열을 기반으로 메모이제이션 된 함수를 반환하기 때문
- useCallback은 특히 자식 컴포넌트가 React.memo로 최적화되어 있는 경우에 유용
  왜냐하면 함수가 변경되지 않으면, 자식 컴포넌트가 불필요하게 렌더링되지 않기 때문
- 하지만 모든 경우에 useCallback을 사용하는 것은 권장되지 않는다.
  - 왜냐하면 메모이제이션 자체에도 비용이 발생하기 때문. 따라서, 성능 최적화가 필요한 경우에만 사용하는 것이 좋다

### \_useMemo와 useCallback의 차이점

- useMemo와 useCallback은 비슷한 목적을 가지고 있지만, 사용하는 대상이 다르다.
- useMemo는 값을 메모이제이션하고, useCallback은 함수를 메모이제이션한다.

```
// useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

- useMemo는 계산된 값을 반환하고, useCallback은 메모이제이션된 함수를 반환한다.
  - useMemo는 값의 메모이제이션에 초점을 맞추고, useCallback은 함수의 메모이제이션에 초점을 맞추기 때문

</details>

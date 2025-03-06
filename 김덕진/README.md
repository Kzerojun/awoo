## Today I Learned

<details> <summary><strong>0304</strong></summary>
<h2>Storybook</h2>
Storybook이란?
Storybook은 UI 컴포넌트를 독립적으로 개발, 테스트 및 문서화할 수 있는 강력한 프론트엔드 개발 도구입니다. 개발자가 메인 애플리케이션 외부에서 컴포넌트를 생성하고 전시할 수 있는 샌드박스 환경을 제공합니다.

주요 기능
1. 스토리 브라우저
사이드바와 캔버스를 통해 UI 컴포넌트를 쉽게 탐색할 수 있습니다.

컴포넌트는 격리된 미리보기 iframe에서 렌더링됩니다.

2. 애드온
문서화, 접근성 테스트, 대화형 컨트롤 등의 기능으로 Storybook의 기능을 확장할 수 있습니다.

특정 요구사항을 충족시키는 다양한 애드온 컬렉션이 제공됩니다.

3. 컴포넌트 주도 개발 (CDD)
UI 컴포넌트를 모듈식으로 구축할 수 있게 해줍니다.

기본 컴포넌트부터 시작하여 더 복잡한 페이지로 조합할 수 있습니다.

사용 방법
Storybook 설치: npx storybook init

컴포넌트에 대한 스토리 파일 작성 (예: Button.stories.js)

Storybook 실행: npm run storybook

장점
컴포넌트 격리: 전체 애플리케이션 컨텍스트 없이 개별 컴포넌트에 집중할 수 있습니다.

시각적 회귀 테스트: 컴포넌트의 모든 상태를 쉽게 확인하고 테스트할 수 있습니다.

문서화: 자동으로 컴포넌트 라이브러리를 문서화합니다.

협업 개선: 개발자, 디자이너, 프로젝트 관리자 간의 커뮤니케이션을 향상시킵니다.

결론
Storybook은 UI 개발 프로세스를 최적화하고, 높은 품질의 일관된 사용자 인터페이스를 구축하는 데 매우 유용한 도구입니다. 컴포넌트 기반 개발 방식을 채택한 팀에게 특히 유용합니다.

</details>

<details>
<summary><strong>0305</strong></summary>

### ✅ 응집도와 결합도

#### 1. **응집도(Cohesion)**
- 모듈 내 기능들이 서로 밀접하게 연관된 정도를 나타냄.
- **높을수록** 하나의 모듈이 단일 책임을 가지며 유지보수성이 높아짐.
- **낮을수록** 여러 책임이 섞여 있어 수정이 어려워짐.

##### 📌 예제
```java
// 높은 응집도
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    public int subtract(int a, int b) {
        return a - b;
    }
}
```

```java
// 낮은 응집도
public class UserManager {
    public void login(String username, String password) {
        // 로그인 처리
    }
    public void downloadFile(String fileId) {
        // 파일 다운로드
    }
}
```

#### 2. **결합도(Coupling)**
- 모듈 간의 의존성 정도를 의미.
- **높을수록** 모듈이 강하게 연결되어 변경에 취약함.
- **낮을수록** 모듈이 독립적으로 동작 가능하며 확장성이 높아짐.

##### 📌 낮은 결합도의 예제 (의존성 주입)
```java
public interface PaymentProcessor {
    void processPayment(Order order);
}

public class OrderService {
    private final PaymentProcessor paymentProcessor;
    public OrderService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
    public void placeOrder(Order order) {
        paymentProcessor.processPayment(order);
    }
}
```

### 🔍 응집도가 주관적인 이유
- 응집도를 평가하는 기준은 **설계자의 관점**과 **비즈니스 요구사항**에 따라 다를 수 있음.
- 어떤 모듈이 하나의 책임을 가지는지에 대한 정의가 모호할 수 있음.
- 프로젝트의 규모, 팀의 스타일, 유지보수 전략에 따라 응집도의 해석이 달라질 수 있음.

### 📌 결론
- **높은 응집도 + 낮은 결합도**를 유지하는 것이 좋은 설계.
- 응집도는 **단일 책임 원칙(SRP)**을 고려하여 모듈을 나누는 것이 중요.
- 결합도는 **인터페이스, DI(Dependency Injection)** 등을 활용하여 낮추는 것이 효과적.

</details>


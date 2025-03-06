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

<details>
<summary><strong>0306</strong></summary>

## DDD (Domain-Driven Design)

### ✅ DDD란?
- **도메인을 중심으로 소프트웨어를 설계하는 방법론**
- 복잡한 비즈니스 로직을 효율적으로 관리하기 위해 사용됨
- 객체의 상태와 행위를 함께 포함하여 **도메인 모델**을 구현

---

### 📌 DDD의 핵심 개념

#### 1️⃣ **엔티티(Entity)**
- 고유한 식별자를 가지는 도메인 객체
- 상태와 행위를 함께 포함함
- **비즈니스 로직을 포함할 수 있음** (→ 기존의 MVC 패턴과 차이점)

```java
public class Order {
    private Long id;
    private OrderStatus status;
    
    public void completeOrder() {
        if (this.status != OrderStatus.PENDING) {
            throw new IllegalStateException("Order cannot be completed");
        }
        this.status = OrderStatus.COMPLETED;
    }
}
```

#### 2️⃣ **밸류 객체(Value Object, VO)**
- 고유한 식별자가 없음
- 값 자체가 의미를 가지며 불변 객체로 설계하는 것이 일반적

```java
public class Address {
    private String street;
    private String city;
    private String zipCode;
    
    // 생성자에서 불변성 유지
    public Address(String street, String city, String zipCode) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }
}
```

#### 3️⃣ **애그리거트(Aggregate)와 애그리거트 루트**
- **애그리거트(Aggregate)**: 논리적으로 하나의 도메인 객체 그룹을 의미
- **애그리거트 루트(Aggregate Root)**: 애그리거트 내에서 유일하게 외부에서 직접 접근 가능한 객체

```java
public class Order {
    private List<OrderItem> orderItems = new ArrayList<>();
    
    public void addItem(OrderItem item) {
        this.orderItems.add(item);
    }
}
```

#### 4️⃣ **도메인 서비스(Domain Service)**
- 특정 엔티티나 밸류 객체에 속하지 않는 도메인 로직을 처리하는 서비스
- **도메인 간의 복잡한 비즈니스 로직을 담당**

```java
public class PaymentService {
    public void processPayment(Order order) {
        // 결제 처리 로직
    }
}
```

#### 5️⃣ **이벤트(Event)와 도메인 이벤트**
- 도메인에서 발생한 상태 변경을 다른 컴포넌트에 알리는 역할
- 이벤트를 발행하면 이를 감지한 다른 서비스가 비동기적으로 처리 가능

```java
public class OrderCreatedEvent {
    private Long orderId;
    public OrderCreatedEvent(Long orderId) {
        this.orderId = orderId;
    }
}
```

---

### 🔍 DDD vs 기존 MVC 패턴의 차이
| 구분 | MVC 패턴 | DDD 패턴 |
|------|---------|---------|
| 도메인 로직 | 서비스(Service) 계층에 집중 | 엔티티(Entity)에 포함 |
| 데이터 관리 | DB 중심의 설계 | 도메인 중심의 설계 |
| 확장성 | 단순 구조이지만 대형 시스템에선 유지보수 어려움 | 복잡하지만 도메인 변화에 유연하게 대응 가능 |

---

### 📌 결론
- DDD는 **비즈니스 로직을 객체 내부에 포함**하여 도메인 중심 설계를 가능하게 함
- **엔티티와 밸류 객체를 구분**하고, **애그리거트와 도메인 서비스**를 적절히 활용해야 함
- 이벤트 기반 설계를 통해 **확장성과 유지보수성을 높일 수 있음**

</details>


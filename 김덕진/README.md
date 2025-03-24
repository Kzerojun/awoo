## Today I Learned

<details> <summary><strong>1주차</strong></summary>
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

<details>
<summary><strong>0307</strong></summary>

## HTTP vs HTTPS

### 1. **HTTP (HyperText Transfer Protocol)**
- **기본 개념**: 웹 상에서 데이터를 주고받기 위한 프로토콜
- **암호화**: 암호화되지 않은 평문 방식으로 데이터 전송
- **보안**: 데이터가 중간에 노출될 위험이 있음 (스니핑, 중간자 공격 등)
- **기본 포트**: 80
- **사용 사례**: 보안이 크게 중요하지 않은 공개 웹사이트, 일반적인 정보 제공 사이트

### 2. **HTTPS (HTTP Secure)**
- **기본 개념**: HTTP에 보안을 강화한 프로토콜로, TLS(또는 SSL)를 이용해 데이터를 암호화함
- **암호화**: 데이터가 암호화되어 전송되므로, 중간에 탈취되더라도 내용을 읽기 어렵게 만듦
- **보안**: 데이터 무결성과 인증을 제공하여, 서버와 클라이언트 간의 신뢰성 보장
- **기본 포트**: 443
- **사용 사례**: 민감한 정보(로그인 정보, 결제 정보 등)를 다루는 웹사이트, 전자상거래, 뱅킹 사이트

### 3. **주요 차이점 및 고려사항**
- **보안성**:  
  - *HTTP*: 암호화가 없으므로 데이터 노출 위험이 높음  
  - *HTTPS*: TLS/SSL을 통해 데이터가 암호화되어 안전하게 전송됨
- **인증**:  
  - *HTTP*: 별도의 인증 절차가 없음  
  - *HTTPS*: 유효한 SSL/TLS 인증서를 통해 서버의 신뢰성을 확인함
- **성능**:  
  - HTTPS는 암호화/복호화 과정으로 인해 약간의 오버헤드가 있으나, 최신 기술(HTTP/2 등)로 최적화되어 큰 문제가 되지 않음
- **SEO 영향**:  
  - 검색 엔진은 HTTPS를 사용하는 웹사이트를 선호하는 경향이 있음

### 4. **요약**
- **HTTP**는 보안에 취약하지만, 단순한 데이터 전송에는 사용할 수 있음.
- **HTTPS**는 보안을 위해 필수적인 프로토콜로, 민감한 정보를 다루는 모든 서비스에서 권장됨.

</details>

<details>
<summary><strong>0308</strong></summary>

## JPA (Java Persistence API)

### ✅ JPA란?
- **Java 애플리케이션에서 관계형 데이터베이스를 쉽게 다룰 수 있도록 도와주는 ORM 기술**
- SQL을 직접 작성하지 않고 **객체를 통해 데이터베이스를 조작**할 수 있음
- Spring Boot와 함께 사용하면 **자동으로 SQL을 생성 및 실행**할 수 있음

---

### 📌 JPA의 주요 특징
1. **객체 지향적인 데이터베이스 접근** → SQL 없이 엔티티 객체를 사용하여 데이터 저장 및 조회
2. **자동 SQL 생성** → `save()`, `findById()`, `delete()` 등의 메서드를 제공
3. **트랜잭션 관리 지원** → `@Transactional`을 사용하여 데이터 일관성을 유지
4. **캐싱 및 성능 최적화** → 1차 캐시, 지연 로딩(Lazy Loading) 등의 기능 제공

---

### 📌 JPA 기본 사용 예제

#### 1️⃣ **의존성 추가 (Spring Boot + JPA)**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```
> 💡 **H2 데이터베이스**는 테스트용으로 가볍게 사용할 수 있는 인메모리 DB

---

#### 2️⃣ **엔티티(Entity) 생성**
```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String email;
    
    protected User() {}
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
```

---

#### 3️⃣ **JPA 리포지토리 (Repository) 생성**
```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
```
> 💡 `JpaRepository`를 상속하면 기본적인 CRUD 메서드를 자동으로 제공

---

#### 4️⃣ **서비스(Service) 계층에서 사용하기**
```java
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Transactional
    public User createUser(String name, String email) {
        User user = new User(name, email);
        return userRepository.save(user);
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
```

---

#### 5️⃣ **컨트롤러(Controller)에서 API 제공**
```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    public User createUser(@RequestParam String name, @RequestParam String email) {
        return userService.createUser(name, email);
    }
    
    @GetMapping("/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }
}
```

---

### 📌 정리
- **JPA는 객체를 통해 데이터를 다룰 수 있도록 도와주는 ORM 기술**
- Spring Boot에서는 `JpaRepository`를 사용하여 **자동으로 SQL을 생성 및 실행**
- `@Entity`, `@Repository`, `@Transactional` 같은 **어노테이션을 사용하여 DB와 매핑**

> **🔥 한 줄 요약:** "JPA를 사용하면 SQL 없이 객체만으로 데이터를 저장하고 조회할 수 있다!"

</details>
</details>

<details>
<summary><strong>2주차</strong></summary>
<details>
<summary><strong>0310</strong></summary>

## 데이터베이스 기초 개념

### 1️⃣ 식별자와 비식별자
#### ✅ **식별자(Identifier)**
- 데이터베이스에서 **각 행(row)을 고유하게 구분하는 속성**
- 주로 **기본 키(Primary Key, PK)**로 사용됨
- 예: 주민등록번호, 학번, 자동차 번호판 등

#### ✅ **비식별자(Non-identifier)**
- 개체를 유일하게 구분하지 않는 속성
- 중복될 수 있음
- 예: 이름, 주소, 이메일 등

---

### 2️⃣ CHAR vs VARCHAR
#### ✅ **CHAR**
- **고정 길이(Fixed Length) 문자열**
- 저장할 문자열 길이가 항상 일정한 경우 사용
- ex) `CHAR(10)` → 길이가 5인 문자열을 저장해도 10바이트가 할당됨 (공백 패딩 추가)
- **속도는 빠르지만, 저장 공간 낭비 발생 가능**

#### ✅ **VARCHAR**
- **가변 길이(Variable Length) 문자열**
- 입력된 문자열 길이에 따라 **동적으로 크기가 결정됨**
- ex) `VARCHAR(10)` → 길이가 5인 문자열을 저장하면 5바이트만 사용
- **공간 효율적이지만, CHAR보다 속도가 다소 느릴 수 있음**

> 🔥 **정리:** CHAR은 속도 빠름 & 공간 낭비 가능, VARCHAR은 공간 효율적이지만 속도 약간 느림

---

### 3️⃣ UNSIGNED의 의미
- `UNSIGNED`는 **부호 없는 정수(음수 없음)**를 의미함
- 일반적으로 **MySQL**에서 사용됨
- `TINYINT`, `SMALLINT`, `INT`, `BIGINT` 같은 정수 타입에서 적용 가능

#### ✅ **예제**
```sql
CREATE TABLE example (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    age TINYINT UNSIGNED
);
```

#### ✅ **장점**
- **음수를 허용하지 않아 저장 공간을 절약할 수 있음**
- 예를 들어 `TINYINT`의 범위는 `-128 ~ 127`이지만, `TINYINT UNSIGNED`는 `0 ~ 255`까지 저장 가능

> 🔥 **정리:** `UNSIGNED`를 사용하면 **음수 대신 양수 범위를 늘려 저장 효율을 높일 수 있음**

---

### 4️⃣ ENUM
- `ENUM`은 **여러 개의 값 중 하나를 선택할 수 있는 데이터 타입**
- 데이터베이스에서 **제한된 선택지를 가질 때 사용** (예: 성별, 상태값, 카테고리 등)

#### ✅ **예제**
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('ACTIVE', 'INACTIVE', 'BANNED') NOT NULL
);
```
- `status` 컬럼은 `ACTIVE`, `INACTIVE`, `BANNED` 중 하나만 저장 가능
- `ENUM`은 내부적으로 **정수 값으로 저장되기 때문에 조회 성능이 빠름**

#### ✅ **장점 & 단점**
✅ **장점:**
- 값이 정해진 범위 내에서만 저장 가능 → 데이터 무결성 보장
- 내부적으로 숫자로 저장되므로 빠른 검색 가능

❌ **단점:**
- 새로운 값을 추가하려면 **테이블을 수정해야 함**
- 다른 데이터베이스로 마이그레이션 시 호환성 문제가 발생할 수 있음

> 🔥 **정리:** `ENUM`은 **미리 정해진 값만 저장해야 할 때 유용하지만, 유연성이 부족할 수 있음**

</details>

<details>
<summary><strong>0311</strong></summary>

## 데이터 무결성과 정합성

### 1️⃣ 데이터 무결성 (Data Integrity)
- **데이터가 정확하고 일관되며 신뢰할 수 있도록 유지하는 것**
- 데이터베이스 내에서 **오류, 중복, 불일치가 발생하지 않도록 보장**
- 주로 **제약 조건(Constraints)**을 통해 유지됨

#### ✅ **데이터 무결성의 종류**
1. **개체 무결성(Entity Integrity)**: 기본 키(PK)는 **고유해야 하며, NULL이 될 수 없음**
2. **참조 무결성(Referential Integrity)**: 외래 키(FK)는 **존재하는 값만 참조해야 함**
3. **도메인 무결성(Domain Integrity)**: 속성 값은 **허용된 데이터 타입과 범위를 따라야 함**
4. **고유성 무결성(Unique Integrity)**: 특정 속성은 **중복된 값을 가질 수 없음**

#### ✅ **예제**
```sql
-- 개체 무결성 (PK가 NULL이면 안 됨)
CREATE TABLE users (
    id INT PRIMARY KEY,  -- NULL 불가능
    name VARCHAR(50) NOT NULL
);

-- 참조 무결성 (user_id가 users 테이블의 id를 참조해야 함)
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) -- 존재하는 값만 참조 가능
);
```

---

### 2️⃣ 데이터 정합성 (Data Consistency)
- **데이터가 여러 위치에서 일관되게 유지되는 것**
- 분산 시스템이나 다중 데이터베이스 환경에서 중요함
- 무결성이 **제약 조건을 통한 데이터 보장**이라면, **정합성은 시스템 전체에서 데이터가 논리적으로 일치하는 것**

#### ✅ **예제**
- 은행 시스템에서 **A 계좌에서 100만 원을 출금하고 B 계좌에 100만 원을 입금하는 경우**
  - `A.balance -= 1,000,000`
  - `B.balance += 1,000,000`
  - 하나라도 실패하면 트랜잭션을 롤백해야 정합성이 깨지지 않음

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 1000000 WHERE id = 1; -- A 계좌 출금
UPDATE accounts SET balance = balance + 1000000 WHERE id = 2; -- B 계좌 입금

COMMIT;  -- 모든 작업 성공 시 적용
-- 만약 하나라도 실패하면 ROLLBACK;
```

#### ✅ **정합성이 깨지는 사례**
- **중간에 시스템 오류 발생 → 데이터 일부만 반영됨**
- **다중 서버 간 데이터 동기화 실패 → 서버마다 다른 데이터가 존재**

---

### 3️⃣ 데이터 무결성과 정합성의 차이
|  | 데이터 무결성 | 데이터 정합성 |
|---|----------------|----------------|
| 정의 | 데이터가 정확하고 오류가 없도록 유지 | 여러 위치에서 데이터가 논리적으로 일치함 |
| 보장 방식 | 기본 키, 외래 키, 제약 조건 | 트랜잭션, 동기화, ACID 원칙 |
| 적용 예시 | PK, FK, UNIQUE, CHECK | 분산 DB에서 일관된 데이터 유지 |

</details>

<details>
<summary><strong>0312</strong></summary>

## 🔍 엘라스틱서치(Elasticsearch)

### 1️⃣ 엘라스틱서치란?

- **분산형 검색 및 분석 엔진**
- **JSON 기반의 RESTful API** 제공
- **Apache Lucene 기반**으로 개발되어 빠른 검색 성능 제공
- 대량의 데이터를 실시간으로 검색, 색인, 분석하는 데 최적화됨

### 2️⃣ 주요 특징

✅ **고속 검색**: 인덱싱된 데이터를 기반으로 빠른 검색 가능 ✅ **확장성**: 클러스터링을 통해 대량의 데이터를 처리할 수 있음 ✅ **실시간 데이터 처리**: 데이터 저장과 동시에 검색 가능 ✅ **RESTful API 지원**: HTTP 요청을 통해 쉽게 데이터 검색 및 조작 가능 ✅ **분산 아키텍처**: 여러 노드로 구성된 클러스터 운영 가능

### 3️⃣ 기본 개념

#### 📌 **Index (인덱스)**

- 데이터베이스의 테이블과 유사한 개념
- 여러 문서(Document)를 저장하는 공간

#### 📌 **Document (문서)**

- JSON 형식으로 저장되는 데이터 단위
- RDBMS의 행(Row)에 해당

#### 📌 **Shard (샤드) & Replica (복제본)**

- **Shard**: 인덱스를 여러 개로 나눠 분산 저장하는 방식 → **확장성 향상**
- **Replica**: 샤드의 복제본 → **가용성 & 성능 향상**

### 4️⃣ 엘라스틱서치 기본 명령어

#### ✅ **문서 색인 (추가 및 업데이트)**

```bash
PUT /my_index/_doc/1
{
    "name": "엘라스틱서치",
    "category": "검색 엔진",
    "year": 2010
}
```

#### ✅ **문서 검색**

```bash
GET /my_index/_search
{
    "query": {
        "match": {
            "name": "엘라스틱서치"
        }
    }
}
```

#### ✅ **문서 삭제**

```bash
DELETE /my_index/_doc/1
```

### 5️⃣ 엘라스틱서치 활용 사례

- **로그 분석** (ELK Stack: Elasticsearch + Logstash + Kibana)
- **검색 시스템** (이커머스, 블로그, 포털 등)
- **데이터 모니터링 및 분석** (대량의 데이터 실시간 분석)

> 🔥 **정리:** 엘라스틱서치는 빠르고 확장성이 뛰어난 검색 & 분석 엔진으로, 실시간 데이터 처리가 중요한 환경에서 강력한 성능을 발휘함.


</details>

<details>
<summary><strong>0313</strong></summary>

## 📨 아파치 카프카(Apache Kafka)

### 1️⃣ 아파치 카프카란?
- **대용량 데이터 스트리밍을 위한 분산 메시지 브로커**
- **Publisher-Subscriber(발행-구독) 모델 기반**
- **실시간 데이터 처리 및 이벤트 스트리밍**에 최적화
- **분산 아키텍처**로 높은 처리량과 안정성을 제공

### 2️⃣ 주요 특징
✅ **고성능**: 초당 수백만 개의 메시지를 처리 가능
✅ **확장성**: 여러 개의 브로커를 추가하여 시스템 확장 가능
✅ **내결함성**: 데이터 복제(replication) 기능으로 장애 발생 시 복구 가능
✅ **다양한 언어 지원**: Java, Python, Go 등 다양한 클라이언트 라이브러리 제공
✅ **배치 & 실시간 처리 모두 지원**

### 3️⃣ 기본 개념
#### 📌 **Producer (생산자)**
- 데이터를 생성하고 **Kafka로 전송하는 역할**
- 예) 로그 생성기, IoT 센서 데이터, 트랜잭션 기록 등

#### 📌 **Broker (브로커)**
- **Kafka 서버 역할**을 수행하며 메시지를 저장 및 관리
- 여러 개의 브로커가 **클러스터**를 이루어 동작

#### 📌 **Topic (토픽)**
- 메시지가 **전달되는 특정 채널**
- 여러 Producer가 같은 Topic에 데이터를 보낼 수 있음

#### 📌 **Consumer (소비자)**
- 특정 Topic의 메시지를 구독하여 데이터 소비
- Consumer Group을 통해 병렬 처리 가능

#### 📌 **Partition (파티션) & Offset (오프셋)**
- Topic은 **여러 개의 Partition**으로 나뉘며, **병렬 처리 성능을 향상**
- Offset: 각 메시지가 저장된 위치를 의미 (순서 보장 가능)

### 4️⃣ 카프카 기본 명령어
#### ✅ **토픽 생성**
```bash
kafka-topics.sh --create --topic my_topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 2
```

#### ✅ **메시지 전송 (Producer)**
```bash
kafka-console-producer.sh --topic my_topic --bootstrap-server localhost:9092
```

#### ✅ **메시지 소비 (Consumer)**
```bash
kafka-console-consumer.sh --topic my_topic --from-beginning --bootstrap-server localhost:9092
```

### 5️⃣ 카프카 활용 사례
- **로그 및 이벤트 스트리밍** (실시간 로그 처리, 모니터링 시스템)
- **메시지 큐 시스템** (RabbitMQ, ActiveMQ 대체 가능)
- **ETL(Extract, Transform, Load) 파이프라인**
- **IoT 데이터 처리** (센서 데이터 수집 및 분석)
- **Microservices 간 비동기 통신**

> 🔥 **정리:** 카프카는 **고성능, 확장성, 내결함성을 갖춘 분산 메시지 큐 시스템**으로, 실시간 데이터 스트리밍 및 비동기 이벤트 처리에 강력한 성능을 발휘함.

</details>

<details>
<summary><strong>0314</strong></summary>

## 🔄 Kafka를 활용한 Microservices 간 비동기 통신

### 1️⃣ 마이크로서비스 아키텍처(MSA)에서의 통신 방식
- **동기 통신**: REST API, gRPC 등을 사용하여 **즉시 응답을 받는 방식**
- **비동기 통신**: 메시지 큐(Kafka, RabbitMQ 등)를 활용하여 **서비스 간 독립적으로 처리하는 방식**

### 2️⃣ Kafka를 활용한 비동기 통신의 필요성
✅ **서비스 간 결합도 감소** → REST API보다 서비스 간 의존성이 낮음
✅ **비동기 이벤트 처리** → 특정 서비스가 다운되더라도 메시지를 잃지 않음
✅ **고성능 처리** → 대량의 트래픽을 효율적으로 처리 가능
✅ **스케일 아웃 가능** → 서비스가 증가해도 부담 없이 확장 가능

### 3️⃣ Kafka 기반 비동기 통신 구조
- **Producer**: 이벤트를 생성하여 Kafka에 메시지를 전송
- **Broker**: 메시지를 Topic에 저장하고 Consumer에게 전달
- **Consumer**: Topic을 구독하여 이벤트를 소비하고 처리
- **Consumer Group**: 여러 개의 Consumer가 병렬로 메시지를 처리하여 부하 분산 가능

### 4️⃣ Kafka를 이용한 마이크로서비스 예제
#### ✅ **1) 주문 생성 서비스 (Order Service)**
- 사용자가 주문을 생성하면 `order.created` Topic에 이벤트 발행

```java
public void createOrder(Order order) {
    // 주문 저장 로직
    orderRepository.save(order);
    
    // Kafka로 이벤트 발행
    kafkaTemplate.send("order.created", order.getId());
}
```

#### ✅ **2) 결제 서비스 (Payment Service) - Consumer 역할**
- `order.created` 이벤트를 구독하여 자동으로 결제 처리 수행

```java
@KafkaListener(topics = "order.created", groupId = "payment-service")
public void processPayment(String orderId) {
    // 결제 처리 로직
    paymentService.charge(orderId);
}
```

### 5️⃣ Kafka를 활용한 비동기 통신의 장점 & 단점
#### ✅ **장점**
- **서비스 간 낮은 결합도** → 각 서비스가 독립적으로 운영 가능
- **고성능 처리** → 비동기 이벤트 스트리밍으로 높은 처리량 보장
- **데이터 유실 방지** → 메시지 저장 및 재시도 가능

#### ❌ **단점**
- **운영 복잡성 증가** → Kafka 클러스터 관리 필요
- **메시지 순서 보장 어려움** → Partition 구조로 인해 일부 순서가 변경될 수 있음
- **일관성 관리 필요** → 데이터 정합성을 유지하는 추가 로직 필요

### 6️⃣ 마무리
> Kafka를 활용하면 **마이크로서비스 간 비동기 통신을 통해 높은 확장성과 유연성을 확보**할 수 있음. 하지만 운영 및 데이터 일관성 관리에 대한 추가 고려가 필요함.

</details>
</details>

<details>
<summary><strong>3주차</strong></summary>
<details>
<summary><strong>0317</strong></summary>

## 🔍 추상 클래스(Abstract Class) vs 인터페이스(Interface)

### 1️⃣ 추상 클래스란?
- **공통된 필드와 메서드를 포함할 수 있는 클래스**
- **일부 구현이 포함될 수 있으며, 객체 생성이 불가능**
- `abstract` 키워드 사용
- **상속을 통해 기능을 확장**하는 데 사용됨

#### ✅ 예제 (추상 클래스)
```java
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public abstract void makeSound(); // 추상 메서드 (구현 필요)
    
    public void sleep() {
        System.out.println(name + " is sleeping"); // 구현된 메서드
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof Woof");
    }
}
```

### 2️⃣ 인터페이스란?
- **구현해야 할 메서드의 규격(명세)만 정의**
- 모든 메서드는 기본적으로 **추상 메서드**
- **다중 구현**(Multiple Inheritance)이 가능함
- `implements` 키워드를 사용하여 구현

#### ✅ 예제 (인터페이스)
```java
interface Flyable {
    void fly(); // 구현 필요
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Bird is flying");
    }
}
```

### 3️⃣ 추상 클래스 vs 인터페이스 차이점
| 구분 | 추상 클래스 | 인터페이스 |
|------|------------|------------|
| 키워드 | `abstract` | `interface` |
| 메서드 | 일부 구현 가능 | 모든 메서드가 추상 메서드 (Java 8+에서는 default 메서드 허용) |
| 필드 | 인스턴스 변수, 생성자 사용 가능 | 상수만 선언 가능 (`static final`) |
| 상속 | 단일 상속만 가능 | 다중 구현 가능 |
| 목적 | 공통된 속성과 동작을 정의 | 특정 기능을 강제하여 구현 |

### 4️⃣ 구현체(Concrete Class)란?
- **추상 클래스나 인터페이스를 실제로 구현한 클래스**
- 모든 추상 메서드를 오버라이딩해야 함

#### ✅ 예제 (인터페이스 구현체)
```java
class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("Airplane is flying");
    }
}
```

### 5️⃣ 언제 사용해야 할까?
✅ **추상 클래스** → 상속 관계가 있는 클래스들 사이에서 공통된 필드나 메서드를 제공할 때 사용
✅ **인터페이스** → 서로 다른 클래스들에서 **동일한 동작을 강제**하고 싶을 때 사용 (ex. `Comparable`, `Runnable`)

> **🔥 정리:** 추상 클래스는 **공통 기능을 공유하는 용도**, 인터페이스는 **구현 강제**와 **다중 구현 가능성**을 제공하는 특징이 있음!

</details>

<details>
<summary><strong>0318</strong></summary>

## 🔐 로그인 방식: Session vs JWT

### 1️⃣ 로그인 인증 방식이란?
- 사용자가 로그인하면 서버가 인증을 수행하고 **인증 정보를 저장**하는 방식
- 대표적인 방식: **Session 기반 인증, JWT 기반 인증**

---

### 2️⃣ Session 기반 인증
#### ✅ 개념
- 서버가 로그인한 사용자의 정보를 **세션(Session) 객체**에 저장
- 클라이언트는 이후 요청 시 **세션 ID(Session ID)**를 함께 전송
- **세션 ID는 서버에서 관리**되며, 데이터베이스나 메모리에 저장됨

#### ✅ 동작 방식
1. 클라이언트가 **로그인 요청**을 보냄
2. 서버에서 사용자를 인증한 후, **세션 ID를 생성**하여 클라이언트에 반환
3. 클라이언트는 이후 요청 시 **세션 ID를 쿠키에 담아 서버에 전송**
4. 서버는 세션 ID를 확인하여 **사용자 인증을 처리**

#### ✅ 예제 (Spring Boot)
```java
@RequestMapping("/login")
public String login(HttpSession session) {
    session.setAttribute("user", "admin"); // 세션에 사용자 정보 저장
    return "Login successful";
}
```

#### ✅ 장점 & 단점
| 장점 | 단점 |
|------|------|
| 보안성이 높음 (서버가 직접 관리) | 확장성이 낮음 (서버마다 세션을 공유해야 함) |
| 세션 만료 및 강제 로그아웃 가능 | 서버 메모리 사용량 증가 |

---

### 3️⃣ JWT 기반 인증
#### ✅ 개념
- 서버에서 인증된 사용자에게 **JWT(JSON Web Token)**을 발급
- 클라이언트는 이후 요청 시 **JWT를 헤더에 포함하여 전송**
- **서버는 상태를 저장하지 않고** JWT를 검증하여 인증 수행 (Stateless)

#### ✅ 동작 방식
1. 클라이언트가 **로그인 요청**을 보냄
2. 서버가 사용자를 인증한 후, **JWT를 생성**하여 클라이언트에 반환
3. 클라이언트는 이후 요청 시 **JWT를 Authorization 헤더에 포함하여 전송**
4. 서버는 JWT를 검증하여 **사용자 인증을 처리**

#### ✅ 예제 (Spring Boot + JWT)
```java
String token = Jwts.builder()
    .setSubject("user")
    .setIssuedAt(new Date())
    .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1시간 유효
    .signWith(SignatureAlgorithm.HS256, "secret-key")
    .compact();
```

#### ✅ 장점 & 단점
| 장점 | 단점 |
|------|------|
| 서버의 부하가 적음 (Stateless) | 토큰이 탈취되면 보안 문제 발생 가능 |
| 확장성이 뛰어남 (서버 간 인증 정보 공유 가능) | 토큰이 만료될 때까지 무효화 불가 |

---

### 4️⃣ Session vs JWT 비교
| 비교 항목 | Session 방식 | JWT 방식 |
|-----------|-------------|-------------|
| 상태 관리 | 서버에서 세션 저장 | 클라이언트에서 JWT 보관 |
| 확장성 | 낮음 (세션 공유 필요) | 높음 (Stateless) |
| 보안 | 서버 관리로 안전 | 토큰 탈취 시 보안 위험 |
| 인증 속도 | 느림 (DB 조회 필요) | 빠름 (토큰 검증만 수행) |

> **🔥 결론:**
> - **세션 방식**: 보안이 중요하고 트래픽이 낮은 시스템에서 적합
> - **JWT 방식**: 확장성이 필요한 API 기반 시스템에서 적합

</details>

<details>
<summary><strong>0319</strong></summary>

## 🛡️ CSRF & XSS 보안 취약점

### 1️⃣ CSRF (Cross-Site Request Forgery, 사이트 간 요청 위조)
#### ✅ 개념
- 사용자가 **인증된 세션을 이용하여 공격자가 의도한 요청을 서버에 보내는 공격 기법**
- 사용자가 특정 사이트에 로그인한 상태에서 **악의적인 요청이 자동으로 실행됨**
- 공격자는 사용자의 **쿠키 기반 세션을 악용**하여 비정상적인 요청을 서버로 보냄

#### ✅ 공격 시나리오
1. 사용자가 **A 사이트에 로그인**하여 세션이 유지된 상태
2. 사용자가 **악성 사이트(B)에 접속**
3. B 사이트에 포함된 악성 스크립트가 **A 사이트에 요청을 자동 실행**
4. A 사이트는 사용자의 세션을 신뢰하여 **의도치 않은 요청을 수행** (예: 계좌이체, 비밀번호 변경 등)

#### ✅ 방어 방법
✅ **CSRF 토큰 사용** (`_csrf` 토큰을 요청 시 포함하여 검증)
✅ **Referer & Origin 헤더 검사** (외부 사이트에서 요청 차단)
✅ **SameSite 쿠키 설정** (Cross-Origin 요청 제한)

#### ✅ CSRF 방어 코드 예제 (Spring Boot)
```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
}
```

---

### 2️⃣ XSS (Cross-Site Scripting, 크로스 사이트 스크립팅)
#### ✅ 개념
- 공격자가 **웹 페이지에 악성 스크립트를 삽입**하여 사용자 브라우저에서 실행되도록 하는 공격
- 사용자의 **세션 쿠키 탈취, 피싱 공격, 악성 코드 실행** 등이 가능함

#### ✅ XSS 공격 유형
1. **저장형 XSS (Stored XSS)** → 데이터베이스에 저장된 악성 스크립트가 실행됨 (예: 댓글, 게시글)
2. **반사형 XSS (Reflected XSS)** → URL 또는 입력값을 통해 악성 스크립트가 실행됨
3. **DOM 기반 XSS** → 클라이언트 측에서 JavaScript 조작으로 발생

#### ✅ 공격 시나리오 (Reflected XSS)
1. 공격자가 **악성 스크립트가 포함된 URL을 생성**
2. 사용자가 해당 URL을 클릭하면 **브라우저에서 스크립트 실행**
3. 사용자의 **쿠키 탈취, 계정 정보 유출** 등의 피해 발생

#### ✅ 방어 방법
✅ **입력값 검증 (Input Validation)** → `<script>` 태그 필터링
✅ **출력 시 이스케이프 처리 (HTML Encoding)** → `&lt;script&gt;`로 변환
✅ **Content Security Policy (CSP) 적용** → 외부 스크립트 실행 차단

#### ✅ XSS 방어 코드 예제 (Spring Boot + Thymeleaf)
```html
<p th:text="${userInput}"></p> <!-- 자동 HTML 이스케이프 적용 -->
```

---

### 3️⃣ CSRF vs XSS 비교
| 구분 | CSRF (사이트 간 요청 위조) | XSS (크로스 사이트 스크립팅) |
|------|----------------|----------------|
| 공격 대상 | 사용자의 **세션을 악용**하여 서버에 요청 | **사용자의 브라우저에서 악성 스크립트 실행** |
| 공격 방식 | 사용자가 모르게 **원치 않는 요청 실행** | 악성 스크립트를 삽입하여 **브라우저에서 실행** |
| 주요 피해 | 계정 탈취, 금전 거래 조작, 설정 변경 | 쿠키 탈취, 세션 하이재킹, 피싱 공격 |
| 방어 기법 | CSRF 토큰, SameSite 쿠키 설정, Referer 검증 | 입력값 검증, HTML 이스케이프, CSP 적용 |

> **🔥 결론:**
> - CSRF는 **사용자의 인증된 세션을 악용**하는 공격
> - XSS는 **악성 스크립트를 실행**하여 사용자 데이터를 탈취하는 공격
> - 두 가지 모두 웹 애플리케이션 보안에서 반드시 고려해야 하는 취약점임

</details>

<details>
<summary><strong>0320</strong></summary>

## ⚙️ Gradle vs Maven

### 1️⃣ Gradle과 Maven 개요
✅ **Gradle**
- Groovy 또는 Kotlin DSL 기반의 빌드 자동화 도구
- **태스크(Task) 기반**의 빌드 시스템
- 병렬 처리 및 캐싱을 지원하여 **빠른 빌드 속도 제공**
- 플러그인 및 확장성이 뛰어나며 커스텀 빌드 가능

✅ **Maven**
- XML(POM.xml) 기반의 빌드 및 프로젝트 관리 도구
- **라이프사이클(Lifecycle) 기반**의 빌드 구조
- 일관된 프로젝트 구조 제공 (Convention Over Configuration)
- 중앙 저장소(Repository)에서 의존성 관리

---

### 2️⃣ 주요 차이점 비교
| 비교 항목 | **Gradle** | **Maven** |
|-----------|-----------|-----------|
| 설정 방식 | Groovy/Kotlin DSL (`build.gradle`) | XML (`pom.xml`) |
| 빌드 속도 | **빠름** (병렬 빌드 & 캐싱) | 상대적으로 느림 (단일 스레드 실행) |
| 의존성 관리 | 플러그인 및 DSL 활용 | XML 설정 기반 |
| 확장성 | **높음** (커스텀 태스크 추가 가능) | 낮음 (XML 기반 설정) |
| 학습 난이도 | **조금 어려움** (DSL 문법 학습 필요) | 비교적 쉬움 (일관된 구조) |
| 사용 사례 | Android, Kotlin, 최신 프로젝트 | 기존 Java 기반 프로젝트 |

---

### 3️⃣ 기본 설정 예제
#### ✅ **Gradle (build.gradle.kts - Kotlin DSL)**
```kotlin
plugins {
    id("java")
    id("application")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
}
```

#### ✅ **Maven (pom.xml)**
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>2.7.0</version>
    </dependency>
</dependencies>
```

---

### 4️⃣ 언제 사용해야 할까?
✅ **Gradle을 선택해야 하는 경우**
- **빌드 속도가 중요한 프로젝트** (Android, 대규모 프로젝트)
- **확장성과 유연한 빌드 설정이 필요한 경우**
- **Kotlin 및 최신 기술 스택과 함께 사용**할 때

✅ **Maven을 선택해야 하는 경우**
- **전통적인 Java 프로젝트**에서 사용 (Spring Boot 등)
- **구조화된 프로젝트 관리가 필요할 때**
- **팀 내 표준화된 빌드 환경이 중요할 때**

> **🔥 결론:**
> - Gradle은 **빠르고 유연한 빌드 시스템**으로 최신 프로젝트에 적합
> - Maven은 **일관성과 안정성이 중요한 프로젝트**에서 적합

</details>
</details>

<details>
<summary><strong>0324</strong></summary>

## 🧾 Java Record 타입

### 1️⃣ Record란?
- Java 14부터 도입된 **데이터 전용 클래스**를 간결하게 선언할 수 있는 기능 (Java 16부터 정식 지원)
- **불변 객체(immutable object)**를 표현할 때 사용
- DTO, VO 등 **데이터 전달에 특화된 구조**

### 2️⃣ 문법
```java
public record User(String name, int age) {}
```
- 위 한 줄로 다음과 같은 클래스를 자동 생성함:
  - `private final` 필드
  - 생성자
  - `getter` 메서드 (`name()`, `age()` 형태)
  - `equals()`, `hashCode()`, `toString()` 메서드

### 3️⃣ 사용 예제
```java
public record Product(String name, int price) {}

public class Main {
    public static void main(String[] args) {
        Product product = new Product("Laptop", 1200000);
        System.out.println(product.name()); // "Laptop"
        System.out.println(product.price()); // 1200000
    }
}
```

### 4️⃣ 특징
✅ 자동으로 생성되는 메서드들로 **보일러플레이트 코드 감소**
✅ `final` 필드 → **불변 객체** 보장
✅ 클래스 상속 불가 (`final` 클래스)
✅ 인터페이스는 **구현 가능**
✅ `Serializable`, `Comparable` 등 구현 가능

### 5️⃣ 주의사항
- **상속 불가**: `record`는 암묵적으로 `final`이기 때문에 상속할 수 없음
- **필드 추가 불가**: 생성자 외에 새로운 필드 정의 불가 (정적 필드는 가능)
- **기본 목적**은 단순 데이터 컨테이너 역할 (로직 중심 클래스에는 부적합)

### 6️⃣ 사용 예시: Spring에서 DTO로 활용
```java
public record MemberDto(String username, String email) {}
```
- 컨트롤러나 서비스 계층에서 **요청/응답 DTO**로 자주 활용됨

---

> 🔥 **정리:**
> Java의 `record`는 **불변 데이터 객체를 간결하게 표현**할 수 있는 타입으로, DTO나 VO 설계 시 코드의 가독성과 유지보수성을 높여줌

</details>


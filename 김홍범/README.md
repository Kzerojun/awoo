## Today I Learned - 홍범

<details>
<summary><strong>0304</strong></summary>

<h1>Advanced Jenkins 사용하기</h1>

### SonarQube?

SonarQube는 코드 품질을 분석하고 관리하는 오픈소스 플랫폼입니다. 코드의 버그, 취약점, 코드 스멜 등을 자동으로 검출해주어 소프트웨어 품질을 향상시킵니다.
SonarQube 설치 및 설정

```bash
# Docker로 SonarQube 설치
docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
```

### Jenkins와 SonarQube 연동

1. SonarQube 토큰 생성:

   - SonarQube 접속 (http://localhost:9000)
   - Administration > Security > Users에서 토큰 생성

2. Jenkins 설정:

   - SonarQube Scanner 플러그인 설치
   - Jenkins 관리 > 시스템 설정에서 SonarQube 서버 등록
   - 서버 URL과 인증 토큰 설정

### Jenkinsfile에 SonarQube 분석 추가:

```groovy
stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'mvn sonar:sonar -Dsonar.projectKey=my-project -Dsonar.projectName="My Project"'
        }
    }
}

stage('Quality Gate') {
    steps {
        timeout(time: 1, unit: 'HOURS') {
            waitForQualityGate abortPipeline: true
        }
    }
}
```

### Multi Nodes?

Jenkins의 Master-Slave 아키텍처를 사용하면 여러 노드에 빌드 작업을 분산시켜 CI/CD 시스템의 확장성과 성능을 높일 수 있습니다.

### Jenkins Multi-Node 설정

1. 노드 추가:

   - Jenkins 관리 > 노드 관리 > 신규 노드
   - 노드 이름과 유형(Permanent Agent) 설정

2. 노드 연결 설정:

   - 작업 디렉토리: /var/jenkins_home/workspace
   - 레이블: linux, docker 등 용도에 맞게 설정
   - SSH를 통한 연결 방식 선택
   - 호스트 IP와 인증 정보 설정

3. Slave 노드 준비:

```bash
# Java 설치
sudo apt update
sudo apt install openjdk-11-jdk -y

# Jenkins 사용자 및 작업 디렉토리 생성
sudo useradd -m jenkins
sudo mkdir -p /var/jenkins_home/workspace
sudo chown -R jenkins:jenkins /var/jenkins_home
```

4. 특정 노드에서 작업 실행하기:

```groovy
pipeline {
    agent {
        label 'docker'  // 'docker' 레이블이 있는 노드에서 실행
    }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}
```

이러한 설정을 통해 빌드 작업을 여러 노드에 분산시켜 처리하고, 각 빌드 단계에서 코드 품질을 자동으로 검사하여 CI/CD 파이프라인의 효율성과 품질을 높일 수 있습니다.

</details>

<details>
<summary><strong>0305</strong></summary>

# EC2 환경에 배포하기

### 1. Jenkins 서버 설정

#### Maven 설치

```bash
# /opt 디렉토리로 이동
cd /opt


# Maven 다운로드 및 설치
sudo wget https://mirror.navercorp.com/apache/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz
sudo tar -xvf apache-maven-3.9.6-bin.tar.gz
sudo mv apache-maven-3.9.6 maven

# Maven 환경변수 설정
vi ~/.bash_profile
```

#### .bash_profile에 다음 내용 추가:

```
# User specific environment and startup programs
PATH=$PATH:$HOME/.local/bin:$HOME/bin
M2_HOME=/opt/maven
PATH=$PATH:$M2_HOME:$M2_HOME/bin

export PATH
```

```
# 환경변수 적용
source ~/.bash_profile

# Maven 설치 확인
mvn --version
```

#### Jenkins 설치

```bash
# Jenkins 저장소 추가
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# 의존성 패키지 설치
sudo yum install fontconfig java-17-openjdk -y

# Jenkins 및 Git 설치
sudo yum install jenkins git -y

# Jenkins 시작
sudo systemctl start jenkins
sudo systemctl status jenkins
```

### Jenkins 초기 설정

1. EC2 보안 그룹에 8080 포트 추가 (소스: 0.0.0.0/0)
2. 브라우저에서 http://<퍼블릭IP>:8080 접속
3. 초기 관리자 비밀번호 확인 및 입력:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

4. 'Install suggested plugins' 선택
5. 관리자 계정 생성 및 URL 설정

#### 디스크 공간 부족 문제 해결

```bash
# /tmp 디렉토리 크기 2GB로 확장
sudo mount -o remount,size=2G /tmp

# 영구 설정을 위한 fstab 수정
sudo vi /etc/fstab
```

`/etc/fstab`에 추가:

```
tmpfs   /tmp    tmpfs   size=2G,rw,nosuid,nodev    0 0
```

```bash
# Jenkins 재시작
sudo systemctl restart jenkins
```

### 2. Docker 서버 설정

```bash
# EPEL 저장소 추가
sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y

# 시스템 업데이트
sudo dnf update -y

# Docker 설치
sudo yum install -y docker

# Docker 시작
sudo systemctl start docker

# 현재 사용자를 docker 그룹에 추가 (sudo 없이 실행 가능)
sudo usermod -aG docker ec2-user

# 로그아웃 후 다시 로그인하면 sudo 없이 Docker 명령어 사용 가능
docker version
```

### 3. Tomcat 서버 설정

#### Java 설치

```bash
sudo curl -L https://corretto.aws/downloads/latest/amazon-corretto-17-x64-linux-jdk.rpm -o aws_corretto_jdk17.rpm
sudo yum localinstall aws_corretto_jdk17.rpm
```

#### Tomcat 설치

```bash
sudo dnf update -y
cd /opt
sudo wget https://mirror.navercorp.com/apache/tomcat/tomcat-9/v9.0.100/bin/apache-tomcat-9.0.100.tar.gz
sudo tar -xvzf apache-tomcat-9.0.100.tar.gz

# 실행 권한 설정
sudo chmod +x /opt/apache-tomcat-9.0.100/bin/startup.sh
sudo chmod +x /opt/apache-tomcat-9.0.100/bin/shutdown.sh

# Tomcat 시작
sudo /opt/apache-tomcat-9.0.100/bin/startup.sh
```

### Tomcat 관리자 설정

#### 접근 제한 해제:

```bash
sudo vi /opt/apache-tomcat-9.0.100/webapps/manager/META-INF/context.xml
sudo vi /opt/apache-tomcat-9.0.100/webapps/host-manager/META-INF/context.xml
```

#### 각 파일에서 다음 부분 주석 처리:

```xml
<!-- <Valve className="org.apache.catalina.valves.RemoteAddrValve"
         allow="127\\.\\d+\\.\\d+\\.\\d+|::1|0:0:0:0:0:0:0:1" /> -->
```

#### 사용자 및 역할 설정:

```bash
sudo vi /opt/apache-tomcat-9.0.100/conf/tomcat-users.xml
```

#### 다음 내용 추가:

```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<user username="admin" password="admin" roles="manager-gui, manager-script, manager-jmx, manager-status"/>
<user username="deployer" password="deployer" roles="manager-script"/>
<user username="tomcat" password="tomcat" roles="manager-gui"/>
```

#### Tomcat 재시작:

```bash
sudo /opt/apache-tomcat-9.0.100/bin/shutdown.sh
sudo /opt/apache-tomcat-9.0.100/bin/startup.sh
```

### 4. Ansible 서버 설정

```bash
# 시스템 업데이트
sudo dnf update -y

# Ansible 설치
sudo yum install -y ansible

# hosts 파일 설정
cd /etc/ansible/
sudo vi hosts
```

#### `/etc/ansible/hosts` 파일에 다음 내용 추가:

```
[localhost]
localhost

[docker]
172.31.1.37  # Docker 서버 프라이빗 IP

[tomcat]
172.31.1.86  # Tomcat 서버 프라이빗 IP
```

#### SSH 키 기반 인증 설정

```bash
# SSH 키 생성
ssh-keygen -t rsa

# 공개 키 확인
cat ~/.ssh/id_rsa.pub
```

#### 생성된 공개 키를 Docker, Tomcat, Ansible 서버의 ~/.ssh/authorized_keys 파일에 추가:

```bash
vi ~/.ssh/authorized_keys  # 각 서버에서 실행
```

#### 연결 테스트:

```bash
# 직접 SSH 연결 테스트
ssh ec2-user@172.31.1.37  # Docker 서버
ssh ec2-user@172.31.1.86  # Tomcat 서버
ssh ec2-user@localhost    # Ansible 서버

# Ansible ping 테스트
ansible docker -m ping
ansible tomcat -m ping
ansible localhost -m ping
```

#### 학습 내용 정리

1. **Jenkins**: 지속적 통합/배포(CI/CD)를 위한 자동화 서버
2. **Docker**: 컨테이너화된 애플리케이션 실행 환경
3. **Tomcat**: Java 웹 애플리케이션 서버
4. **Ansible**: IT 자동화 도구

</details>

<details>
<summary><strong>0306</strong></summary>

# Gradle로 EC2에 Jenkins 설치 및 Tomcat 배포

### 1. Jenkins 서버에 Gradle 설치

#### 먼저 Jenkins 서버에 Gradle을 설치했다:

```bash
# /opt 디렉토리로 이동
cd /opt

# Gradle 다운로드 및 설치
sudo wget https://services.gradle.org/distributions/gradle-8.6-bin.zip
sudo yum install unzip -y
sudo unzip gradle-8.6-bin.zip
sudo mv gradle-8.6 gradle

# 환경변수 설정
vi ~/.bash_profile
```

#### .bash_profile에 다음 내용 추가:

```
# User specific environment and startup programs
PATH=$PATH:$HOME/.local/bin:$HOME/bin
GRADLE_HOME=/opt/gradle
PATH=$PATH:$GRADLE_HOME/bin

export PATH
```

```bash
# 환경변수 적용 및 확인
source ~/.bash_profile
gradle --version
```

## 2. Jenkins 설치 및 설정

### Jenkins 설치를 위한 패키지 설정:

```bash
# Jenkins 저장소 추가
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Jenkins 및 필요 패키지 설치
sudo yum install jenkins git -y
sudo yum install -y dejavu-sans-fonts fontconfig

# Jenkins 시작
sudo systemctl start jenkins
sudo systemctl status jenkins
```

#### Jenkins 초기 설정:

1. EC2 보안 그룹에 8080 포트 추가 (소스: 0.0.0.0/0)
2. 브라우저에서 http://<퍼블릭IP>:8080 접속
3. 초기 관리자 비밀번호 확인 및 입력:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

4. 'Install suggested plugins' 선택 후 계정 생성

### 3. 시스템 최적화

t2.micro 인스턴스는 리소스가 제한적이므로 두 가지 최적화를 진행했다:
디스크 공간 확장

```bash
# /tmp 디렉토리 크기 2GB로 확장
sudo mount -o remount,size=2G /tmp

# 영구 설정
sudo vi /etc/fstab
# 아래 줄 추가
# tmpfs   /tmp    tmpfs   size=2G,rw,nosuid,nodev    0 0

# Jenkins 재시작
sudo systemctl restart jenkins
```

#### 스왑 메모리 추가

```bash
# 스왑 파일 생성 (2GB)
sudo dd if=/dev/zero of=/swapfile bs=128M count=16
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 스왑 상태 확인
sudo swapon -s

# 영구 설정
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 4. Jenkins 배포 설정

#### 웹 UI에서 아래 설정을 진행했다:

**1. 필요한 플러그인 설치**:

- "Deploy to container" 플러그인 설치

**2. Gradle 도구 설정**:

- Jenkins 관리 → Tools → Gradle installations → Add Gradle
- 이름: Gradle8.6, GRADLE_HOME: /opt/gradle

**3. 새 프로젝트 생성**:

- 새로운 Item → Freestyle Project (My-Tomcat-Project)
- 소스 코드 관리: Git (저장소 URL 입력)
- Build Step: Invoke Gradle script

  - Use Gradle Wrapper 선택 (서버에 Gradle이 설치되어 있지 않아도 됨)
  - Make gradlew executable 체크 (권한 문제 방지)
  - Tasks: clean build

- 빌드 후 조치: Deploy war/ear to a container

  - WAR/EAR 파일: build/libs/\*.war
  - Context path: 애플리케이션 컨텍스트 지정
  - Tomcat URL, 자격증명 입력

#### 학습 내용 정리

1. `Gradle vs Maven`: Gradle은 빌드 속도가 빠르고 설정이 간결하다는 장점이 있다.
2. `Gradle Wrapper`: 프로젝트 내에 포함되는 스크립트로, Gradle이 설치되어 있지 않아도 빌드 가능하다.
3. `서버 자원 최적화`: 작은 인스턴스에서 Jenkins를 실행할 때는 디스크 공간과 스왑 메모리 설정이 중요하다.
4. `배포 자동화`: Jenkins의 Deploy to container 플러그인을 통해 Tomcat 배포를 자동화할 수 있다.

</details>

<details>
<summary><strong>0307</strong></summary>

# Gradle vs Maven

### 1. 기본 개념

#### Maven

- XML 기반 프로젝트 구성
- 2004년에 출시된 Apache의 프로젝트
- 선언적 접근 방식 (What to do)
- POM(Project Object Model) 파일 사용

#### Gradle

- Groovy 또는 Kotlin DSL 기반 스크립트
- 2012년에 출시됨
- 프로그래매틱 접근 방식 (How to do)
- build.gradle 파일 사용

### 2. 문법 및 구성 파일

#### Maven

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.6.3</version>
        </dependency>
    </dependencies>
</project>
```

#### Gradle

```groovy
plugins {
    id 'org.springframework.boot' version '2.6.3'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.example'
version = '1.0.0'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}
```

### 3. 성능 차이

#### 빌드 속도

- `Gradle`:

  - 증분 빌드 기능이 강력함
  - 빌드 캐시를 사용하여 반복 빌드 시간 단축
  - 병렬 실행 지원이 우수
  - 대규모 프로젝트에서 특히 유리

- `Maven`:

  - 일관적이지만 상대적으로 느림
  - 증분 빌드 기능이 제한적
  - 빌드 최적화 옵션이 제한적

#### 메모리 사용

- Gradle은 초기에 더 많은 메모리를 사용하지만, 캐싱으로 인해 반복 빌드에서는 효율적
- Maven은 일반적으로 메모리 사용량이 더 적음

### 4. 의존성 관리

#### Maven

- 중앙 저장소 개념을 도입
- 전이적 의존성(Transitive Dependency) 관리
- 의존성 충돌 해결: "가장 가까운 정의" 규칙
- BOM(Bill of Materials) 개념 제공

#### Gradle

- Maven 저장소 호환
- 더 유연한 의존성 관리 메커니즘
- 동적 버전과 버전 범위 지정 가능
- 세분화된 의존성 구성 (implementation, api, compileOnly 등)
- 의존성 잠금(dependency locking) 기능

### 5. 플러그인 시스템

#### Maven

- 플러그인 구성이 XML 기반으로 제한적
- 광범위한 플러그인 생태계
- 플러그인 구성이 상대적으로 복잡

#### Gradle

- 코드 기반 플러그인 작성 가능
- 커스텀 태스크 정의 용이
- 플러그인 간 상호작용 및 확장 용이
- 빌드 로직 재사용 및 모듈화 우수

### 6. 멀티 모듈 프로젝트

#### Maven

- 계층적인 프로젝트 구조
- 상속 기반 설정 공유
- 모듈 간 의존성 관리가 명시적

#### Gradle

- 더 유연한 멀티 프로젝트 구성
- 설정 공유를 위한 다양한 메커니즘 (상속, 플러그인, 스크립트 적용)
- 조건부 구성 가능

### 7. 커스터마이징

#### Maven

- 라이프사이클이 고정되어 있음
- XML로 인한 커스터마이징 제약
- 빌드 프로세스 확장 시 복잡해짐

#### Gradle

- 태스크 그래프 기반의 유연한 모델
- 코드 기반으로 높은 커스터마이징 가능
- 빌드 로직을 직접 프로그래밍 가능

### 8. 사용 사례별 적합성

#### Maven에 적합한 경우

- 엄격한 표준화가 중요한 경우
- 명확한 규칙과 관례가 필요한 경우
- XML에 익숙한 팀
- 간단하고 작은 프로젝트

#### Gradle에 적합한 경우

- 복잡한 빌드 로직이 필요한 경우
- 대규모 멀티 모듈 프로젝트
- 빌드 성능이 중요한 경우
- Android 개발 (공식 빌드 도구)
- 빌드 자동화 및 CI/CD 고도화

</details>

<details>
<summary><strong>0310</strong></summary>

## War와 Jar의 차이점

### 정의

-JAR는 Java 애플리케이션을 패키징하는 데 사용되는 표준 파일 형식입니다.

- 여러 Java 클래스 파일, 관련 메타데이터 및 리소스(텍스트, 이미지 등)를 하나의 파일로 묶어 배포할 수 있게 해줍니다.
- 기본적으로 ZIP 파일 형식을 기반으로 하며 .jar 확장자를 사용합니다.

### 특징

- Java 클래스 파일, 리소스 파일, 메타데이터, 라이브러리 등을 포함합니다.
- META-INF/MANIFEST.MF 파일을 통해 JAR 파일의 실행 방법 등의 정보를 제공합니다.
- 독립 실행형(standalone) 애플리케이션으로 직접 실행할 수 있습니다(실행 가능한 JAR인 경우).
- java -jar 명령으로 실행 가능합니다.

### 사용 사례

- 독립 실행형 Java 애플리케이션
- 라이브러리나 컴포넌트 배포
- 커맨드 라인 도구
- Spring Boot와 같은 내장 서버를 사용하는 웹 애플리케이션

### WAR(Web Application aRchive) 파일

### 정의

- WAR는 웹 애플리케이션을 패키징하는 데 사용되는 파일 형식입니다.
- 서블릿, JSP 페이지, HTML 파일, JavaScript, CSS 및 웹 애플리케이션에 필요한 기타 리소스를 포함합니다.
- JAR와 마찬가지로 ZIP 형식을 기반으로 하지만 .war 확장자를 사용합니다.

### 특징

- 웹 애플리케이션의 특정 구조를 따라야 합니다(WEB-INF, META-INF 등).
- `WEB-INF/web.xml`(배포 서술자)을 통해 서블릿, 필터, 리스너 등의 설정 정보를 제공합니다.
- 직접 실행할 수 없으며, Tomcat, Jetty, WildFly와 같은 웹 서버나 애플리케이션 서버에 배포해야 합니다.
- 특정 디렉토리 구조를 따라야 합니다:

  - `/` - 웹 리소스 파일(HTML, JSP, 이미지, CSS 등)
  - `/WEB-INF/` - 애플리케이션 설정 및 클래스
  - `/WEB-INF/classes/` - 컴파일된 Java 클래스
  - `/WEB-INF/lib/` - JAR 라이브러리 파일
  - `/META-INF/` - 메타데이터 및 설정 파일

### 사용 사례

- Java EE/Jakarta EE 웹 애플리케이션
- 서블릿/JSP 기반 애플리케이션
- 기존 애플리케이션 서버에 배포해야 하는 웹 애플리케이션

### 실제 사용 예시

#### 1. JAR 파일 빌드 (Maven)

```xml
<packaging>jar</packaging>
```

#### 2. WAR 파일 빌드 (Maven)

```xml
<packaging>war</packaging>
```

#### 3. JAR 파일 빌드 (Gradle)

```groovy
apply plugin: 'java'
```

#### WAR 파일 빌드 (Gradle)

```
apply plugin: 'war'
최근 트렌드
```

- Spring Boot의 등장으로 내장 서버를 포함한 실행 가능한 JAR 파일 형태의 웹 애플리케이션이 많이 사용되고 있습니다.
- 컨테이너화(Docker)와 클라우드 네이티브 애플리케이션의 증가로 독립 실행형 JAR 파일의 인기가 높아졌습니다.
- 전통적인 애플리케이션 서버를 사용하는 기업 환경에서는 여전히 WAR 파일이 많이 사용됩니다.

### 결론

- JAR는 범용 Java 애플리케이션 패키징에 적합하며, 독립적으로 실행할 수 있습니다.
- WAR는 웹 애플리케이션에 특화된 패키징 형식으로, 웹 서버나 애플리케이션 서버에 배포해야 합니다.
- 프로젝트의 특성과 배포 환경에 따라 적절한 패키징 형식을 선택해야 합니다.
- 마이크로서비스와 클라우드 환경에서는 JAR 형식이, 전통적인 엔터프라이즈 환경에서는 WAR 형식이 선호되는 경향이 있습니다.

</details>

<details>
<summary><strong>0311</strong></summary>

# TIL: MSA (Microservice Architecture)

## 개념

오늘 MSA(Microservice Architecture)에 대해 배웠습니다. MSA는 하나의 큰 애플리케이션을 여러 개의 작은 서비스로 나누어 개발하는 아키텍처 방식입니다. 각 서비스는 독립적으로 배포 가능하며, 서로 다른 언어나 데이터베이스를 사용할 수도 있습니다.

## MSA의 주요 특징

- 독립적 배포: 각 서비스는 다른 서비스에 영향을 주지 않고 배포 가능합니다
- 기술 다양성: 각 서비스마다 최적의 기술 스택 선택이 가능합니다
- 탄력성: 한 서비스의 장애가 전체 시스템에 영향을 미치지 않습니다
- 확장성: 필요한 서비스만 선택적으로 확장할 수 있습니다
- 팀 자율성: 각 팀이 담당 서비스를 독립적으로 개발/운영할 수 있습니다

## MSA와 모놀리식 아키텍처 비교

모놀리식 아키텍처는 하나의 큰 코드베이스로 애플리케이션을 구성하는 반면, MSA는 여러 작은 서비스로 분리합니다. 모놀리식은 구현이 간단하지만 확장성과 유지보수에 한계가 있습니다.

## MSA 구현 시 고려사항

- 서비스 간 통신: REST API, gRPC, 메시지 큐 등을 활용합니다
- 데이터 일관성: 트랜잭션 관리와 데이터 정합성 유지가 복잡합니다
- 서비스 발견: 서비스 레지스트리를 통한 동적 서비스 위치 파악이 필요합니다
- API 게이트웨이: 클라이언트 요청 라우팅 및 인증/인가 처리를 담당합니다

## MSA 도입 사례

Netflix, Amazon, Uber 등 대규모 트래픽을 처리해야 하는 기업들이 MSA를 성공적으로 도입했습니다.

## 느낀 점

MSA는 확장성과 유연성 측면에서 강점이 있지만, 복잡성과 운영 오버헤드가 증가합니다. 서비스 규모와 팀 역량을 고려해 적절한 시점에 도입하는 것이 중요하다고 생각합니다.

</details>

<details>
<summary><strong>0312</strong></summary>

# TIL: PWA (Progressive Web Application)

## 개념

오늘 PWA(Progressive Web Application)에 대해 배웠습니다. PWA는 웹과 네이티브 앱의 장점을 결합한 웹 애플리케이션입니다. 웹 기술(HTML, CSS, JavaScript)을 사용하면서도 네이티브 앱과 유사한 사용자 경험을 제공합니다.

## PWA의 주요 특징

- 반응형: 다양한 화면 크기에 맞게 최적화됩니다
- 오프라인 지원: 서비스 워커를 통해 오프라인에서도 동작합니다
- 앱 설치 가능: 홈 화면에 추가하여 앱처럼 실행할 수 있습니다
- 푸시 알림: 웹 푸시 API를 통해 알림을 전송할 수 있습니다
- 안전: HTTPS를 통한 보안 연결을 사용합니다
- 발견 가능: 검색 엔진에서 일반 웹사이트처럼 검색됩니다
- 링크 공유: URL만으로 공유가 가능합니다

## PWA의 핵심 기술

- 서비스 워커(Service Worker): 오프라인 기능과 백그라운드 동기화를 지원하는 JavaScript 파일입니다
- 매니페스트(Web App Manifest): 앱의 이름, 아이콘, 테마 색상 등 메타데이터를 포함하는 JSON 파일입니다
- HTTPS: 보안 연결을 위해 필수적으로 요구됩니다

## 네이티브 앱과의 비교

PWA는 앱 스토어 없이 배포 가능하고 용량이 작으며 설치 과정이 간단합니다. 다만 네이티브 앱보다 기기 기능 접근에 제한이 있고 브라우저 지원 범위에 따라 기능이 달라질 수 있습니다.

## PWA 도입 사례

Twitter Lite, Starbucks, Pinterest 등 많은 기업들이 PWA를 통해 사용자 참여도와 전환율을 높이는 데 성공했습니다.

## 개발 도구

Lighthouse, Workbox 등의 도구를 사용하여 PWA 개발과 성능 측정을 할 수 있습니다.

## 오늘의 느낀 점

PWA는 웹과 앱의 경계를 허물며 개발 비용을 줄이면서도 사용자 경험을 향상시킬 수 있는 훌륭한 대안이라고 생각합니다. 특히 여러 플랫폼에 동시에 서비스를 제공해야 하는 경우 효율적인 접근 방식이 될 수 있습니다.

</details>

<details>
<summary><strong>0313</strong></summary>

# TIL: 쿠버네티스(Kubernetes)

## 개념

오늘 쿠버네티스(Kubernetes 또는 K8s)에 대해 배웠습니다. 쿠버네티스는 컨테이너화된 애플리케이션의 자동 배포, 스케일링, 관리를 위한 오픈소스 플랫폼입니다. 구글에서 개발하여 2014년에 오픈소스로 공개되었으며, 현재는 CNCF(Cloud Native Computing Foundation)에서 관리하고 있습니다.

## 쿠버네티스의 주요 특징

- 자동화된 배포와 롤백: 애플리케이션의 배포와 업데이트 상태를 모니터링하고 자동으로 롤백할 수 있습니다
- 서비스 디스커버리와 로드 밸런싱: 내부 DNS를 사용하여 서비스를 찾고 트래픽을 분산합니다
- 스토리지 오케스트레이션: 로컬 스토리지나 클라우드 스토리지 등 다양한 저장소 시스템을 자동으로 마운트합니다
- 수평적 확장: 간단한 명령이나 UI를 통해 애플리케이션 인스턴스를 확장할 수 있습니다
- 자가 복구: 실패한 컨테이너를 다시 시작하고, 응답하지 않는 컨테이너를 교체합니다
- 시크릿 및 구성 관리: 민감한 정보를 저장하고 관리할 수 있습니다

## 쿠버네티스 아키텍처

- 마스터 노드(컨트롤 플레인): 클러스터를 제어하는 구성요소들이 포함됩니다

  - API 서버: 쿠버네티스 API를 제공하는 컴포넌트입니다
  - 스케줄러: 노드에 파드를 할당합니다
  - 컨트롤러 매니저: 클러스터 상태를 제어합니다
  - etcd: 클러스터의 모든 데이터를 저장하는 분산 키-값 저장소입니다

- 워커 노드: 실제 애플리케이션이 실행되는 노드입니다

  - kubelet: 노드에서 컨테이너가 실행되도록 관리합니다
  - kube-proxy: 네트워크 규칙을 관리합니다
  - 컨테이너 런타임: 컨테이너를 실행하는 소프트웨어입니다

## 쿠버네티스 주요 개념

- 파드(Pod): 쿠버네티스의 가장 작은 배포 단위로, 하나 이상의 컨테이너 그룹입니다
- 서비스(Service): 파드 집합에 대한 접근 방법을 정의합니다
- 디플로이먼트(Deployment): 파드와 레플리카셋에 대한 선언적 업데이트를 제공합니다
- 네임스페이스(Namespace): 클러스터 내에서 리소스 그룹을 분리하는 방법입니다
- 인그레스(Ingress): 클러스터 외부에서 내부 서비스로의 HTTP/HTTPS 라우팅 규칙입니다
- 퍼시스턴트 볼륨(Persistent Volume): 데이터를 저장하기 위한 스토리지 리소스입니다

## 쿠버네티스 사용 사례

많은 기업들이 마이크로서비스 아키텍처(MSA)와 함께 쿠버네티스를 도입하여 복잡한 애플리케이션의 배포와 운영을 자동화하고 있습니다. 특히 대규모 서비스를 운영하는 기업들에게 필수적인 도구가 되었습니다.

## 관련 도구

- kubectl: 쿠버네티스 클러스터를 제어하는 명령줄 도구입니다
- Helm: 쿠버네티스 패키지 관리자입니다
- Prometheus: 모니터링 도구입니다
- Istio: 서비스 메시 구현을 위한 도구입니다

## 오늘의 느낀 점

쿠버네티스는 복잡한 분산 시스템을 효율적으로 관리할 수 있게 해주는 강력한 도구입니다. 학습 곡선이 가파르지만, 규모가 큰 애플리케이션을 운영할 때 가져다주는 이점이 매우 큽니다. 클라우드 네이티브 환경에서의 개발과 운영을 위해 반드시 알아야 할 기술이라고 생각합니다.

</details>

<details>
<summary><strong>0314</strong></summary>

# TIL: GraphQL

## 개념

오늘 GraphQL에 대해 배웠습니다. GraphQL은 Facebook에서 개발한 API를 위한 쿼리 언어로, 클라이언트가 필요한 데이터를 정확히 요청할 수 있게 해주는 기술입니다.

## 주요 특징

- 단일 엔드포인트: 여러 API 엔드포인트 대신 하나의 URL로 - 모든 요청을 처리합니다
- 필요한 데이터만 요청: Over-fetching과 Under-fetching 문제를 해결합니다
- 강력한 타입 시스템: 스키마 정의를 통해 데이터 구조를 명확히 합니다
- 실시간 데이터: Subscription을 통한 실시간 데이터 업데이트가 가능합니다

## 오늘의 느낀 점

REST API에 비해 클라이언트 측에서 더 효율적인 데이터 요청이 가능하다는 점이 인상적이었습니다. 특히 모바일 환경에서 네트워크 사용량을 줄일 수 있는 장점이 있어 유용하게 활용할 수 있을 것 같습니다.

</details>

<details>
<summary><strong>0317</strong></summary>

# 블루 그린 무중단 배포 TIL

### 개념

오늘 `블루 그린 배포`(Blue-Green Deployment)에 대해 학습했다. 이는 무중단 배포 전략 중 하나로, 동일한 두 개의 프로덕션 환경(블루와 그린)을 유지하며 서비스 중단 없이 새 버전을 배포하는 방식이다.

### 작동 방식

1. `두 환경 준비`: 두 개의 동일한 프로덕션 환경을 준비한다 - 블루(현재 라이브)와 그린(새 버전 대기)
2. `새 버전 배포`: 그린 환경에 새 버전을 배포하고 테스트한다
3. `트래픽 전환`: 문제가 없으면 라우터/로드 밸런서 설정을 변경하여 사용자 트래픽을 블루에서 그린으로 전환한다
4. `모니터링`: 그린 환경을 모니터링하며 문제 발생 시 블루 환경으로 즉시 롤백할 수 있다
5. `완료`: 그린 환경이 안정적으로 운영되면 이전 블루 환경은 다음 배포를 위한 그린 환경이 된다

### 장점

- `무중단 배포`: 사용자 경험 중단 없이 새 버전 배포 가능
- `빠른 롤백`: 문제 발생 시 트래픽만 다시 이전 환경으로 전환하면 됨
- `안전성`: 실제 프로덕션 환경과 동일한 환경에서 새 버전을 테스트할 수 있음
- `AB 테스트 가능`: 일부 트래픽만 새 환경으로 전환하여 테스트 가능

### 단점

- `리소스 비용`: 두 개의 동일한 프로덕션 환경을 유지해야 하므로 비용 증가
- `데이터베이스 동기화`: 두 환경 간 데이터베이스 동기화나 마이그레이션이 복잡할 수 있음
- `세션 관리`: 환경 전환 시 사용자 세션 관리에 주의 필요

### 실제 구현 예시

AWS에서는 Elastic Beanstalk, ECS, Route 53과 같은 서비스를 활용하여 블루 그린 배포를 구현할 수 있다. Kubernetes에서는 서비스와 디플로이먼트 개념을 활용해 구현 가능하다.

### 오늘의 학습 포인트

블루 그린 배포는 무중단 배포의 안전하고 효과적인 방법이지만, 리소스 비용과 데이터베이스 관리 측면에서 고려해야 할 사항이 있다. 특히 금융 서비스나 고가용성이 필요한 서비스에 적합한 배포 전략이라 할 수 있다.

</details>

<details>
<summary><strong>0318</strong></summary>

# 카나리 배포 (Canary Deployment) TIL

### 개념

오늘 카나리 배포(Canary Deployment)에 대해 학습했다. 이는 새 버전의 애플리케이션을 점진적으로 배포하는 무중단 배포 전략으로, 일부 사용자에게만 새 버전을 노출시켜 리스크를 최소화하는 방법이다.

### 작동 방식

1. `기존 버전 유지`: 대부분의 서버는 기존 버전 실행 상태 유지
2. `새 버전 배포`: 일부 서버(보통 1~5%)에만 새 버전 배포
3. `모니터링`: 새 버전의 성능, 오류율, 사용자 피드백 등을 면밀히 모니터링
4. `점진적 확대`: 문제가 없으면 새 버전의 서버 비율을 점진적으로 늘림(5% → 20% → 50% → 100%)
5. `완료`: 모든 서버가 새 버전으로 교체되면 배포 완료

### 장점

- `리스크 최소화`: 전체 사용자가 아닌 일부만 영향받음
- `실시간 검증`: 실제 프로덕션 환경에서 새 버전 테스트 가능
- `점진적 롤아웃`: 문제 발견 시 영향 범위 최소화
- `A/B 테스트 가능`: 사용자 반응에 따라 기능 출시 여부 결정 가능

### 단점

- `복잡성`: 트래픽 분산 및 버전 관리가 복잡함
- `시간`: 전체 배포 완료까지 시간이 오래 걸림
- `모니터링 필수`: 효과적인 모니터링 시스템 필요

### 실제 구현 예시

Kubernetes에서는 서비스와 인그레스 설정을 통해, AWS에서는 Route 53 가중치 기반 라우팅이나 ECS 서비스 배포 설정으로 구현할 수 있다. 또한 Istio와 같은 서비스 메시를 사용하면 더 세밀한 트래픽 제어가 가능하다.

</details>

<details>
<summary><strong>0319</strong></summary>

# 배포 파이프라인 (Deployment Pipeline) TIL

### 개념

오늘 배포 파이프라인(Deployment Pipeline)에 대해 공부했다. 이는 코드 변경사항이 버전 관리 시스템에서 프로덕션 환경까지 자동화된 단계를 거쳐 배포되는 지속적 통합/지속적 배포(CI/CD) 프로세스의 핵심 구성 요소이다.

### 주요 단계

1. `소스 단계`: 코드 변경사항 감지 및 소스 관리
2. `빌드 단계`: 코드 컴파일, 단위 테스트 실행
3. `테스트 단계`: 통합 테스트, 시스템 테스트, 성능 테스트 등 실행
4. `스테이징 단계`: 프로덕션과 유사한 환경에서 테스트
5. `배포 단계`: 프로덕션 환경에 애플리케이션 배포
6. `모니터링 단계`: 배포 후 시스템 모니터링

### 장점

- `자동화`: 수동 작업 최소화로 인적 오류 감소
- `일관성`: 모든 환경에서 동일한 프로세스로 배포
- `신속성`: 개발에서 배포까지 시간 단축
- `피드백 루프`: 각 단계마다 피드백을 통한 품질 향상
- `추적성`: 모든 변경사항 추적 가능

### 구현 도구

- `CI/CD 도구`: Jenkins, GitLab CI, GitHub Actions, CircleCI, ArgoCD
- `컨테이너화`: Docker, Kubernetes
- `인프라 자동화`: Terraform, AWS CloudFormation
- `모니터링`: Prometheus, Grafana, ELK 스택

### 파이프라인 설계 원칙

- `단일 책임`: 각 단계는 명확한 하나의 책임만 가짐
- `멱등성`: 동일한 입력에 대해 항상 동일한 결과 보장
- `병렬화`: 가능한 단계는 병렬로 실행하여 시간 단축
- `실패 관리`: 파이프라인 실패 시 명확한 피드백 제공
- `가시성`: 모든 단계의 상태와 결과를 쉽게 확인 가능
</details>

<details>
<summary><strong>0320</strong></summary>

# TIL: Jenkins Pipeline에서 Credentials 관리하기

## 학습 내용

> 오늘은 Jenkins 파이프라인에서 민감한 정보(API 키, 비밀번호, IP 주소 등)를 안전하게 관리하는 방법을 배웠습니다.
> <br>Jenkins의 Credentials 시스템을 활용하면 파이프라인 스크립트에 직접 민감한 정보를 하드코딩하지 않고도 필요한 곳에서 안전하게 사용할 수 있습니다.

### Jenkins Credentials 시스템

Jenkins Credentials 시스템은 다음과 같은 민감한 정보를 안전하게 저장하고 관리할 수 있게 해줍니다:

- 사용자 이름과 비밀번호
- SSH 키
- API 토큰
- 비밀 텍스트 (Secret Text)
- 파일 (인증서 등)

### Credentials 생성 방법

1. Jenkins 대시보드에서 "Manage Jenkins" > "Manage Credentials" 로 이동
2. 적절한 도메인 선택 후 "Add Credentials" 클릭
3. 필요한 Credential 유형 선택 (예: Secret text, Username with password 등)
4. 필요한 정보 입력 및 ID 지정 (ID는 파이프라인에서 참조할 식별자)
5. "Create" 버튼 클릭

### Pipeline에서 Credentials 사용하기

- 환경 변수로 정의하기

  ```groovy
  environment {
      // Secret Text 타입의 Credential 사용
      API_KEY = credentials('api-key-credential-id')

      // Username/Password 타입의 Credential 사용
      DB_CREDS = credentials('db-credentials-id')

      // 다른 환경 변수와 함께 사용
      DOCKER_TAG = "${env.BUILD_NUMBER}"
  }
  ```

- Credentials 활용 예시
  ```groovy
  stage('Create Environment File') {
      steps {
          dir('front') {
              // API 키를 .env 파일에 저장
              sh '''
                  echo "NEXT_PUBLIC_KAKAO_MAP_API_KEY=${KAKAO_MAP_API_KEY}" > .env
                  echo ".env 파일이 생성되었습니다."
              '''
          }
      }
  }
  ```
  ```groovy
  stage('Docker Login') {
      steps {
          // Docker Hub 로그인에 credential 사용
          sh "echo ${DOCKER_HUB_CREDS_PSW} | docker login -u ${DOCKER_HUB_CREDS_USR} --password-stdin"
      }
  }
  ```

### Username/Password Credential 사용 시 주의사항

Username/Password 타입의 Credential을 사용할 때는 다음 변수에 자동으로 값이 할당됩니다:

- `${CREDS_ID}` - Credential ID 전체 (거의 사용되지 않음)
- `${CREDS_ID_USR}` - 사용자 이름 부분
- `${CREDS_ID_PSW}`- 비밀번호 부분

예: `DB_CREDS = credentials('db-credentials')` 라면

- `${DB_CREDS_USR}` - DB 사용자 이름
- `${DB_CREDS_PSW}` - DB 비밀번호

### Credentials 사용의 장점

1. 보안 강화: 민감한 정보가 파이프라인 스크립트에 직접 노출되지 않음
2. 로그 보호: Jenkins는 자동으로 로그에서 credential 값을 마스킹 처리
3. 중앙 관리: 모든 credential을 한 곳에서 관리하고 필요할 때 업데이트 가능
4. 권한 관리: 특정 사용자만 특정 credential에 접근할 수 있도록 권한 설정 가능
</details>

<details>
<summary><strong>0321</strong></summary>

# Apache Kafka와 ZooKeeper TIL

## Kafka 개요

> Apache Kafka는 높은 처리량과 낮은 지연 시간을 제공하는 분산 이벤트 스트리밍 플랫폼이다. LinkedIn에서 처음 개발되었으며, 현재는 Apache Software Foundation의 오픈소스 프로젝트로 유지되고 있다. 실시간 데이터 파이프라인과 스트리밍 애플리케이션을 구축하는 데 널리 사용된다.

## Kafka의 주요 구성 요소

1. `Producer`: 데이터를 생성하고 Kafka 클러스터로 전송하는 클라이언트
2. `Consumer`: Kafka 클러스터에서 데이터를 구독하고 처리하는 클라이언트
3. `Topic`: 메시지를 카테고리별로 구분하는 단위, 데이터 스트림의 논리적 채널
4. `Partition`: 각 토픽이 분할되는 단위로, 병렬 처리와 확장성을 위해 사용
5. `Broker`: Kafka 서버로, 클러스터를 구성하는 개별 노드
6. `Consumer Group`: 여러 Consumer가 협력하여 토픽의 메시지를 처리하는 그룹

## Kafka의 특징

- `고성능`: 디스크 기반 지속성에도 불구하고 높은 처리량 제공
- `확장성`: 수평적 확장이 용이한 분산 시스템
- `내구성`: 메시지가 디스크에 저장되어 데이터 손실 방지
- `고가용성`: 복제를 통한 내결함성 제공
- `실시간 처리`: 스트림 처리 애플리케이션 지원

## ZooKeeper 개요

> Apache ZooKeeper는 분산 애플리케이션을 위한 조정 서비스다. 분산 시스템의 구성 정보 관리, 이름 지정, 동기화, 그룹 서비스 등을 제공한다. Kafka를 포함한 많은 분산 시스템에서 메타데이터 관리와 리더 선출에 사용된다.

## ZooKeeper의 주요 기능

- `구성 관리`: 분산 시스템의 설정 정보 중앙화
- `리더 선출`: 분산 시스템에서 마스터 노드 선출 메커니즘 제공
- `동기화 서비스`: 분산 노드 간 데이터 일관성 유지
- `이름 서비스`: 분산 시스템의 리소스 네이밍 제공
- `분산 잠금`: 공유 리소스에 대한 동시 접근 제어

## Kafka와 ZooKeeper의 관계

Kafka는 전통적으로 다음과 같은 작업을 위해 ZooKeeper에 의존했다:

- 브로커 관리(추가/제거)
- 토픽 구성 관리
- 파티션 리더 선출
- 클러스터 멤버십 관리
- ACL(Access Control List) 관리

그러나 최근 Kafka 버전(2.8+)에서는 KRaft(Kafka Raft) 모드를 도입하여 ZooKeeper 의존성을 제거하고 있다. KRaft 모드에서는 Kafka 자체 내에서 메타데이터 관리와 리더 선출을 처리한다.

## 실제 활용 사례

- `로그 집계`: 다양한 서비스에서 발생하는 로그를 중앙화
- `메시징 시스템`: 비동기 통신을 위한 메시지 브로커
- `활동 추적`: 사용자 행동 데이터 실시간 수집
- `IoT 데이터 처리`: 센서 데이터 스트림 수집 및 처리
- `이벤트 소싱`: 이벤트 기반 아키텍처의 기반

## 오늘의 학습 포인트

> Kafka와 ZooKeeper는 대규모 분산 시스템에서 중요한 역할을 담당하지만, Kafka는 점차 ZooKeeper 의존성을 줄이는 방향으로 발전하고 있다. 특히 실시간 데이터 처리와 이벤트 기반 아키텍처가 중요해지는 현대 시스템에서 Kafka의 역할이 더욱 중요해지고 있으며, 이를 효율적으로 활용하기 위한 아키텍처 설계가 중요하다.

</details>

<details>
<summary><strong>0324</strong></summary>

# TIL : Redux 기본 개념

> Redux는 JavaScript 애플리케이션의 상태 관리 라이브러리입니다. Redux의 핵심은 애플리케이션의 상태를 단일 스토어(store)에 저장하는 것입니다. 이 접근법은 상태 변화를 예측 가능하게 만들어 디버깅과 테스트를 용이하게 합니다. Redux는 세 가지 핵심 원칙을 따릅니다:

1. `단일 진리의 원천(Single Source of Truth)`: 애플리케이션의 전체 상태는 하나의 스토어에 객체 트리 형태로 저장됩니다.
2. `상태는 읽기 전용(State is Read-Only)`: 상태를 변경하는 유일한 방법은 액션(action)을 발생시키는 것입니다.
3. `변경은 순수 함수로 작성(Changes are made with Pure Functions)`: 리듀서(reducer)는 이전 상태와 액션을 받아 새로운 상태를 반환하는 순수 함수입니다.
</details>

<details>
<summary><strong>0325</strong></summary>

# TIL : Redux의 핵심 구성 요소

Redux는 다음과 같은 핵심 구성 요소로 이루어져 있습니다:

1. `액션(Actions)`: 무엇이 일어났는지 설명하는 객체입니다. 반드시 type 속성을 가져야 하며, 추가 데이터를 포함할 수 있습니다.
   ```js
   { type: 'ADD_TODO', text: '리덕스 공부하기' }
   ```
2. `리듀서(Reducers)`: 현재 상태와 액션을 받아 새로운 상태를 반환하는 순수 함수입니다.
   ```js
   function todoReducer(state = [], action) {
     switch (action.type) {
       case "ADD_TODO":
         return [...state, { text: action.text, completed: false }];
       default:
         return state;
     }
   }
   ```
3. `스토어(Store)`: 애플리케이션의 상태를 보관하고, 상태에 접근하게 해주며, 상태를 업데이트할 수 있게 해주는 객체입니다.
`js
    import { createStore } from 'redux';
    const store = createStore(todoReducer);
    `
</details>

<details>
<summary><strong>0326</strong></summary>

# TIL : Redux 미들웨어와 비동기 작업

> Redux 미들웨어는 액션이 디스패치되어 리듀서에 도달하기 전에 가로채는 방법을 제공합니다. 미들웨어는 특히 비동기 작업(API 호출 등)을 처리할 때 유용합니다.
> 가장 널리 사용되는 미들웨어는 다음과 같습니다:

1. `Redux Thunk`: 액션 생성자가 객체 대신 함수를 반환할 수 있게 해줍니다. 이 함수는 dispatch와 getState를 인자로 받아 비동기 작업을 수행할 수 있습니다.

   ```js
   const fetchData = () => {
     return async (dispatch) => {
       dispatch({ type: "FETCH_DATA_START" });
       try {
         const response = await fetch("/api/data");
         const data = await response.json();
         dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
       } catch (error) {
         dispatch({ type: "FETCH_DATA_ERROR", error });
       }
     };
   };
   ```

2. `Redux Saga`: 제너레이터 함수를 사용하여 비동기 흐름을 더 쉽게 테스트하고 관리할 수 있게 해줍니다.
3. `Redux Observable`: RxJS의 강력한 Observable을 Redux와 통합하여 복잡한 비동기 작업을 처리합니다.
</details>

<details>
<summary><strong>0327</strong></summary>

# TIL : Redux Toolkit과 최신 Redux 패턴

> Redux Toolkit은 Redux를 사용할 때 필요한 보일러플레이트 코드를 줄이고, 일반적인 작업을 단순화하기 위해 만들어진 공식 도구입니다.
> 주요 기능:

1. `configureStore()`: Redux 개발자 도구 설정, 미들웨어 추가 등이 자동으로 이루어집니다.
   ```js
   import { configureStore } from "@reduxjs/toolkit";
   const store = configureStore({ reducer: rootReducer });
   ```
2. `createSlice()`: 리듀서 로직과 액션 생성자를 함께 정의할 수 있습니다.

   ```js
   import { createSlice } from "@reduxjs/toolkit";

   const todosSlice = createSlice({
     name: "todos",
     initialState: [],
     reducers: {
       addTodo: (state, action) => {
         state.push({ text: action.payload, completed: false });
       },
       toggleTodo: (state, action) => {
         const todo = state.find((todo) => todo.id === action.payload);
         if (todo) {
           todo.completed = !todo.completed;
         }
       },
     },
   });

   export const { addTodo, toggleTodo } = todosSlice.actions;
   export default todosSlice.reducer;
   ```

3. `Immer 통합`: 불변성을 쉽게 유지할 수 있게 해줍니다. 위 예제에서 state.push()와 같은 변이 코드는 실제로는 불변 업데이트로 변환됩니다.
4. `createAsyncThunk()`: 비동기 작업을 위한 액션 생성자를 간편하게 만들 수 있습니다.

   ```js
   import { createAsyncThunk } from "@reduxjs/toolkit";

   export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
     const response = await fetch("/api/todos");
     return response.json();
   });
   ```

이러한 최신 도구와 패턴은 Redux의 복잡성을 크게 줄이고, 더 간결하고 유지보수하기 쉬운 코드를 작성할 수 있게 도와줍니다.

</details>

<details>
<summary><strong>0328</strong></summary>

# Docker 컨테이너 타임존(Timezone) 설정 방법

> Docker 컨테이너는 기본적으로 UTC를 사용하지만, 로그 분석이나 지역 특화 서비스 운영을 위해 특정 지역 시간대 설정이 필요합니다.

### 일반적인 Linux 컨테이너 (Ubuntu/Debian)

```dockerfile
# 타임존 패키지 설치 및 설정
ENV TZ=Asia/Seoul
RUN apt-get update && apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone
```

### Alpine 기반 이미지

```dockerfile
# 경량 Alpine에서는 tzdata 패키지 별도 설치 필요
ENV TZ=Asia/Seoul
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone
```

### Java 애플리케이션

```dockerfile
# OS 레벨 + JVM 레벨 설정 모두 필요
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]
```

### 런타임 설정 방법

```bash
# 환경변수로 설정
docker run -e TZ=Asia/Seoul ...

# 호스트 타임존 파일 마운트
docker run -v /etc/localtime:/etc/localtime:ro ...
```

### 설정 확인하기

```bash
docker exec <컨테이너_이름> date
docker exec <컨테이너_이름> cat /etc/timezone
```

적절한 타임존 설정으로 로그 타임스탬프와 시간 관련 기능들이 의도한 대로 동작하게 됩니다.

</details>

<details>
<summary><strong>0331</strong></summary>

# TIL: Idempotency-Key와 안전한 API 거래

### Idempotency-Key란?

> Idempotency-Key는 API 요청의 중복 처리를 방지하기 위한 HTTP 헤더입니다. "멱등성(idempotent)"이란 동일한 요청을 여러 번 수행해도 결과가 달라지지 않는 특성을 의미합니다. 예를 들어, 동일한 금액의 결제 요청이 네트워크 문제로 중복 전송되었을 때 실제로는 한 번만 처리되도록 보장하는 메커니즘입니다.

### 왜 필요한가?

결제, 송금, 충전과 같은 금융 거래에서 중복 처리는 심각한 문제를 일으킬 수 있습니다:

1. `네트워크 불안정성`: 사용자가 결제 버튼을 클릭했으나 네트워크 오류로 응답을 받지 못해 다시 시도한 경우
2. `다중 클릭`: 사용자가 실수로 버튼을 여러 번 클릭한 경우
3. `자동 재시도`: 클라이언트 라이브러리가 요청 실패 시 자동으로 재시도하는 경우
   이러한 상황에서 Idempotency-Key가 없다면 중복 결제나 중복 송금이 발생할 수 있습니다.

### 어떻게 작동하는가?

1. `고유 키 생성`: 클라이언트는 각 요청마다 고유한 UUID를 생성합니다.
   ```javascript
   const idempotencyKey = "d7c9e289-4b49-4eae-b871-a9f3c63e5a04";
   ```
2. `헤더에 포함`: 이 키를 HTTP 요청 헤더에 포함시킵니다.
   ```javascript
   headers: {
     "Idempotency-Key": idempotencyKey
   }
   ```
3. `서버 처리`: 서버는 이 키를 기반으로 요청을 식별합니다.

- 해당 키로 첫 요청 시: 정상적으로 처리하고 키와 결과를 저장
- 동일한 키로 재요청 시: 실제 처리를 건너뛰고 저장된 결과를 반환

### 구현 시 고려사항

1. `유효 기간`: Idempotency-Key의 유효 기간은 서비스 특성에 맞게 설정해야 합니다. 일반적으로 24시간 정도가 적절합니다.
2. `저장소`: 키와 응답을 저장할 인프라가 필요합니다(Redis, 데이터베이스 등).
3. `복구 가능성`: 서버 장애 시에도 Idempotency-Key 정보가 보존되어야 합니다.
4. `클라이언트 측 관리`: 동일한 트랜잭션에는 항상 동일한 키를 사용하고, 새 트랜잭션에는 새 키를 생성해야 합니다.

### 실제 사용 예시

멍페이 충전과 송금에서의 사용:

```javascript
// 멍페이 충전 함수
export const chargePayment = async (amount: number) => {
  // UUID v4 형식 생성
  const idempotencyKey = generateUUID();

  try {
    const res = await axiosInstance.post(
      "/payments/charges",
      { amount },
      {
        headers: { "Idempotency-Key": idempotencyKey },
      }
    );
    return res.data;
  } catch (err) {
    console.error("멍페이 충전 실패:", err);
    throw err;
  }
};
```

### 주요 사용처

- `결제 API`: Stripe, PayPal 등 대부분의 결제 시스템
- `송금 API`: 은행 송금, 디지털 화폐 거래
- `주문 시스템`: 전자상거래 주문 처리
- `리소스 프로비저닝`: 클라우드 리소스 생성

### 결론

> Idempotency-Key는 금융 트랜잭션이나 중요한 API 작업에서 중복 실행을 방지하는 필수적인 메커니즘입니다. 사용자에게 안전한 거래 경험을 제공하면서도 백엔드 시스템을 보호하는 역할을 합니다. 특히 결제, 송금과 같은 금융 작업에서는 반드시 적용해야 하는 패턴입니다.

</details>

<details>
<summary><strong>0401</strong></summary>

# React Query (TanStack Query) TIL

### 기본 개념과 설정

> React Query는 서버 상태 관리를 위한 강력한 도구로, 데이터 fetching, 캐싱, 동기화, 업데이트를 효율적으로 처리합니다. 기존의 Redux나 다른 전역 상태 관리 라이브러리와 달리, React Query는 서버 데이터 관리에 특화되어 있습니다.

```javascript
// 설치
// npm install @tanstack/react-query
// 또는
// yarn add @tanstack/react-query

// 기본 설정
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

### 데이터 쿼리하기 (useQuery)

`useQuery` 훅은 데이터를 가져오는 기본적인 방법을 제공합니다.

```javascript
import { useQuery } from "@tanstack/react-query";

function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("https://api.example.com/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

- `queryKey`: 쿼리 결과를 캐싱하고 참조하는 데 사용되는 고유 식별자
- `queryFn`: 데이터를 가져오는 비동기 함수
- `반환값`: data, isLoading, error 등의 상태 정보

### 데이터 변이하기 (useMutation)

useMutation은 서버 데이터를 생성/업데이트/삭제하는 데 사용됩니다.

```javascript
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await fetch("https://api.example.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      return response.json();
    },
    onSuccess: () => {
      // 성공 시 'posts' 쿼리 무효화하여 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    mutation.mutate({ title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="제목" />
      <textarea name="body" placeholder="내용" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "게시 중..." : "게시하기"}
      </button>
    </form>
  );
}
```

### 고급 기능: 쿼리 무효화 및 리패치

React Query는 캐시된 데이터를 무효화하고 새로운 데이터를 가져오는 강력한 메커니즘을 제공합니다.

```javascript
// 특정 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['posts'] });

// 특정 ID의 쿼리만 무효화
queryClient.invalidateQueries({ queryKey: ['post', 5] });

// 접두어로 시작하는 모든 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['posts'] });
쿼리 옵션과 캐싱 전략
React Query는 다양한 쿼리 옵션을 통해 캐싱 동작을 세밀하게 제어할 수 있습니다.
javascript복사const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  // 쿼리 옵션들
  staleTime: 60000, // 데이터가 'stale'(오래된)로 간주되기 전 시간(ms)
  cacheTime: 300000, // 미사용 쿼리가 캐시에서 제거되기까지 시간(ms)
  retry: 3, // 실패 시 재시도 횟수
  retryDelay: 1000, // 재시도 간 지연 시간(ms)
  refetchOnWindowFocus: true, // 창 포커스 시 자동 리패치
  refetchOnMount: true, // 컴포넌트 마운트 시 자동 리패치
  refetchOnReconnect: true, // 네트워크 재연결 시 자동 리패치
  enabled: isLoggedIn, // 조건부 쿼리 실행
});
```

### 의존적 쿼리 (Dependent Queries)

하나의 쿼리 결과에 따라 다른 쿼리가 실행되어야 하는 경우에 유용합니다.

```javascript
// 사용자 정보를 먼저 가져옴
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});

// 사용자 정보가 있을 때만 프로젝트 정보 가져옴
const { data: projects } = useQuery({
  queryKey: ["projects", user?.id],
  queryFn: () => fetchProjects(user.id),
  // user가 있을 때만 활성화
  enabled: !!user,
});
```

React Query는 복잡한 서버 상태 관리를 간단하게 만들어주며, 데이터 동기화, 로딩 상태 관리, 에러 처리, 캐싱 등의 기능을 효율적으로 제공하는 강력한 라이브러리입니다.

</details>

<details>
<summary><strong>0402</strong></summary>

# Prometheus와 Grafana에 대한 TIL (Today I Learned)

## Prometheus

### 개요

> Prometheus는 2012년 SoundCloud에서 개발되어 현재는 CNCF(Cloud Native Computing Foundation)의 두 번째 졸업 프로젝트로, 쿠버네티스 다음으로 중요한 위치를 차지하고 있는 오픈 소스 모니터링 및 알림 시스템입니다. 시계열 데이터베이스를 기반으로 메트릭을 수집하고 저장하는 데 특화되어 있으며, 컨테이너화된 환경과 마이크로서비스 아키텍처에서 특히 효과적으로 작동합니다.

### 주요 특징

- `Pull 방식 아키텍처`: 다른 모니터링 시스템과 달리, Prometheus는 모니터링 대상(타겟)으로부터 메트릭을 직접 가져오는 방식을 사용합니다. 이러한 접근법은 중앙 집중식 구성을 단순화하고 장애 발견을 용이하게 합니다.
- `강력한 데이터 모델`: 모든 메트릭은 이름과 키-값 쌍의 레이블을 가진 시계열로 식별됩니다. 이 다차원 데이터 모델은 유연한 쿼리와 집계를 가능하게 합니다.
- `PromQL`: Prometheus만의 강력한 쿼리 언어로, 시계열 데이터에 대한 복잡한 집계 및 계산을 수행할 수 있습니다.
  내장된 알림 시스템: AlertManager 컴포넌트를 통해 알림 규칙을 정의하고 다양한 채널(이메일, Slack, PagerDuty 등)로 전송할 수 있습니다.
- `서비스 디스커버리`: 정적 구성 외에도 동적 환경에서 모니터링 대상을 자동으로 발견할 수 있습니다. Kubernetes, Consul, AWS EC2 등 다양한 서비스 디스커버리 메커니즘을 지원합니다.
- `효율적인 저장`: 자체 저장소를 통해 시계열 데이터를 효율적으로 압축하여 저장합니다.

### 아키텍처

Prometheus 시스템은 다음과 같은 컴포넌트로 구성됩니다:

- `Prometheus` 서버: 메트릭을 수집하고 저장하는 핵심 구성 요소
- `Client Libraries`: 애플리케이션을 계측하기 위한 다양한 언어 지원 라이브러리
- `Pushgateway`: 단기 작업의 메트릭을 저장하기 위한 컴포넌트
- `Exporters`: 써드파티 시스템의 메트릭을 Prometheus 형식으로 변환하는 도구
- `AlertManager`: 알림 처리 및 라우팅을 담당하는 컴포넌트
- `다양한 지원 도구`: 데이터 처리와 시각화를 위한 다양한 도구

## Grafana

### 개요

> Grafana는 2014년에 출시된 오픈 소스 데이터 시각화 및 모니터링 플랫폼으로, 시계열 데이터를 아름다운 그래프와 대시보드로 표현하는 데 특화되어 있습니다. 다양한 데이터 소스와 연결하여 통합 모니터링 환경을 제공하며, 특히 Prometheus와 함께 사용될 때 강력한 모니터링 솔루션을 구성합니다.

### 주요 특징

- `다양한 데이터 소스 지원`: Prometheus, Elasticsearch, InfluxDB, MySQL, PostgreSQL 등 수십 가지의 데이터 소스와 연결 가능합니다.
- `유연한 대시보드 생성 도구`: 드래그 앤 드롭 인터페이스로 사용자 정의 패널과 그래프를 쉽게 생성할 수 있습니다.
- `풍부한 시각화 옵션`: 시계열 그래프, 히스토그램, 히트맵, 게이지, 파이 차트 등 다양한 시각화 옵션을 제공합니다.
- `알림 시스템`: 특정 조건이 충족될 때 알림을 트리거하고 다양한 채널로 전송할 수 있습니다.
- `사용자 인증 및 권한 관리`: LDAP, OAuth, 데이터베이스 등 다양한 인증 방법을 지원하며, 세밀한 권한 제어가 가능합니다.
- `대시보드 템플릿과 변수`: 재사용 가능한 대시보드 템플릿을 만들고 변수를 통해 동적으로 데이터를 필터링할 수 있습니다.
- `커뮤니티 플러그인`: 풍부한 커뮤니티 기반 플러그인 생태계를 통해 추가 기능을 확장할 수 있습니다.

### 사용 시나리오

- `시스템 모니터링`: 서버, 네트워크, 애플리케이션의 성능 및 상태 모니터링
- `비즈니스 인텔리전스`: 비즈니스 메트릭과 KPI를 시각화하고 추적
- `IoT 데이터 시각화`: 센서 및 장치에서 수집된 데이터 모니터링
- `애플리케이션 성능 모니터링`: 애플리케이션의 응답 시간, 오류율 등을 추적

## Prometheus와 Grafana의 통합

### 워크플로우

1. `데이터 수집`: Prometheus가 타겟 시스템에서 메트릭을 스크래핑
2. `데이터 저장`: 수집된 메트릭이 Prometheus의 시계열 데이터베이스에 저장
3. `데이터 연결`: Grafana에서 Prometheus를 데이터 소스로 추가
4. `쿼리 작성`: PromQL을 사용하여 필요한 데이터를 쿼리
5. `시각화`: 쿼리 결과를 다양한 패널과 그래프로 시각화
6. `알림 설정`: 중요한 이벤트에 대한 알림 규칙 구성

### 장점

- `완전한 모니터링 솔루션`: Prometheus의 강력한 데이터 수집 기능과 Grafana의 뛰어난 시각화 기능을 결합하여 종합적인 모니터링 솔루션 구성
- `유연한 확장성`: 수십 수백 개의 서비스와 노드로 확장 가능
- `커뮤니티 지원`: 대규모 커뮤니티 지원과 풍부한 문서 및 리소스 제공
- `클라우드 네이티브 환경 최적화`: 쿠버네티스, 도커 등의 컨테이너 환경에 특화된 모니터링 제공

### 실제 구현 예시

1. `인프라 모니터링`: 서버 CPU, 메모리, 디스크 사용량 등 기본 인프라 메트릭 모니터링
2. `쿠버네티스 클러스터 모니터링`: 노드, 포드, 컨테이너 상태 및 리소스 사용량 추적
3. `애플리케이션 성능 모니터링`: 요청 처리 시간, 에러율, 처리량 등 애플리케이션 레벨 메트릭 모니터링
4. `비즈니스 메트릭`: 사용자 활동, 전환율, 트랜잭션 볼륨 등 비즈니스 관련 메트릭 추적

### 최근 동향 및 발전

- `Prometheus 2.x`: 향상된 성능과 저장소 최적화, 카디널리티 증가에 대한 더 나은 처리 제공
- `Grafana 사용자 경험 향상`: 라이브 스트리밍, 알림 시스템 개선, 더 풍부한 시각화 옵션 제공
- `Prometheus의 원격 저장소 통합`: 장기 보관 및 대규모 배포를 위한 외부 저장소 통합 기능 강화
- `서비스 메시 모니터링`: Istio, Linkerd 등 서비스 메시와의 통합 강화
- `Grafana Loki와 Tempo`: 로깅 및 분산 추적을 위한 Grafana Labs의 추가 도구와의 통합

</details>

<details>
<summary><strong>0403</strong></summary>

# SonarQube란?

> SonarQube는 지속적인 코드 품질 검사를 위한 오픈소스 플랫폼입니다. 개발자들이 더 나은 코드를 작성할 수 있도록 도와주며, 코드 품질 문제를 자동으로 감지하고 관리합니다.

## 핵심 기능

- 코드 품질 분석: 버그, 코드 스멜, 취약점 등을 자동으로 감지
- 보안 취약점 스캔: OWASP Top 10, CWE/SANS Top 25와 같은 기준으로 보안 취약점 분석
- 코드 중복 탐지: 코드베이스 내의 중복 코드 식별
- 코드 커버리지 분석: 테스트 코드가 실제 코드를 얼마나 커버하는지 측정
- 기술 부채 관리: 코드 개선 사항을 "기술 부채"로 수치화하여 관리

## 아키텍처 구성

SonarQube는 다음 세 가지 주요 컴포넌트로 구성됩니다:

### 1. SonarQube 서버:

- 웹 서버: 사용자 인터페이스 제공
- 검색 서버(Elasticsearch): 코드 이슈 검색 기능 지원
- Compute Engine: 코드 분석 결과 처리

### 2. 데이터베이스(PostgreSQL):

- 코드 품질 메트릭, 이슈, 사용자 설정 등 저장
- 트랜잭션 처리 및 관계형 데이터 관리

### 3. SonarScanner:

- 실제 코드 분석을 수행하는 클라이언트 도구
- 다양한 빌드 도구(Maven, Gradle, Jenkins 등)와 통합 가능

## 지원 언어

SonarQube는 27개 이상의 프로그래밍 언어를 지원합니다:

- Java, JavaScript, C#, C/C++, Python
- PHP, TypeScript, Ruby, Go, Swift
- Kotlin, Scala, HTML, CSS 등

## 품질 게이트(Quality Gates)

SonarQube는 "품질 게이트"라는 개념을 통해 코드가 프로덕션에 배포될 수 있는지 여부를 결정합니다:

- 정의된 품질 기준(예: 버그 수, 코드 커버리지 비율 등)을 충족해야만 통과
- CI/CD 파이프라인과 통합하여 자동화된 품질 관리 가능

## 에디션

- Community Edition: 무료 오픈소스 버전, 기본 기능 제공
- Developer/Enterprise/Data Center Edition: 상용 버전으로 추가 기능 및 언어 지원

## 통합

SonarQube는 다양한 개발 도구와 통합됩니다:

- CI/CD 도구: Jenkins, GitLab CI, Azure DevOps, GitHub Actions
- IDE 플러그인: IntelliJ IDEA, Eclipse, Visual Studio
- 이슈 추적 시스템: Jira, GitHub Issues, Azure DevOps
</details>

<details>
<summary><strong>0404</strong></summary>

# TIL: Docker 캐시 정리

> 도커 캐시는 이미지 빌드 과정을 효율화하기 위한 메커니즘으로, 각 빌드 레이어를 저장해 재사용합니다. 하지만 시간이 지나면서 불필요한 캐시가 쌓여 디스크 공간을 많이 차지하게 됩니다.

### 효과적인 캐시 정리 방법:

```
docker system prune -a
```

이 명령어는 사용하지 않는 이미지, 중단된 컨테이너, 네트워크, 빌드 캐시를 모두 삭제합니다.

### 데이터 볼륨까지 함께 정리하려면:

```
docker system prune -a --volumes
```

### 특정 이미지만 삭제하고 싶을 때는:

```
docker image prune -a --filter "until=24h"
```

위 명령어는 24시간 이상 된 이미지를 삭제합니다.
최근에는 BuildKit을 활용한 캐시 관리도 효율적입니다. BuildKit은 디스크 사용량을 줄이면서도 빌드 속도를 개선하고, 다단계 빌드에서 더 나은 캐시 활용이 가능합니다.

</details>

<details>
<summary><strong>0407</strong></summary>

# TIL: Kafka

> Kafka는 LinkedIn에서 개발된 고성능 분산 이벤트 스트리밍 플랫폼입니다. 실시간 데이터 파이프라인과 스트리밍 애플리케이션을 구축하는 데 사용됩니다.

### 주요 개념:

- `Producer`: 메시지 생성자로, 토픽에 메시지를 발행합니다.
- `Consumer`: 메시지 소비자로, 토픽에서 메시지를 구독하고 처리합니다.
- `Topic`: 메시지의 카테고리 또는 피드 이름입니다.
- `Partition`: 병렬 처리를 위해 토픽을 분할한 단위, 각 파티션은 순서가 보장됩니다.
- `Broker`: Kafka 서버로, 여러 브로커가 클러스터를 구성합니다.
- `Consumer Group`: 토픽의 파티션을 나눠 병렬 처리하는 소비자들의 집합입니다.
- `Zookeeper/KRaft`: 브로커 클러스터의 메타데이터 관리 및 조정 역할을 담당합니다.

Kafka의 장점은 높은 처리량, 내구성, 확장성을 제공하며, 특히 마이크로서비스 간 비동기 통신, 로그 집계, 실시간 분석, 이벤트 소싱 등에 적합합니다. 최신 버전에서는 Zookeeper 의존성을 제거하고 KRaft 모드를 도입해 운영 복잡성을 줄였습니다.

</details>

<details>
<summary><strong>0408</strong></summary>

# TIL: FCM (Firebase Cloud Messaging)

> Google의 크로스 플랫폼 메시징 솔루션으로 모바일 앱, 웹 애플리케이션에 무료로 푸시 알림을 보낼 수 있습니다.

### 주요 특징:

- `토큰 기반 메시징`: 각 디바이스마다 고유한 FCM 토큰이 발급되어 특정 디바이스에 메시지 전송이 가능합니다.
- `토픽 구독`: 여러 디바이스를 토픽으로 그룹화해 일괄 메시지 전송이 가능합니다.
- `다중 플랫폼 지원`: iOS, Android, 웹 등 모든 주요 플랫폼을 지원합니다.
- `메시지 타입`: 알림 메시지(시스템 트레이에 표시)와 데이터 메시지(앱에서 처리할 수 있는 커스텀 페이로드)를 지원합니다.
- `TTL 설정`: 메시지 전송 유효 시간을 설정할 수 있습니다.
- `분석 통합`: Firebase Analytics와 통합되어 알림 효과를 측정할 수 있습니다.

구현 방법으로는 서버에서 FCM HTTP v1 API 또는 Admin SDK를 사용해 클라이언트에 메시지를 전송하고, 클라이언트에서는 FCM SDK를 통해 푸시 알림을 수신하고 처리합니다. 주로 신규 콘텐츠 알림, 채팅 메시지, 이벤트 알림 등에 활용됩니다.

</details>

<details>
<summary><strong>0409</strong></summary>

# TIL: Nginx

> Nginx(엔진엑스)는 Igor Sysoev가 개발한 고성능 웹 서버이자 리버스 프록시, 로드 밸런서로 사용되는 오픈소스 소프트웨어입니다.

### 주요 특징:

- `비동기 이벤트 기반 아키텍처`: 작은 메모리 공간에서 수많은 동시 연결을 처리할 수 있습니다.
- `정적 파일 서빙 최적화`: 정적 콘텐츠 제공에 매우 효율적입니다.
- `리버스 프록시 기능`: 백엔드 서버로 요청을 전달하고 응답을 클라이언트에 반환합니다.
- `로드 밸런싱`: 여러 서버에 트래픽을 분산시켜 부하를 관리합니다.
- `HTTP 캐싱`: 자주 요청되는 콘텐츠를 캐싱해 성능을 향상시킵니다.
- `SSL/TLS 종료`: HTTPS 연결을 처리하고 백엔드로는 암호화되지 않은 트래픽을 전달합니다.
- `URL 리라이팅 및 리다이렉션`: 복잡한 URL 구조 관리가 가능합니다.

설정은 `/etc/nginx/nginx.conf` 및 `/etc/nginx/conf.d/` 디렉토리의 파일들을 통해 이루어지며, 구성 문법이 비교적 간결합니다. 주로 정적 웹사이트 호스팅, API 게이트웨이, 마이크로서비스 아키텍처의 진입점, CDN, 애플리케이션 서버 앞단의 리버스 프록시 등으로 활용됩니다.

</details>

<details>
<summary><strong>0410</strong></summary>

# TIL: MCP (Model Context Protocol)

> MCP(Model Context Protocol)는 AI 모델과 애플리케이션 간의 표준화된 통신 프로토콜로, 효율적인 컨텍스트 관리와 일관된 모델 인터페이스를 제공합니다.

### 주요 특징:

표준화된 요청/응답 포맷: JSON 기반으로 모델 호출을 위한 구조화된 형식을 제공합니다.

- `컨텍스트 관리`: 대화 기록, 시스템 프롬프트, 사용자 설정 등의 컨텍스트 정보를 효과적으로 전달합니다.
- `메타데이터 지원`: 모델 호출 시 온도, 최대 토큰 수 등의 생성 파라미터 제어가 가능합니다.
- `스트리밍 지원`: 실시간으로 토큰을 생성하고 전송하는 스트리밍 모드를 지원합니다.
- `다중 모델 호환성`: 다양한 AI 모델 간의 상호운용성을 촉진합니다.
- `확장 가능한 구조`: 새로운 기능과 모델 타입을 수용할 수 있는 유연한 설계를 갖추고 있습니다.

MCP는 LLM(대규모 언어 모델) 기반 애플리케이션 개발에서 모델과의 인터페이스를 단순화하고, 다양한 AI 서비스 간의 통합을 용이하게 합니다. 특히 챗봇, 에이전트, 도구 활용 AI 시스템에서 컨텍스트 흐름을 효과적으로 관리하는 데 중요한 역할을 합니다.

</details>

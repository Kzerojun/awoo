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

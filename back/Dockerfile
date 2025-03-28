FROM openjdk:17-jdk

ARG SERVICE_NAME
ARG JAR_FILE=${SERVICE_NAME}/build/libs/*.jar

# 타임존 설정
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# JAR 파일 복사
COPY ${JAR_FILE} app.jar

# 컨테이너 실행시 자동으로 실행할 명령
ENTRYPOINT ["java", "-jar", "app.jar"]
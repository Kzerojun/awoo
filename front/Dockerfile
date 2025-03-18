FROM node:18-alpine AS base

# 1. 빌드 환경 설정
FROM base AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 소스 코드 복사
COPY . ./
# Next.js 빌드
RUN yarn build

# 2. 프로덕션 환경 설정
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 포트 설정
EXPOSE 3000

# 서버 실행
CMD ["node", "server.js"]
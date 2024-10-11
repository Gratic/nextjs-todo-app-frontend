FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS test
RUN --mount=type=cache,target=./.npm npm ci --cache .npm
COPY . .
RUN npm run test && npm run lint && npm run build

FROM base AS build
ENV TASK_API_ENDPOINT=http://localhost:8000/v1/tasks
RUN --mount=type=cache,target=./.npm npm ci --cache .npm
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000
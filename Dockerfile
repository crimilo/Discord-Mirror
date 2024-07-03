FROM node:22.4.0-alpine
WORKDIR /usr/src/app
COPY package*.json config.yml tsconfig.json ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile && pnpm prune --prod
COPY . .
RUN pnpm run build
USER node
CMD [ "pnpm", "start" ]
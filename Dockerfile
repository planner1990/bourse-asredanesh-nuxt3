FROM artifactory.asredanesh.com/docker/node:lts-18-slim
RUN npm install -g pnpm
# Install node packages
WORKDIR /usr/src/app
COPY ./client/package.json ./
COPY ./client/.npmrc ./
COPY ./client/pnpm-lock.yaml ./
RUN pnpm install
# Copy application source
WORKDIR /usr/src
COPY ./client ./app
WORKDIR /usr/src/app
# Build App
RUN pnpm build
ENV HOST=0.0.0.0
# Deploy
EXPOSE 3000
CMD [ "pnpm", "start" ]
# Temporary dev
#CMD [ "pnpm", "dev","--host","0.0.0.0","--host","bourse-ui" ]
###

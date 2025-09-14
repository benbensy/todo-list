FROM node:22 AS builder

COPY . /app

WORKDIR /app

RUN rm -rf dist .vscode .husky node_modules

RUN pnpm build
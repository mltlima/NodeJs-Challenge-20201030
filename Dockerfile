FROM node:18 as build
WORKDIR /usr/src/
COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./prisma ./prisma
RUN npm i
COPY . .
RUN npm run build

FROM node:18
WORKDIR /usr/src/
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm i --only=production --ignore-scripts
COPY --from=build /usr/src/dist ./dist
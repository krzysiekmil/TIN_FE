### STAGE 1: Build ###
FROM node:19.2-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --force
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/tinProjectFe /usr/share/nginx/html
EXPOSE 80

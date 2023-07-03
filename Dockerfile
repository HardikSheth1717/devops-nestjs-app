FROM node:17-alpine3.12

RUN mkdir -p /home/app

RUN chown -R node:node /home/app

USER node

WORKDIR /home/app

COPY package*.json ./

RUN npm ci

COPY . /home/app

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:dev"]

FROM node:16.14.2-alpine

WORKDIR /src/app

COPY . .

RUN npm install

CMD ["npm", "start"]

#CMD ["ng", "serve", "--host", "0.0.0.0"]

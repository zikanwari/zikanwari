FROM node

COPY package*.json ./

RUN npm install

COPY code ./code

WORKDIR /code
CMD [ "node", "index.js" ]
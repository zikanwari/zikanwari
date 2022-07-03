FROM node

COPY package*.json ./

RUN npm install

COPY code /code

CMD [ "node", "/code/index.js" ]
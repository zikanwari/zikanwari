FROM node

COPY package*.json ./

RUN npm install

COPY code ./

WORKDIR /code
CMD [ "node", "/code/index.js" ]
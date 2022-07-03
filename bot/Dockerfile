FROM node

COPY package*.json ./

RUN npm install

COPY code/index.js /

CMD [ "node", "index.js" ]
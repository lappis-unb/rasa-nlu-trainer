FROM node:10-jessie-slim

WORKDIR /node_server
COPY ./node_server /node_server
RUN npm install
EXPOSE 4321

CMD ["node", "server.js", "-p", "4321", "-d", "true", "&!"]

FROM node:10-jessie-slim as node
WORKDIR /node_server
COPY ./node_server /node_server
RUN npm install
EXPOSE 3030
CMD ["npm","start"]


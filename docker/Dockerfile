FROM node:10-jessie-slim as react
RUN mkdir /rasa-nlu-data

WORKDIR /rasa-nlu-trainer
COPY ./app /rasa-nlu-trainer

RUN npm i -g rasa-nlu-trainer
RUN npm install
EXPOSE 8080

FROM node:10-jessie-slim as node
WORKDIR /node_server
COPY ./node_server /node_server
RUN npm install
EXPOSE 3030

CMD ["npm","start"]


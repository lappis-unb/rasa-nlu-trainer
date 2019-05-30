FROM node:10-jessie-slim
RUN mkdir /rasa-nlu-data

WORKDIR /rasa-nlu-trainer
COPY ./app/package.json ./package.json

RUN npm i -g rasa-nlu-trainer
RUN npm install
EXPOSE 3000

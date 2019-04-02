FROM node:10-jessie-slim
RUN mkdir /rasa-nlu-data

WORKDIR /rasa-nlu-trainer
COPY ./app /rasa-nlu-trainer

RUN npm i -g rasa-nlu-trainer
RUN npm install
EXPOSE 8080

#CMD ["rasa-nlu-trainer", "-p", "8080"]

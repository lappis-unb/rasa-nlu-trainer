FROM node:10-jessie-slim as react
RUN mkdir /rasa-nlu-data

WORKDIR /rasa-nlu-trainer
COPY ./app /rasa-nlu-trainer
EXPOSE 3000
CMD ["sh", "-c", "yarn install && yarn start"]

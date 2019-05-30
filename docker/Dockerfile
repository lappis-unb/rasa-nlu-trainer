FROM baseapp as react

WORKDIR /rasa-nlu-trainer
COPY ./app/public ./public
COPY ./app/src ./src
COPY ./app/config-overrides.js ./config-overrides.js

EXPOSE 3000
CMD ["sh", "-c", "yarn install && yarn start"]
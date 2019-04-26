# rasa-nlu-trainer
This is a tool to edit your training examples for [rasa NLU](https://github.com/rasahq/rasa_nlu)


Use the [online version](https://rasahq.github.io/rasa-nlu-trainer/) or [install with npm](#installation)

## installation

`$ npm i -g rasa-nlu-trainer` (you'll need [nodejs and npm](https://nodejs.org/) for this)

## installation with docker

`# docker-compose up`

Add access it at `http://localhost:3000/`

## launch
`$ rasa-nlu-trainer` in your working directory

this will open the editor in your browser

#### options
- `--source -s` path to the training file (by default it will be searched recursively in the current directory)
- `--port -p` the web app will run here (randomly selected by default)

## development

- git clone this repo
- `$ npm install`
- `$ npm start`

#### using the development build locally

- `$ npm run build`
- `$ npm link`

from here, the `$ rasa-nlu-trainer` command will start the development version

run `$ npm run build` again to update the build

run `$ npm unlink && npm i -g rasa-nlu-trainer` to use the npm version again


This project was bootstrapped with [Create React App](./CRA_README.md).

#### using the parser 
A parser of rasa intents and stories.

Dependencies
Inside tools path
run `$ pip3 install -r requirements.txt`

Usage
Use flags to inform the intents and stories folder path.

Parser to intents 

run `$ python3 tools/intent_parser.py -i intents/`

This command will generate an json file called intents.json as default name.

Parser to stories

run `$ python3 tools/stories_parser.py -i stories/`

This command will generate an json file called stories.json as default name.



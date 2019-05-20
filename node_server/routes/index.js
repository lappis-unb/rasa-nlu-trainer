const express = require('express');
const fs = require('fs');

const app = express.Router();
const path = require('path');
const Joi = require('joi');

const jsonObjects = {
  rasa_nlu_data: {
    common_examples: {
      intents: [
        {
          intent: 'example',
          intent_text: 'example',
          entities: [
            {
              start: 0,
              end: 0,
              value: 'example',
              entity: 'example',
            },
          ],
        },
      ],
      utters: [
        {
          utter: 'example',
          utter_name: 'example',
        },
      ],
      stories: [
        {
          intent: 'example',
          utter_name: 'example',
        },
      ],
    },
  },
};

const joiObject = Joi.object().keys({
  rasa_nlu_data: Joi.object().keys({
    common_examples: Joi.object().keys({
      utters: Joi.array().items(
        Joi.object().keys({
          utter: Joi.string().min(3).required(),
          nameUtter: Joi.string().min(3).required(),
        }),
      ).required(),
      intents: Joi.array().items(
        Joi.object().keys({
          intent: Joi.string().required(),
          nameIntent: Joi.string().min(3).required(),
          entities: Joi.array().items(
            Joi.object().keys({
              start: Joi.number().required(),
              end: Joi.number().required(),
              value: Joi.string().min(3).required(),
              entity: Joi.string().min(3).required(),
            }),
          ),
        }),
      ).required(),
      stories: Joi.array().items(
        Joi.object().keys({
          nameUtter: Joi.string().min(3).required(),
          nameIntent: Joi.string().min(3).required(),
        }),
      ).required(),
    }).required(),
  }).required(),
}).required();

app.get('/rasa', (req, res) => {
  fs.readFile(path.join(__dirname, '../testData.json'), (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post('/rasa', (req, res) => {
  const data = req.body;
  let firstErr;
  Joi.validate(data, joiObject, (err) => {
    const keys = ['rasa_nlu_data', 'intents', 'stories', 'utters'];
    if (err) {
      for (let i = 0; i < keys.length; i += 1) {
        if (i === 0 && !Object.prototype.hasOwnProperty.call(data, keys[i])) {
          data[keys[i]] = jsonObjects[keys[i]];
        } else if (i > 0
          && !Object.prototype.hasOwnProperty.call(data.rasa_nlu_data.common_examples, keys[i])) {
          try {
            data.rasa_nlu_data.common_examples[
              keys[i]
            ] = jsonObjects.rasa_nlu_data.common_examples[keys[i]];
          } catch (e) {
            throw err;
          }
        }
      }
    }
    firstErr = err;
  });
  Joi.validate(data, joiObject, (err) => {
    if (err) {
      throw firstErr;
    }
  });
  fs.writeFile(path.join(__dirname, '../testData.json'), JSON.stringify(data), (err) => {
    if (err) throw err;
    res.json({ success: 'success' });
  });
});

module.exports = app;

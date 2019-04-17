const express = require('express');
const fs = require('fs');

const app = express.Router();
const path = require('path');
const Joi = require('joi');
const testData = require('../testData.json');

const jsonObjects = {
  rasa_nlu_data: {
    common_examples: {
      intents: [
        {
          intent: '',
          intent_text: '',
        },
      ],
      utters: [
        {
          utter: '',
          utter_name: '',
        },
      ],
      stories: [
        {
          intent: '',
          utter_name: '',
        },
      ],
    },
  },
};
const joiObject = Joi.object().keys({
  rasa_nlu_data: Joi.object().keys({
    common_examples: Joi.object().keys({
      utters: [Joi.object().keys({
        utter: Joi.string(),
        utter_name: Joi.string(),
      })],
      intents: [Joi.object().keys({
        intents: [Joi.object().keys({
          intent: Joi.string(),
          intent_text: Joi.string(),
          entites: [Joi.object().keys({
            start: Joi.number(),
            end: Joi.number(),
            value: Joi.string(),
            entity: Joi.string(),
          }),
          ],
        })],
      })],
      stories: [
        Joi.object().keys({
          utter_name: Joi.string(),
          intent: Joi.string(),
        }),
      ],
    }),
  }),
});

app.get('/rasa', (req, res) => {
  res.json(testData);
});

app.post('/rasa', (req, res) => {
  const data = req.body;
  let firstErr;
  Joi.validate(data, joiObject, (err) => {
    const keys = ['rasa_nlu_data', 'intents', 'stories', 'utters'];
    if (err) {
      for (let i = 0; i < keys.length; i += 1) {
        if (i === 0 && !data.includes(keys[i])) {
          data[keys[i]] = jsonObjects[keys[i]];
        } else if (i > 0 && !data.rasa_nlu_data.common_examples.includes(keys[i])) {
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
  fs.writeFile(path.join(__dirname), JSON.stringify(data), (err) => {
    if (err) throw err;
  });
  res.json({ success: 'success' });
});


module.exports = app;

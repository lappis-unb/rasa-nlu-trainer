// @flow
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import {
  EDIT,
  DELETE_EXAMPLE,
  SET_SELECTION,
  FETCH_DATA,
  SAVING_DONE,
  EXPAND,
  COLLAPSE,
  SET_MODAL_ID,
  OPEN_ADD_MODAL,
  CLOSE_ADD_MODAL,
  SAVE_AND_CLOSE_ADD_MODAL,
  RESET,
  SET_STATE_API,
} from './actions';

let exampleIDCounter = 0;

const createExample = (
  {
    intent = '', utter = '', nameUtter = '', nameIntent = '', entities = [],
  },
  scope,
) => {
  let returnJSON = {};
  switch (scope) {
    case 'intents':
      returnJSON = {
        nameIntent,
        intent,
        entities,
        updatedAt: Date.now(),
        isExpanded: false,
        id: (exampleIDCounter += 1).toString(),
      };
      break;
    case 'utters':
      returnJSON = {
        utter,
        nameUtter,
        updatedAt: Date.now(),
        id: (exampleIDCounter += 1).toString(),
      };
      break;
    case 'stories':
      returnJSON = {
        nameUtter,
        nameIntent,
        updatedAt: Date.now(),
        id: (exampleIDCounter += 1).toString(),
      };
      break;
    default:
      return returnJSON;
  }
  return returnJSON;
};
const prepareExamples = (examples = [], scope) => examples.map(
  example => createExample(example, scope),
);

const INITIAL_STATE = {
  filename: 'testData.json',
  originalSource: null,
  intents: [{}].map(e => createExample(e, 'intents')),
  utters: [{}].map(e => createExample(e, 'utters')),
  stories: [{}].map(e => createExample(e, 'stories')),
  isUnsaved: false,
  selection: null,
  idExampleInModal: null,
};
export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  const getExampleIndex = (_id, className = 'intents') => state[className].findIndex(({ id }) => id === _id);

  switch (type) {
    case RESET: {
      return {
        ...state,
        examples: [],
        isUnsaved: false,
        selection: null,
        idExampleInModal: null,
      };
    }
    case EDIT: {
      const { id, value, className } = payload;
      const prop = {
        intents: ['nameIntent', 'intent', 'entities'],
        utters: ['utter', 'nameUtter'],
        stories: ['nameIntent', 'nameUtter'],
      };
      const update = pick(value, prop[className]);
      state = immutable.assign(state, `${className}.${getExampleIndex(id, className)}`, {
        ...update,
        updatedAt: Date.now(),
      });
      return { ...state, isUnsaved: true };
    }
    case DELETE_EXAMPLE: {
      const { id } = payload;
      state = immutable.del(state, `examples.${getExampleIndex(id)}`);
      return { ...state, isUnsaved: true };
    }
    case SET_SELECTION: {
      const { id, start, end } = payload;
      if (start === end) {
        return state;
      }
      return immutable.set(state, 'selection', { idExample: id, start, end });
    }
    case SET_STATE_API: {
      const { data } = payload;
      state = immutable.set(state, 'intents', data.rasa_nlu_data.common_examples.intents);
      state = immutable.set(state, 'utters', data.rasa_nlu_data.common_examples.utters);
      state = immutable.set(state, 'stories', data.rasa_nlu_data.common_examples.stories);
      return state;
    }
    case FETCH_DATA: {
      const { data, path } = payload;
      return {
        ...state,
        examplesIntents: prepareExamples(data.rasa_nlu_data.common_examples.intents, 'intents'),
        examplesUtters: prepareExamples(data.rasa_nlu_data.common_examples.utters, 'utters'),
        examplesStories: prepareExamples(data.rasa_nlu_data.common_examples.stories, 'stories'),
        originalSource: data,
        filename: path,
      };
    }
    case SAVING_DONE: {
      return {
        ...state,
        isUnsaved: false,
      };
    }
    case EXPAND: {
      const { id } = payload;

      return immutable.set(state, `intents.${getExampleIndex(id)}.isExpanded`, true);
    }
    case COLLAPSE: {
      const { id } = payload;

      return immutable.set(state, `intents.${getExampleIndex(id)}.isExpanded`, false);
    }
    case SET_MODAL_ID: {
      const exampleUtters = createExample({}, 'utters');
      state = immutable.push(state, 'utters', exampleUtters);
      return immutable.set(state, 'idExampleInModal', exampleUtters.id);
    }
    case OPEN_ADD_MODAL: {
      const { className } = payload;
      if (className === 'intents') {
        const exampleIntents = createExample({}, 'intents');
        state = immutable.push(state, 'intents', exampleIntents);
        state.modalClass = className;
        state = immutable.set(state, 'idExampleInModal', exampleIntents.id);
      } else if (className === 'utters') {
        const exampleUtters = createExample({}, 'utters');
        state = immutable.push(state, 'utters', exampleUtters);
        state.modalClass = className;
        state = immutable.set(state, 'idExampleInModal', exampleUtters.id);
      } else if (className === 'stories') {
        const exampleStories = createExample({}, 'stories');
        state = immutable.push(state, 'stories', exampleStories);
        state.modalClass = className;
        state = immutable.set(state, 'idExampleInModal', exampleStories.id);
      }
      return state;
    }
    case CLOSE_ADD_MODAL: {
      const { className } = payload;
      state = immutable.del(
        state,
        `${className}.${getExampleIndex(state.idExampleInModal, className)}`,
      );
      return immutable.set(state, 'idExampleInModal', null);
    }
    case SAVE_AND_CLOSE_ADD_MODAL: {
      return immutable.set(state, 'idExampleInModal', null);
    }
    default:
      return state;
  }
}

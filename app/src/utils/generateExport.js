import store from "../state/store";
import immutable from "object-path-immutable";

function trimWhitespace(text, entities) {
  return entities.map(entity => {
    let entityText = text.substring(entity.start, entity.end).trim();
    let entityPos = text.indexOf(entityText);
    return {
      start: entityPos,
      end: entityPos + entityText.length,
      value: entity.value,
      entity: entity.entity
    };
  });
}

export default function() {
  const state = store.getState();
  const saveStateFile = {
    intents: state.intents,
    utters: state.utters,
    stories: state.stories
  };
  saveStateFile.intents = saveStateFile.intents.map(({ nameIntent, intent, entities }) => ({
    nameIntent,
    intent,
    entities: trimWhitespace(intent, entities)
  }));
  const source = immutable.set(
    state.originalSource,
    "rasa_nlu_data.common_examples",
    saveStateFile
  );
  const { intents, utters, stories } = state;
  intents.map(intent => {
    delete intent.updatedAt;
    delete intent.id;
    delete intent.isExpanded;
  });
  utters.map(utter => {
    delete utter.updatedAt;
    delete utter.id;
    delete utter.isExpanded;
  });
  stories.map(story => {
    delete story.updatedAt;
    delete story.id;
    delete story.isExpanded;
  });
  const saveJSON = { rasa_nlu_data: { common_examples: { intents, utters, stories } } };
  fetch(`${process.env.REACT_APP_URL_API}/rasa`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(saveJSON)
  });
  console.log(state);
  return JSON.stringify(source, null, 2);
}

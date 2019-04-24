import os
import json
import logging
import argparse
import simplejson
from typing import Text, List


logger = logging.getLogger(__name__)

parser = argparse.ArgumentParser()

parser.add_argument(
    '--intents', '-i',
    type=str, default='intents/',
    help='Path for the intents file or directory'
)

parser.add_argument(
    '--warnings', '-w',
    action='store_true',
    default=False,
    help='Run script with warings'
)


class ContentParser:

    def __init__(self,
                 intents: List[Text] = None):

        self.intents = intents

    def read_intents_folder(self):
        intent_folder = self.intents.strip('/')+'/'
        intent_files = os.listdir(self.intents)
        all_intents = []
        for intent_file in intent_files:
            with open(intent_folder+intent_file, 'r') as intent:
                intent_lines = intent.readlines()
                all_intents.append(self.get_intents_from_file(intent_lines))
        return all_intents

    def get_intents_from_file(self, lines=None):
        intents_dict = {}
        for i in range(len(lines)):
            if '##' in lines[i]:
                intent_name = lines[i].split()[1].split(':')[1]
                i += 1
                intent_examples = []
                while i+1 < len(lines) and '##' not in lines[i+1]:
                    intent_examples.append(lines[i].strip('-').strip())
                    i += 1
                intents_dict[intent_name] = intent_examples
        return intents_dict

    def format_intents_to_json(self, all_intents=None):
        formated_intents_list = []
        for intent_file in all_intents:
            for intent in intent_file:
                for intent_example in intent_file[intent]:
                    formated_intents = {}
                    formated_intents['text'] = intent_example
                    formated_intents['intent'] = intent 
                    formated_intents_list.append(formated_intents)
        return formated_intents_list


    def format_json(self, all_intents):
        data = {'rasa_nlu_data': {'commom_examples': []}}
        intents = self.format_intents_to_json(all_intents)
        data['rasa_nlu_data']['commom_examples'] = intents
        return data

    def generate_json_file(self, all_intents=None):
        with open('intents.json', 'w') as json_intents:
            data = self.format_json(all_intents)
            json_intents.write(simplejson.dumps(data, indent=2, sort_keys=True))
            json_intents.close()
            #json.dump(data, json_intents)

    def show_json_file(self, file_name = 'intents.json'):
        with open(file_name, 'r') as f:
            data = json.load(f)
            print(json.dumps(data, indent=2))


if __name__ == '__main__':
    intents = parser.parse_args().intents
    warning = parser.parse_args().warnings

    logger.info(intents)
    logger.info(warning)
    cp = ContentParser(intents=intents)
    all_intents = cp.read_intents_folder()
    cp.generate_json_file(all_intents)

import os
import json
import logging
import argparse
import simplejson
from typing import Text, List


logger = logging.getLogger(__name__)

parser = argparse.ArgumentParser()

parser.add_argument(
    '--stories', '-i',
    type=str, default='stories/',
    help='Path for the stories file or directory'
)

parser.add_argument(
    '--warnings', '-w',
    action='store_true',
    default=False,
    help='Run script with warings'
)


class ContentParser:

    def __init__(self,
                 stories: List[Text] = None):

        self.stories = stories

    def read_stories_folder(self):
        stories_folder = self.stories.strip('/')+'/'
        stories_files = os.listdir(self.stories)
        all_stories = []
        for stories_file in stories_files:
            with open(stories_folder+stories_file, 'r') as stories:
                stories_lines = stories.readlines()
                all_stories.append(self.get_stories_from_file(stories_lines))
        return all_stories

    def get_stories_from_file(self, lines=None):
        stories_dict = {}
        for i in range(len(lines)):
            if '*' in lines[i]:
                stories_name = lines[i].split()[1]
                i += 1
                stories_examples = []
                while i < len(lines) and '*' not in lines[i] and lines[i] != '\n':
                    stories_examples.append(lines[i].strip('-').strip()[2:])
                    i += 1
                stories_dict[stories_name] = stories_examples
        return stories_dict

    def format_stories_to_json(self, all_stories=None):
        formated_stories_list = []
        for stories_file in all_stories:
            for stories in stories_file:
                for stories_example in stories_file[stories]:
                    formated_stories = {}
                    formated_stories['text'] = stories_example
                    formated_stories['stories'] = stories 
                    formated_stories_list.append(formated_stories)
        return formated_stories_list


    def format_json(self, all_stories):
        data = {'rasa_nlu_data': {'stories_examples': []}}
        stories = self.format_stories_to_json(all_stories)
        data['rasa_nlu_data']['stories_examples'] = stories
        return data

    def generate_json_file(self, all_stories=None):
        with open('stories.json', 'w') as json_stories:
            data = self.format_json(all_stories)
            json_stories.write(simplejson.dumps(data, indent=2, sort_keys=True))
            json_stories.close()
            #json.dump(data, json_stories)

    def show_json_file(self, file_name = 'stories.json'):
        with open(file_name, 'r') as f:
            data = json.load(f)
            print(json.dumps(data, indent=2))


if __name__ == '__main__':
    stories = parser.parse_args().stories
    warning = parser.parse_args().warnings

    logger.info(stories)    
    logger.info(warning)
    cp = ContentParser(stories=stories)
    all_stories = cp.read_stories_folder()
    cp.generate_json_file(all_stories)

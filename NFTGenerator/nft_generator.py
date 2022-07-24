import os
from PIL import Image
from layer import Layer
import random
import csv
from datetime import datetime
import json
from specialRule import SpecialRule
from copy import deepcopy

class NFTGenerator:
    def __init__(self, images_path: str, output_path: str, config_path: str, layers: list(), special_decoration_layer: str, creators_and_share: list()):
        self.db_cache = list()
        self.isSave = False
        self.isShow = False
        self.base_json = {}
        self.metadata_json = list()
        
        self.layers = layers
        self.special_decoration_layer = special_decoration_layer
        self.output_path = output_path
        self.config_path = config_path
        self.creators_and_share = creators_and_share
        
        # a 2D array contain all the layers images path
        self.body_image_layers = self.load_body_image_layers(images_path, self.layers) 
        # an array contain all the images path of head-decoration
        self.head_decoration_layers = self.load_special_decoration_layers(images_path, self.special_decoration_layer) 
        self.datetime_now = datetime.utcnow().strftime('%Y%m%d%H%M%S%f')

        os.makedirs(self.output_path, exist_ok=True)
        os.makedirs(self.config_path, exist_ok=True)

        self.db_file = os.path.join(self.config_path, "db.csv")

        # if the csv file exist back up the existing one first
        if os.path.exists(self.db_file):
            os.rename(self.db_file, os.path.join(config_path, self.datetime_now + ".csv"))


    def set_isSave(self, isSave: bool):
        self.isSave = isSave


    def set_isShow(self, isShow: bool):
        self.isShow = isShow


    def set_base_metadata(self, base_messages: dict):
        self.base_json = base_messages

    
    def get_image_json(self):
        return self.base_json


    def load_body_image_layers(self, images_path: str, layers: list()):
        rtn_layers = list()
        for i in range(len(layers)):
            layer_path = os.path.join(images_path, layers[i])
            layer = Layer(layer_path)
            rtn_layers.append(layer.get_all_image_path())
        return rtn_layers


    def load_special_decoration_layers(self, images_path: str, layer_folder_name: str):
        layer_path = os.path.join(images_path, layer_folder_name)
        layer = Layer(layer_path)
        return layer.get_all_image_path()


    def save_image(self, image_filename: str, image: Image):
        image.save(os.path.join(self.output_path, image_filename))


    def save_json(self, json_filename: str, image_filename: str):
        files = list()
        files.append(dict(uri = image_filename, type = "image/png"))
        self.base_json["properties"].update(dict(files = files))
        self.base_json["properties"].update(dict(category = "image"))
        self.base_json["properties"].update(dict(creators = self.creators_and_share))
        with open(os.path.join(self.output_path, json_filename), 'w', encoding='utf-8') as f:
            json.dump(self.base_json, f, ensure_ascii=False, indent=4)

    
    def save_to_db(self):
        with open(os.path.join(self.config_path, "db.csv"), "w+") as my_csv:
            csvWriter = csv.writer(my_csv, delimiter=',')
            for row in self.db_cache:
                csvWriter.writerow(row)


    def generate_random_values(self):
        values = list()
        for i in range(len(self.body_image_layers)):
            values.append(random.randint(0, len(self.body_image_layers[i])))
        return values

    
    def db_cache_exist(self, values: list()):
        for value in self.db_cache:
            if list(map(int, value)) == values:
                return True
        return False


    def create_artwork(self, values: list()):
        '''
        Creates the artwork based on the indexes
        :param values: a list holding the DNA of the artwork layers
        :return: the artwork as a Image object, the dictionary of metadata.
        '''

        artwork_metadata_attributes = list()
        length = len(values)
        has_head_decoration = False
        artwork = Image.open(self.body_image_layers[0][values[0] - 1]).convert('RGBA')

        # special case for the helmet
        if values[13] == 14:
            artwork = Image.alpha_composite(artwork, Image.open(self.body_image_layers[13][values[13] - 1])).convert('RGBA')
            length -= 1

        artwork = Image.alpha_composite(artwork, Image.open(self.body_image_layers[1][values[1] - 1])).convert('RGBA')

        # head decoration
        if values[1] != 9 and values[8] in [0, 9, 21, 22, 23, 24, 41, 42] and values[12] not in [25, 27] and values[13] in [0, 10, 14, 15]:
            artwork = Image.alpha_composite(artwork, Image.open(self.head_decoration_layers[values[1] - 1])).convert('RGBA')
            has_head_decoration = True            

        for i in range(2, length):
            try:
                if values[i] > 0:
                    artwork = Image.alpha_composite(artwork, Image.open(self.body_image_layers[i][values[i] - 1])).convert('RGBA')
            except:
                raise Exception("Layer {}: index {}".format(i, values[i]))

        if has_head_decoration:
            values.insert(0, values[1] - 1)
        else:
            values.insert(0, -1)

        artwork_metadata_attributes.append(dict(trait_type = 'DNA', value = values))

        return artwork, artwork_metadata_attributes

    
    def validate_and_create_artwork(self):
        '''
        validate_and_create_aratwork do generate a valid and unique artwork DNA value, do
        '''
        
        valide_value = False
        values = list()
        the_next_no_of_artwork = len(self.db_cache)
        
        #for i in range(self.no_of_artwork):
        while not valide_value:
            values = self.generate_random_values()
            if(not self.db_cache_exist):
                valide_value = self.db_cache_exist(values) and SpecialRule.validate(values)
            else:
                valide_value = SpecialRule.validate(values)

        self.db_cache.append(values)
        
        artwork, self.base_json["attributes"] = self.create_artwork(values)

        if self.isSave:
            image_filename = str(the_next_no_of_artwork) + ".png"
            json_filename = str(the_next_no_of_artwork) + ".json"

            self.save_image(image_filename, artwork)
            print(image_filename + " created.")
            self.save_json(json_filename, image_filename)
            print(json_filename + " created.")           

            self.metadata_json.append(self.base_json)
        if self.isShow:
            artwork.show()


    def generate_nft(self):

        self.validate_and_create_artwork()

        #save the db_cache into a csv file
        self.save_to_db()
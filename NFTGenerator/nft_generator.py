import os
from typing import List
from PIL import Image
from layer import Layer

class NFTGenerator:
    def __init__(self, aImages_path: str, aLayers: list):
        self.layers = self.load_image_layers(aImages_path, aLayers) # a list of layers' object
        self.output_path: str = "./output"
        os.makedirs(self.output_path, exist_ok=True)

    def load_image_layers(self, aImages_path: str, aLayers: list):
        layers = []
        for layer in aLayers:
            layer_path = os.path.join(aImages_path, layer)
            layers.append(Layer(layer_path))
        return layers

    def generate_image_sequence(self):
        image_path_sequence = []
        for layer in self.layers:
            image_path = layer.get_random_image_path()
            image_path_sequence.append(image_path)
        return image_path_sequence
       
    def generate_nft(self):
        print("NFTGenerator: Generating NFT!")
        image_path_sequence = self.generate_image_sequence()
        print(image_path_sequence)
from nft_generator import NFTGenerator
from copy import deepcopy
import os
import json

# Metadata Base. MUST BE EDITED.
BASE_NAME = "DudeOnChain"                       # Require edit
BASE_JSON = {
    "name": BASE_NAME,
    "symbol": "DOC",                            # Require edit
    "description": "DudeOnChain",               # Require edit
    "seller_fee_basis_points": 250,             # Require edit
    "image": str,
    "attributes": list(),
    "properties": dict()
}

# change or add if more share parties
CREATORS_AND_SHARE = [
    {
        "address": "45Mi4bjAxeXMJhrNfNmGPzCoHtosk1oDvo5yimtFKFbZ",
        "share": 100
    }
]  

# Change this to match your layer folder, not included special decoration
LAYERS = ["layer-0",  # Background
          "layer-1",  # Skin
          "layer-2",  # Silhouette
          "layer-3",  # Shirt
          "layer-4",  # Eyes
          "layer-5",  # Nose
          "layer-6",  # Face Trait
          "layer-7",  # Mouth
          "layer-8",  # Hair
          "layer-9",  # Earing
          "layer-10", # Neck
          "layer-11", # Mouth Acessory
          "layer-12", # Glasses
          "layer-13"] # Hat

SPECIAL_DECORATION_LAYER = "head-decoration" 

IMAGE_PATH = r"./artwork"
ARKWORK_OUTPUT_PATH = r"./output"
CONFIG_PATH = r"./config"
METADATA_PATH = os.path.join(ARKWORK_OUTPUT_PATH, "./_metadata.json")
NO_OF_ARTWORK = 10

SAVE_ARTWORK = True
SHOW_ARTWORK = False


def generate_nft():
    metadata_json = list()

    print("NFT Generator: Generating NFT!")
    generator = NFTGenerator(images_path = IMAGE_PATH, output_path = ARKWORK_OUTPUT_PATH, config_path = CONFIG_PATH, layers = LAYERS, special_decoration_layer = SPECIAL_DECORATION_LAYER, creators_and_share = CREATORS_AND_SHARE)
    generator.set_isSave(SAVE_ARTWORK)
    generator.set_isShow(SHOW_ARTWORK)
    generator.set_base_metadata(BASE_JSON)
    for i in range(NO_OF_ARTWORK):
        generator.generate_nft()
        metadata_json.append(deepcopy(generator.get_image_json()))

    with open(METADATA_PATH, 'w', encoding='utf-8') as f:
            json.dump(metadata_json, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    generate_nft()
from nft_generator import NFTGenerator
from copy import deepcopy
import os
import json
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Metadata Base. MUST BE EDITED.
BASE_NAME = os.getenv("BASE_NAME")                            # Require edit
BASE_JSON = {
    "name": BASE_NAME,
    "symbol": os.getenv("SYMBOL"),                            # Require edit
    "description": os.getenv("DESC"),                         # Require edit
    "seller_fee_basis_points": os.getenv("SELLER_FEE"),       # Require edit
    "image": str,
    "attributes": list(),
    "properties": dict()
}

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
NO_OF_ARTWORK = int(os.getenv("NO_OF_ARTWORK"))

SAVE_ARTWORK = True
SHOW_ARTWORK = False


def generate_creator_address_list():
    # change or add if more share parties
    creators_address_list = os.getenv("CREATER_WALLET_PUBLIC_KEY").split(' ')

    creator_and_share = list()

    for creator_address in creators_address_list:
        creator_and_share.append(
            {
                "address": creator_address,
                "share": os.getenv("CREATER_SHARE")
            }
        )
    
    return creator_and_share


def generate_nft():
    metadata_json = list()

    print("NFT Generator: Generating NFT!")
    generator = NFTGenerator(images_path = IMAGE_PATH, output_path = ARKWORK_OUTPUT_PATH, config_path = CONFIG_PATH, layers = LAYERS, special_decoration_layer = SPECIAL_DECORATION_LAYER, creators_and_share = generate_creator_address_list())
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
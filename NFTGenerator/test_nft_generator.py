import generate_nft as gnft
from nft_generator import NFTGenerator

generator = NFTGenerator(images_path = gnft.IMAGE_PATH, output_path = gnft.ARKWORK_OUTPUT_PATH, config_path = gnft.CONFIG_PATH, layers = gnft.LAYERS, special_decoration_layer = gnft.SPECIAL_DECORATION_LAYER, creators_and_share = gnft.generate_creator_address_list())

def test_set_isSave():
    generator.set_isSave(True)
    assert generator.isSave

def test_set_isShow():
    generator.set_isShow(True)
    assert generator.isShow

def test_set_and_get_metadata():
    generator.set_base_metadata(gnft.BASE_JSON)
    assert type(generator.base_json) == type(gnft.BASE_JSON)
    assert generator.base_json == gnft.BASE_JSON

def test_load_body_image_layers():
    rtn_layers = generator.load_body_image_layers(gnft.IMAGE_PATH, gnft.LAYERS)
    assert len(rtn_layers) == 14 #total 14 layers in this set of artwork


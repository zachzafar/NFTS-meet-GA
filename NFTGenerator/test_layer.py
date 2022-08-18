import os
from layer import Layer
import generate_nft as gnft

def test_get_all_image_path():
    layer_path = os.path.join(gnft.IMAGE_PATH, 'head-decoration')
    layer = Layer(layer_path)
    assert len(layer.get_all_image_path()) == 8
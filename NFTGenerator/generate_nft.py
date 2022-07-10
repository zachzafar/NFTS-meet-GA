from nft_generator import NFTGenerator


layers = ["layer-0",  # Background
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

image_path = r"./artwork"
assest_output_path = r"./output"
config_path = r"./config"
no_of_artwork = 10

def generate_nft():
    generator = NFTGenerator(image_path, assest_output_path, config_path, layers, no_of_artwork)
    generator.generate_nft()

if __name__ == "__main__":
    generate_nft()
import os

class Layer:

    def __init__(self, path: str):
        self.path = path

    def get_all_image_path(self):
        image_file_paths = list()
        image_file_names = sorted(os.listdir(self.path))
        for image_file_name in image_file_names:
            image_file_paths.append(os.path.join(self.path, image_file_name))
        return image_file_paths

    
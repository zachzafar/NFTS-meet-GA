let jimp = require('jimp');

export const imageGenerator = (ingredients, image_filename) => {
  const jimps = ingredients.map((ingredient) => jimp.read(ingredient));
  Promise.all(jimps).then((images) => {
    for (let i = 0; i < images.length - 1; i++) {
      images[0].composite(images[1], 0, 0);
    }
    images[0].write(image_filename);
    console.log('should work');
  });
};

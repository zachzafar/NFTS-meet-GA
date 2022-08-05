/**
 * Imports images from a folder as a map object
 * @param {*} r Represents the imported holder
 * @returns
 */
function importAll(r) {
  let images = {};
  let key = 0;
  r.keys().map(
    (item) => (images[item.replace(item, (key++).toString())] = r(item))
  );
  return images;
}

export const headdecoration = importAll(
  require.context('../artwork/head-decoration', false, /.png/)
);

export const layer_0 = importAll(
  require.context('../artwork/layer-0', false, /.png/)
);

export const layer_1 = importAll(
  require.context('../artwork/layer-1', false, /.png/)
);

export const layer_2 = importAll(
  require.context('../artwork/layer-2', false, /.png/)
);

export const layer_3 = importAll(
  require.context('../artwork/layer-3', false, /.png/)
);

export const layer_4 = importAll(
  require.context('../artwork/layer-4', false, /.png/)
);

export const layer_5 = importAll(
  require.context('../artwork/layer-5', false, /.png/)
);

export const layer_6 = importAll(
  require.context('../artwork/layer-6', false, /.png/)
);

export const layer_7 = importAll(
  require.context('../artwork/layer-7', false, /.png/)
);

export const layer_8 = importAll(
  require.context('../artwork/layer-8', false, /.png/)
);

export const layer_9 = importAll(
  require.context('../artwork/layer-9', false, /.png/)
);

export const layer_10 = importAll(
  require.context('../artwork/layer-10', false, /.png/)
);

export const layer_11 = importAll(
  require.context('../artwork/layer-11', false, /.png/)
);

export const layer_12 = importAll(
  require.context('../artwork/layer-12', false, /.png/)
);

export const layer_13 = importAll(
  require.context('../artwork/layer-13', false, /.png/)
);

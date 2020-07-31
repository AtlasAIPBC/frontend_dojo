import { init } from '@rematch/core';
import createPersistPlugin from '@rematch/persist';

import auth from './models/auth';
import map from './models/map';
import controls from './models/controls';

const persistPlugin = createPersistPlugin({
  version: 2,
  whitelist: ['auth'],
});

const store = init({
  models: {
    auth,
    map,
    controls,
  },
  plugins: [persistPlugin],
});

export default store;

export const { dispatch } = store;

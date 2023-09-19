import { createStore } from 'vuex';
import auth from '@/components/store/auth';

import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ['auth']
    })
  ]
});
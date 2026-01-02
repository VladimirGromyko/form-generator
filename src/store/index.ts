import { createStore } from "vuex";
export default createStore({
  state: {
    savedForms: [] as Array<{ id: number; data: Record<string, any> }>
  },
  mutations: {
    SAVEFORM(state, payload: { id: number; data: Record<string, any> }) {
      state.savedForms.push(payload);
    }
  },
  actions: {
    saveForm({ commit }, payload: { id: number; data: Record<string, any> }) {
      commit('SAVEFORM', payload);
    }
  },
  getters: {
    allSaved: (state) => state.savedForms
  }
});

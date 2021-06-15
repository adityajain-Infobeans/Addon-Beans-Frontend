export default {
  state: {
    currentComments: [],
  },
  getters: {},
  mutations: {
    addComment(state, commentData) {
      state.currentComments.unshift(commentData);
    },
    clearComment(state) {
      state.currentComments = [];
    },
  },
  actions: {
    addComment(context, commentData) {
      context.commit('addComment', commentData);
    },
    clearComment(context) {
      context.commit('clearComment');
    },
  },
};

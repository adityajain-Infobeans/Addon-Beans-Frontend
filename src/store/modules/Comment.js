export default {
  namespaced: true,
  state: {
    currentComments: [],
  },
  getters: {},
  mutations: {
    setComment(state, commentData) {
      state.currentComments = commentData;
    },
    addComment(state, commentData) {
      state.currentComments.unshift(commentData);
    },
    clearComment(state) {
      state.currentComments = [];
    },
  },
  actions: {
    setComment(context, commentData) {
      context.commit('setComment', commentData);
    },
    addComment(context, commentData) {
      context.commit('addComment', commentData);
    },
    clearComment(context) {
      context.commit('clearComment');
    },
  },
};

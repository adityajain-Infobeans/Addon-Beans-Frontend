export default {
  state: {
    RequirementsData: [],
  },
  getters: {},
  mutations: {
    setTicker(state, RequirementsData) {
      state.RequirementsData = RequirementsData;
    },
    deleteTicker(state, RequirementId) {
      state.RequirementsData = state.RequirementsData.filter(
        (Requirement) => Requirement.Requirement_id !== RequirementId,
      );
    },
    clearRequirements(state) {
      state.RequirementsData = [];
    },
  },
  actions: {
    setTicker(context, RequirementsData) {
      context.commit('setTicker', RequirementsData);
    },
    deleteTicker(context, RequirementId) {
      context.commit('deleteTicker', RequirementId);
    },
    clearRequirements(context) {
      context.commit('clearRequirements');
    },
  },
};

export default {
  state: {
    RequirementsData: [],
  },
  getters: {},
  mutations: {
    setRequirement(state, RequirementsData) {
      state.RequirementsData = RequirementsData;
    },
    deleteRequirement(state, RequirementId) {
      state.RequirementsData = state.RequirementsData.filter(
        (Requirement) => Requirement.Requirement_id !== RequirementId,
      );
    },
    clearRequirements(state) {
      state.RequirementsData = [];
    },
  },
  actions: {
    setRequirement(context, RequirementsData) {
      context.commit('setRequirement', RequirementsData);
    },
    deleteRequirement(context, RequirementId) {
      context.commit('deleteRequirement', RequirementId);
    },
    clearRequirements(context) {
      context.commit('clearRequirements');
    },
  },
};

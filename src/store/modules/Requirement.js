export default {
  state: {
    RequirementsData: [],
    headers: [
      {
        text: 'S. no',
        align: 'center',
        sortable: true,
        value: 'requirement_id',
      },
      {
        text: 'Status',
        align: 'center',
        sortable: true,
        value: 'status',
      },
      {
        text: 'Timeline',
        align: 'center',
        sortable: true,
        value: 'timeline',
      },
      {
        text: 'Subject',
        align: 'center',
        sortable: false,
        value: 'subject',
      },
      {
        text: 'Last Update',
        align: 'center',
        sortable: false,
        value: 'updated_on',
      },
      {
        text: 'Client',
        align: 'center',
        sortable: true,
        value: 'client_id',
      },
      {
        text: 'Edit',
        align: 'center',
        sortable: false,
        value: 'requirement_id',
      },
      {
        text: 'Delete',
        align: 'center',
        sortable: false,
        value: 'requirement_id',
      },
    ],
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

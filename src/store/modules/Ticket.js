export default {
  state: {
    ticketsData: [],
  },
  getters: {},
  mutations: {
    deleteTicker(state, ticketId) {
      state.ticketsData = state.ticketsData.filter((ticket) => ticket.ticket_id !== ticketId);
    },
    clearTickets(state) {
      state.ticketsData = [];
    },
  },
  actions: {
    deleteTicker(context, ticketId) {
      context.commit('deleteTicker', ticketId);
    },
    clearTickets(context) {
      context.commit('clearTickets');
    },
  },
};

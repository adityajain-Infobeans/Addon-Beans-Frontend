export default {
  state: {
    ticketsData: [],
  },
  getters: {},
  mutations: {
    setTicker(state, ticketsData) {
      state.ticketsData = ticketsData;
    },
    deleteTicker(state, ticketId) {
      state.ticketsData = state.ticketsData.filter((ticket) => ticket.ticket_id !== ticketId);
    },
    clearTickets(state) {
      state.ticketsData = [];
    },
  },
  actions: {
    setTicker(context, ticketsData) {
      context.commit('setTicker', ticketsData);
    },
    deleteTicker(context, ticketId) {
      context.commit('deleteTicker', ticketId);
    },
    clearTickets(context) {
      context.commit('clearTickets');
    },
  },
};

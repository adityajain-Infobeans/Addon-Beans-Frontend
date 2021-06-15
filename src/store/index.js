import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './modules/Auth';
import Comment from './modules/Comment';
import Ticket from './modules/Ticket';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navItems: [
      {
        icon: 'mdi-home',
        text: 'Home',
        route: '/',
      },
      {
        icon: 'mdi-ticket',
        text: 'Add Ticket',
        route: '/addTicket',
      },
      {
        icon: 'mdi-view-list',
        text: 'View Ticket',
        route: '/ViewTicket',
      },
      {
        icon: 'mdi-logout',
        text: 'Logout',
        route: 'Logout',
      },
    ],
    headers: [
      {
        text: 'S. no',
        align: 'center',
        sortable: true,
        value: 'ticket_id',
      },
      {
        text: 'Status',
        align: 'center',
        sortable: true,
        value: 'ticket_status',
      },
      {
        text: 'Priority',
        align: 'center',
        sortable: true,
        value: 'ticket_priority',
      },
      {
        text: 'Subject',
        align: 'center',
        sortable: false,
        value: 'ticket_subject',
      },
      {
        text: 'Last Update',
        align: 'center',
        sortable: false,
        value: 'ticket_last_updated',
      },
      {
        text: 'Edit',
        align: 'center',
        sortable: false,
        value: 'ticket_id',
      },
      {
        text: 'Delete',
        align: 'center',
        sortable: false,
        value: 'ticket_id',
      },
    ],
    priorities: [
      { priority: '', value: '' },
      { priority: 'P1 -- Critical', value: 'P1' },
      { priority: 'P2 -- High', value: 'P2' },
      { priority: 'P3 -- Medium', value: 'P3' },
    ],
  },
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Comment,
    Ticket,
  },
});

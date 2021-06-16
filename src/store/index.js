import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './modules/Auth';
import Comment from './modules/Comment';
import Requirement from './modules/Requirement';

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
        text: 'Add Requirement',
        route: '/addRequirement',
      },
      {
        icon: 'mdi-view-list',
        text: 'View Requirement',
        route: '/ViewRequirement',
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
        value: 'Requirement_id',
      },
      {
        text: 'Status',
        align: 'center',
        sortable: true,
        value: 'Requirement_status',
      },
      {
        text: 'Priority',
        align: 'center',
        sortable: true,
        value: 'Requirement_priority',
      },
      {
        text: 'Subject',
        align: 'center',
        sortable: false,
        value: 'Requirement_subject',
      },
      {
        text: 'Last Update',
        align: 'center',
        sortable: false,
        value: 'Requirement_last_updated',
      },
      {
        text: 'Edit',
        align: 'center',
        sortable: false,
        value: 'Requirement_id',
      },
      {
        text: 'Delete',
        align: 'center',
        sortable: false,
        value: 'Requirement_id',
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
    Requirement,
  },
});

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
        icon: 'mdi-ticket',
        text: 'Add Skill',
        route: '/addSkill',
      },
      {
        icon: 'mdi-ticket',
        text: 'View Skill',
        route: '/viewSkill',
      },
      {
        icon: 'mdi-logout',
        text: 'Logout',
        route: 'Logout',
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

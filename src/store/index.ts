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
        icon: 'mdi-form-textbox-password',
        text: 'Change Password',
        route: '/changePassword',
      },
      {
        icon: 'mdi-logout',
        text: 'Logout',
        route: 'Logout',
      },
    ],
  },
  getters: {
    navItems: (state) => state.navItems,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Comment,
    Requirement,
  },
});

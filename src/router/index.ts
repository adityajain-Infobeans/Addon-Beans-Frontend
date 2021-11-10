import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Logout from '../views/Logout.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/addRequirement',
    name: 'Add Requirement',
    component: () => import(/* webpackChunkName: "addRequirement" */ '../views/AddRequirement.vue'),
  },
  {
    path: '/updateRequirement/:id',
    name: 'Update Requirement',
    component: () => import(/* webpackChunkName: "updateRequirement" */ '../views/UpdateRequirement.vue'),
  },
  {
    path: '/viewRequirement/:id?',
    name: 'View Requirement',
    component: () => import(/* webpackChunkName: "viewRequirement" */ '../views/ViewRequirement.vue'),
  },
  {
    path: '/changePassword',
    name: 'Change Password',
    component: () => import(/* webpackChunkName: "changePassword" */ '../views/ChangePassword.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "viewRequirement" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

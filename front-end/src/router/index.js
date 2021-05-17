import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Logout from '../views/Logout.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Support-Ticket-System/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Support-Ticket-System/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/Support-Ticket-System/addticket',
    name: 'Add Ticket',
    component: () => import(/* webpackChunkName: "addticket" */ '../views/AddTicket.vue'),
  },
  {
    path: '/Support-Ticket-System/updateticket/:id',
    name: 'Update Ticket',
    component: () => import(/* webpackChunkName: "updateticket" */ '../views/UpdateTicket.vue'),
  },
  {
    path: '/Support-Ticket-System/viewticket/:id?',
    name: 'View Ticket',
    component: () => import(/* webpackChunkName: "viewticket" */ '../views/ViewTicket.vue'),
  },
  {
    path: '/Support-Ticket-System/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/Support-Ticket-System/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "viewticket" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

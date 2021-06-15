export default {
  state: {
    userData: {
      emp_id: null,
      emp_name: null,
      emp_email: null,
      token: null,
      is_hr: null,
      is_login: false,
    },
  },
  getters: {},
  mutations: {
    userLogin(state, userData) {
      state.userData.emp_id = userData.emp_id;
      state.userData.emp_name = userData.emp_name;
      state.userData.emp_email = userData.emp_email;
      state.userData.token = userData.token;
      state.userData.is_hr = userData.is_hr;
      state.userData.is_login = true;

      localStorage.setItem('userData', JSON.stringify(state.userData));
    },
    userLogout(state) {
      state.userData.emp_id = null;
      state.userData.emp_name = null;
      state.userData.emp_email = null;
      state.userData.token = null;
      state.userData.is_hr = null;
      state.userData.is_login = false;
      localStorage.removeItem('userData');
    },
  },
  actions: {
    userLogin(context, userData) {
      context.commit('userLogin', userData);
    },
    userLogout(context) {
      context.commit('userLogout');
    },
  },
};

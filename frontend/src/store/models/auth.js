export default {
  state: {
    loading: false,
    isUserLoggedIn: true,
    idToken: '',
  },
  reducers: {
    setLoggedUser(state, status, idToken) {
      return { ...state, loading: false, isUserLoggedIn: status, idToken: idToken };
    },
    logout(state) {
      return { ...state, isUserLoggedIn: false };
    },
  },
  effects: dispatch => ({

    async userLogIn(user) {},
    async userLogOut() {},
    async sendResetPasswordEmail(email) {},

  }),
};

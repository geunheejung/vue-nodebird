export const state = () => ({
  me: null,
});

export const MUTATION = {
  SET_ME: "SET_ME",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};
export const mutations = {
  [MUTATION.SET_ME](state, payload) {
    debugger;
    state.me = { ...payload, isLogin: false };
  },
  [MUTATION.LOGIN](state, payload) {
    state.me.isLogin = true;
  },
  [MUTATION.LOGOUT](state, payload) {
    state.me.isLogin = false;
  },
};

export const ACTION = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};
export const actions = {
  async [ACTION.SIGN_UP](ctx, { payload }) {
    debugger;
    ctx.commit(MUTATION.SET_ME, payload);
  },
  async [ACTION.LOGIN](ctx, payload) {
    const { userId, password } = payload;
    const { me } = ctx.state;
    debugger;
    if (me.userId !== userId || me.password !== password) {
      return Error("계정이 틀렸습니다.");
    }

    ctx.commit(MUTATION.LOGIN);
  },
  async [ACTION.LOGOUT](ctx, payload) {
    ctx.commit(MUTATION.LOGOUT);
  },
};

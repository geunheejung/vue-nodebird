export const state = () => ({
  me: {
    userId: "a@a.com",
    password: "111",
    isLogin: true,
    nickname: "geuni",
    terms: true,
  },
});

export const MUTATION = {
  SET_ME: "SET_ME",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
};

export const getters = {
  isLogin: ({ me }) => me && me.isLogin,
};
export const mutations = {
  [MUTATION.SET_ME](state, payload) {
    state.me = { ...payload, isLogin: false };
  },
  [MUTATION.LOGIN](state, payload) {
    state.me.isLogin = true;
  },
  [MUTATION.LOGOUT](state, payload) {
    state.me.isLogin = false;
  },
  [MUTATION.UPDATE_USER](state, payload) {
    const { nickname } = payload;

    state.me.nickname = nickname;
  },
};

export const ACTION = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
};
export const actions = {
  async [ACTION.SIGN_UP](ctx, { payload }) {
    ctx.commit(MUTATION.SET_ME, payload);
  },
  async [ACTION.LOGIN](ctx, payload) {
    const { me } = ctx.state;

    if (!me) return Error("회원가입 하세요");

    const { userId, password } = payload;

    if (me.userId !== userId || me.password !== password) {
      return Error("계정이 틀렸습니다.");
    }

    ctx.commit(MUTATION.LOGIN);
  },
  async [ACTION.LOGOUT](ctx, payload) {
    ctx.commit(MUTATION.LOGOUT);
  },
  async [ACTION.UPDATE_USER](ctx, payload) {
    ctx.commit(MUTATION.UPDATE_USER, payload);
  },
};

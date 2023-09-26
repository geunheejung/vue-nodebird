import uuid from "uuid";

class Users {
  constructor({ userId, nickname, password, terms }) {
    this.id = uuid.v4();
    this.userId = userId;
    this.nickname = nickname;
    this.password = password;
    this.followingList = [];
    this.followerList = [];
    this.terms = terms;
    this.isLogin = true;
  }
}

const mockData = [
  new Users({
    userId: "a@a1.com",
    nickname: "bob",
    password: "111",
    terms: true,
  }),
  new Users({
    userId: "a@a2.com",
    nickname: "john",
    password: "111",
    terms: true,
  }),
  new Users({
    userId: "a@a3.com",
    nickname: "chrese",
    password: "111",
    terms: true,
  }),
];

export const state = () => ({
  me: mockData[0],
  searchUsers: [],
  users: mockData,
});

export const MUTATION = {
  INSERT_USER: "INSERT_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  SEARCH_USER: "SEARCH_USER",
  SET_FOLLOWING: "SET_FOLLOWING",
};

export const getters = {
  isLogin: ({ me }) => me && me.isLogin,
};
export const mutations = {
  [MUTATION.INSERT_USER](state, payload) {
    const { userId, nickname, password, terms } = payload;
    const user = new Users({
      userId,
      nickname,
      password,
      terms,
    });
    state.users.push(user);
  },
  [MUTATION.LOGIN](state, payload) {
    state.me = payload;
    state.me.isLogin = true;
  },
  [MUTATION.LOGOUT](state, payload) {
    state.me = null;
  },
  [MUTATION.UPDATE_USER](state, payload) {
    const { nickname } = payload;

    state.me.nickname = nickname;

    const id = state.users.findIndex((user) => user.id === payload.id);

    state.users[id].nickname = nickname;
  },
  /**
   * 팔로우를 하는 대상의 팔로워로 자신을 추가한다.
   * 자신의 팔로잉 리스트에 팔로우 하는 대상을 추가한다.
   * @param state
   * @param payload
   */
  [MUTATION.SET_FOLLOWING](state, payload) {
    const { user, isRemove } = payload;
    const { id } = state.me;

    const followingIndex = state.users.findIndex((user) => user.id === id);
    const followerIndex = state.users.findIndex((row) => row.id === user.id);

    const { followingList } = state.users[followingIndex];
    const { followerList } = state.users[followerIndex];

    if (isRemove) {
      const followingListIndex = followingList.findIndex(
        (row) => row.id === user.id
      );

      const followerListIndex = followerList.findIndex(
        (row) => row.id === state.me.id
      );

      state.users[followingIndex].followingList.splice(followingListIndex, 1);
      state.users[followerListIndex].followerList.splice(followerListIndex, 1);
      return;
    }

    state.users[followerIndex].followerList.push(state.me);
    state.users[followingIndex].followingList.push(user);
  },
};

export const ACTION = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  SEARCH_USER: "SEARCH_USER",
  SET_FOLLOWING: "SET_FOLLOWING",
};
export const actions = {
  async [ACTION.SIGN_UP](ctx, { payload }) {
    ctx.commit(MUTATION.INSERT_USER, payload);
  },
  async [ACTION.LOGIN](ctx, payload) {
    const { users } = ctx.state;
    const { userId, password } = payload;
    const matchedId = users.find((user) => user.userId === userId);
    if (!matchedId) {
      return Error("이메일이 틀렸습니다.");
    }

    const matchedPw = matchedId.password === password;

    if (!matchedPw) {
      return Error("비밀번호가 틀렸습니다.");
    }

    ctx.commit(MUTATION.LOGIN, matchedId);
  },
  async [ACTION.LOGOUT](ctx, payload) {
    ctx.commit(MUTATION.LOGOUT);
  },
  async [ACTION.UPDATE_USER](ctx, payload) {
    ctx.commit(MUTATION.UPDATE_USER, payload);
  },
  async [ACTION.SEARCH_USER](ctx, payload) {
    ctx.commit(MUTATION.SEARCH_USER, payload);
  },
  async [ACTION.SET_FOLLOWING](ctx, payload) {
    ctx.commit(MUTATION.SET_FOLLOWING, payload);
  },
};

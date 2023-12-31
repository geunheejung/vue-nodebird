import * as user from "./user";
import * as post from "./post";

const createType = (path, types) => {
  return Object.keys(types).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: `${path}/${curr}`,
    };
  }, {});
};

export const userMutations = createType("user", user.MUTATION);
export const userActions = createType("user", user.ACTION);
export const postMutations = createType("post", post.MUTATION);
export const postActions = createType("post", post.ACTION);

export const state = () => ({});

export const mutationType = {};
export const mutations = {};

export const actionType = {};
export const actions = {};

import { uuid } from "vue-uuid";
import Vue from "vue";

class Post {
  constructor({ content, user, images, postId }) {
    this.id = uuid.v4();
    this.postId = postId;
    this.content = content;
    this.user = user;
    this.likes = [];
    this.images = images;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.commentList = {};
  }
}

export const state = () => ({
  postObj: {},
  commentObj: {},
});

export const getters = {
  comments: (state) => {
    return state.commentObj;
  },
};

export const MUTATION = {
  SET_POST: "SET_POST",
  REMOVE_POST: "REMOVE_POST",
  UPDATE_POST: "UPDATE_POST",
  SET_COMMENT: "SET_COMMENT",
  UPDATE_LKIES: "UPDATE_LKIES",
};
export const mutations = {
  [MUTATION.SET_POST](state, post) {
    Vue.set(state.postObj, post.id, post);
    // state.postObj = {
    //   ...state.postObj,
    //   [post.id]: post,
    // };
  },
  [MUTATION.REMOVE_POST](state, id) {
    if (state.postObj[id]) {
      Vue.delete(state.postObj, id);
      return;
    }

    const commentId = id;
    const { postId } = state.commentObj[commentId];
    const parentPost = state.postObj[postId];

    if (parentPost) {
      Vue.delete(parentPost.commentList, commentId);
      return;
    }

    const parentCommentId = state.commentObj[commentId].postId;
    Vue.delete(state.commentObj[parentCommentId].commentList, commentId);
    Vue.delete(state.commentObj, commentId);
  },
  [MUTATION.UPDATE_POST](state, { id, content }) {
    if (state.postObj[id]) {
      state.postObj[id].content = content;
      return;
    }

    state.commentObj[id].content = content;
  },

  [MUTATION.SET_COMMENT](state, newComment) {
    const { postId, id } = newComment;

    Vue.set(state.commentObj, id, newComment);

    if (state.postObj[postId]) {
      Vue.set(state.postObj[postId].commentList, id, newComment);
      return;
    }

    Vue.set(state.commentObj[postId].commentList, id, newComment);
  },
  [MUTATION.UPDATE_LKIES](state, payload) {
    const { userId, postId } = payload;

    const index = state.postObj[postId].likes.findIndex((id) => id === userId);

    if (index === -1) {
      state.postObj[postId].likes.push(userId);
      return;
    }

    state.postObj[postId].likes.splice(index, 1);
  },
};

export const ACTION = {
  ADD_POST: "ADD_POST",
  REMOVE_POST: "REMOVE_POST",
  UPDATE_POST: "UPDATE_POST",
  ADD_COMMENT: "ADD_COMMENT",
  UPDATE_LKIES: "UPDATE_LKIES",
};
export const actions = {
  async [ACTION.ADD_POST](ctx, payload) {
    const { content } = payload;
    const {
      rootState: {
        user: { me },
      },
    } = ctx;
    const newPost = new Post({
      content,
      images: [],
      user: me,
      comments: [],
    });
    ctx.commit(MUTATION.SET_POST, newPost);
  },
  async [ACTION.REMOVE_POST](ctx, payload) {
    ctx.commit(MUTATION.REMOVE_POST, payload);
  },
  async [ACTION.UPDATE_POST](ctx, payload) {
    ctx.commit(MUTATION.UPDATE_POST, payload);
  },
  async [ACTION.ADD_COMMENT](ctx, payload) {
    const { content, postId, user } = payload;

    const newComment = new Post({ content, postId, user });

    ctx.commit(MUTATION.SET_COMMENT, newComment);
  },
  async [ACTION.UPDATE_LKIES](ctx, payload) {
    debugger;
    ctx.commit(MUTATION.UPDATE_LKIES, payload);
  },
};

import { uuid } from "vue-uuid";
import Vue from "vue";

class Post {
  constructor({ content, user, images }) {
    this.id = `POST: ${Date.now()}`;
    this.content = content;
    this.user = user;
    this.images = images;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.commentList = {};
  }
}

class Comment {
  constructor({ content, user, postId }) {
    this.id = `COMMENT ${Date.now()}`;
    this.content = content;
    this.user = user;
    this.postId = postId;
    this.commentList = {};
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
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
};

export const ACTION = {
  ADD_POST: "ADD_POST",
  REMOVE_POST: "REMOVE_POST",
  UPDATE_POST: "UPDATE_POST",
  ADD_COMMENT: "ADD_COMMENT",
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
    debugger;
    ctx.commit(MUTATION.REMOVE_POST, payload);
  },
  async [ACTION.UPDATE_POST](ctx, payload) {
    debugger;
    ctx.commit(MUTATION.UPDATE_POST, payload);
  },
  async [ACTION.ADD_COMMENT](ctx, payload) {
    const { content, postId, user } = payload;

    const newComment = new Comment({ content, postId, user });

    ctx.commit(MUTATION.SET_COMMENT, newComment);
  },
};

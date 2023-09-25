<template>
  <div>
    <v-container v-if="isLogin">
      <post-form />
    </v-container>
    <v-card>
      <post-list :post-list="posts" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PostForm from "~/components/PostForm";
import PostList from "~/components/PostList";
export default {
  components: {
    PostForm,
    PostList,
  },
  computed: {
    ...mapState({
      posts: (state) => Object.values(state.post.postObj),
    }),
    ...mapGetters({ isLogin: "user/isLogin" }),
  },
  created() {},
};
</script>

<style></style>

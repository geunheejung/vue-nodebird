<template>
  <div>
    <v-container v-for="post in postList" :key="post.id">
      <post-card :post="post" />
      <template v-if="values(post.commentList)">
        <div
          style="padding: 0 0 0 40px"
          v-for="comment in values(post.commentList)"
          :key="comment.id"
        >
          <post-card :key="comment.id" :post="comment" />
          <div
            style="padding: 0 0 0 40px"
            v-if="values(comment.commentList)"
          >
            <post-list :post-list="values(comment.commentList)" />
          </div>
        </div>
      </template>
    </v-container>
  </div>
</template>
<script>
import PostCard from "~/components/PostCard";
import { mapGetters } from "vuex";
export default {
  name: "post-list",
  props: {
    postList: {
      type: Array,
      required: true,
    },
  },
  components: {
    PostCard,
  },
  methods: {
    values(object) {
      const list = Object.values(object);
      if (!list.length) return false;
      return list;
    },
  },
};
</script>
<style></style>

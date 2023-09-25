<template>
  <div>
    <!--    <template v-if="!post.commentList.length">-->
    <!--      <post-card :post="post" :key="post.id" />-->
    <!--    </template>-->
    <!--    <post-card-->
    <!--      :post="comment"-->
    <!--      v-for="comment in post.commentList"-->
    <!--      :key="comment.id"-->
    <!--    />-->
    <post-list :post-list="comment.commentList" />
  </div>
</template>
<script>
import PostCard from "~/components/PostCard";
import PostList from "~/components/PostList";

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    PostCard,
    PostList,
  },
  data() {
    return {};
  },
  updated() {},
  methods: {},
  computed: {},
  created() {},
};
</script>

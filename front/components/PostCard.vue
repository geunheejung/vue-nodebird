<template>
  <v-container>
    <v-img />
    <v-card-text>
      <div v-if="!isEditPostMode">
        <h3>{{ post.user.nickname }}</h3>
        <div>{{ post.content }}</div>
      </div>
      <div v-else>
        <post-form
          :post-id="post.id"
          :post-content="post.content"
          :isAfterSubmit="true"
          @onClose="onClose"
          @onAfterSubmit="onEditPostSubmit"
        />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange">
        <v-icon>mdi-repeat-variant</v-icon>
      </v-btn>
      <v-btn text color="orange">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn text color="orange" @click="onWriteCommentClick">
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn text color="orange" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <div style="background: #fff">
          <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
          <v-btn text color="red" @click="onEditPost">수정</v-btn>
        </div>
      </v-menu>
    </v-card-actions>
    <v-card v-if="isAddCommentMode">
      <v-container>
        <post-form
          :post-id="post.id"
          :isAfterSubmit="true"
          @onAfterSubmit="onAddCommentSubmit"
          @onClose="onCommentFormClose"
        />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { postActions } from "~/store";
import PostForm from "~/components/PostForm";

export default {
  components: {
    PostForm,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditPostMode: false,
      isAddCommentMode: false,
    };
  },
  mounted() {},
  methods: {
    onRemovePost() {
      this.$store.dispatch(postActions.REMOVE_POST, this.post.id);
    },
    onEditPost() {
      this.setEditPostMode(true);
    },
    onWriteCommentClick() {
      this.isAddCommentMode = true;
    },
    onClose() {
      this.setEditPostMode(false);
    },
    onCommentFormClose() {
      this.isAddCommentMode = false;
    },
    onAfterSubmit() {
      this.setEditPostMode(false);
    },
    setEditPostMode(isEditPostMode) {
      this.isEditPostMode = isEditPostMode;
    },
    async onAddCommentSubmit(content) {
      try {
        await this.$store.dispatch(postActions.ADD_COMMENT, {
          postId: this.post.id,
          content: content,
          user: this.$store.state.user.me,
        });
        this.isAddCommentMode = false;
      } catch (error) {
        console.error(error);
      }
    },
    async onEditPostSubmit(content) {
      try {
        debugger;
        await this.$store.dispatch(postActions.UPDATE_POST, {
          id: this.post.id,
          content: content,
        });
        this.setEditPostMode(false);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>

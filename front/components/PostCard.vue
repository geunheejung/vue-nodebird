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
      <v-menu offset-y open-on-hover v-if="isPossibleEdit">
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
import { mapState } from "vuex";

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
  computed: {
    ...mapState({ me: (state) => state.user.me }),
    isPossibleEdit(state) {
      if (!this.me) return false;

      return this.me.id === this.post.user.id;
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
  handleLikeClick() {
    // 1. 사용자는 자신이 좋아요를 누른 게시글은 좋아요로 표시 되어야 함
    // 2. 게시글은 자신을 좋아요 누른 사용자들을 알아야 함
    // 3. 좋아요의 개수는 (2)번의 개수
    // 4. 팔로우랑 비슷하네
  },
};
</script>

<style></style>

<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :success-messages="successMessages"
          :success="success"
          :rules="postRules"
          :value="content"
          @input="onChangeTextarea"
        />
        <v-row>
          <v-col cols="4">
            <v-btn>이미지 업로드</v-btn>
          </v-col>
          <v-col
            cols="8"
            style="display: flex; justify-content: flex-end; gap: 10px"
          >
            <v-btn type="submit" color="green" :disabled="!valid">작성</v-btn>
            <v-btn v-if="postId" @click="$emit('onClose')">취소</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { postActions } from "~/store";

export default {
  props: {
    postId: {
      type: String,
    },
    postContent: {
      type: String,
    },
    isAfterSubmit: {
      type: Boolean,
    },
  },
  data() {
    return {
      valid: false,
      successMessages: "",
      success: false,
      content: "",
      postRules: [
        //  실제 하나의 키워드라도 입력을 시도한 순간에만
        (v = "") => {
          if (v && v.trim().length) return true;
          if (this.success) return true;

          return "본문을 입력하세요";
        },
      ],
    };
  },
  computed: {
    isValid(state) {
      return this.$refs.form.validate();
    },
  },
  mounted() {
    if (this.postContent) {
      this.content = this.postContent;
    }
  },
  methods: {
    onChangeTextarea(value) {
      this.content = value;
      this.success = false;
      this.successMessages = "";
    },
    onSubmitForm() {
      if (!this.isValid) return;
      if (this.isAfterSubmit) {
        this.$emit("onAfterSubmit", this.content);
        return;
      }

      this.addPost();
    },
    successFlow() {
      this.success = true;
      this.successMessages = "게시글 등록 성공!";
      this.content = "";
    },
    async addPost() {
      try {
        await this.$store.dispatch(postActions.ADD_POST, {
          content: this.content,
        });
        this.successFlow();
      } catch (error) {
      }
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              label="닉네임"
              required
              v-model="nickname"
              :rules="nicknameRules"
              :success="success"
              :success-messages="successMessages"
            />
            <v-btn :disabled="!valid" color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <FollowList />
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <FollowList />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList";
import { userActions } from "@/store";
export default {
  asyncData({ store }) {
    const {
      state: {
        user: { me },
      },
    } = store;
    return {
      user: me,
      nickname: me.nickname,
    };
  },
  components: {
    FollowList,
  },
  head() {
    return {
      title: "프로필",
    };
  },
  data() {
    return {
      valid: false,
      user: {},
      success: false,
      successMessages: "",
      nickname: "",
      nicknameRules: [
        (v) => {
          const value = v.trim();

          if (!value) return "닉네임을 입력해주세요";

          if (value === this.user.nickname) return "이전 닉네임과 동일 합니다.";
        },
      ],
    };
  },
  methods: {
    async onSubmitForm() {
      await this.$store.dispatch(userActions.UPDATE_USER, {
        nickname: this.nickname,
      });
      this.success = true;
      this.successMessages = "이름 변경 완료";
    },
  },
};
</script>

<style></style>

<template>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>회원가입</v-subheader>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-text-field
            v-model="userId"
            label="이메일"
            :rules="userIdRules"
            required
          />
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-text-field
            v-model="passwordCheck"
            label="비밀번호 확인"
            type="password"
            :rules="passwordCheckRules"
            required
          />
          <v-text-field
            v-model="nickname"
            label="닉네임"
            :rules="nicknameRules"
            required
          />
          <v-checkbox
            v-model="terms"
            required
            label="제로초 말을 잘 듣을 것을 약속합니다."
            :rules="termsRules"
          />
          <v-btn
            color="green"
            class="white--text"
            type="submit"
            :disabled="!valid"
          >
            가입
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: "회원가입",
    };
  },
  data() {
    return {
      valid: false,
      userId: "",
      userIdRules: [(v) => !!v || "이메일은 필수입니다."],
      nickname: "",
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다."],
      password: "",
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      passwordCheck: "",
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다.",
      ],
      terms: false,
      termsRules: [(v) => !!v || "약관에 동의해야 합니다."],
    };
  },
  methods: {
    onSubmitForm() {
      const isValid = this.$refs.form.validate();
    },
  },
};
</script>

<style></style>

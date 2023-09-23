<template>
  <v-container>
    <v-card>
      <v-subheader>회원가입</v-subheader>
      <v-form>
        <v-container>
          <v-text-field label="이메일" type="email" required />
          <v-text-field label="비밀번호" type="password" required />
          <v-text-field label="비밀번호 확인" type="password" required />
          <v-text-field label="닉네임" type="text" required />
          <v-checkbox label="필수 약관동의" required />
          <v-btn color="green" type="submit">회원가입</v-btn>
        </v-container>
      </v-form>
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
};
</script>

<style></style>

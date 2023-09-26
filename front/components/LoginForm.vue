<template>
  <v-container>
    <v-card>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="onSubmitForm"
        v-if="!isLogin"
      >
        <v-container>
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
          <v-btn
            color="green"
            class="white--text"
            type="submit"
            :disabled="!valid"
          >
            로그인
          </v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
      <v-container v-else>
        {{ me.nickname }}로그인 되었습니다.
        <v-btn @click="onLogout">로그아웃</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { userActions } from "~/store";
export default {
  data() {
    return {
      valid: false,
      userId: "",
      userIdRules: [(v) => !!v || "이메일은 필수입니다."],
      password: "",
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
    };
  },
  computed: {
    ...mapState({
      me: (state) => state.user.me,
      isLogin: (state) => state.user.me && state.user.me.isLogin,
    }),
  },
  methods: {
    async onSubmitForm() {
      const isValid = this.$refs.form.validate();
      if (!isValid) {
        return;
      }

      await this.$store.dispatch(userActions.LOGIN, {
        userId: this.userId,
        password: this.password,
      });

      await this.$router.replace("/");
    },
    async onLogout() {
      try {
        await this.$store.dispatch(userActions.LOGOUT);
      } catch (error) {
      } finally {
        this.$router.replace("/");
      }
    },
  },
  created() {},
};
</script>

<style></style>

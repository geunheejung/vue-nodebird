<template>
  <header>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <v-btn text nuxt to="/" :align="'center'">
            <div>NodeBird</div>
          </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items :style="{ display: 'flex', alignItems: 'center' }">
          <v-text-field
            prepend-icon="mdi-magnify"
            label="검색"
            hide-details
            :style="{ display: 'flex', alignItems: 'center' }"
          />

          <v-btn
            text
            nuxt
            :to="isLogin ? '/profile' : '/login'"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>{{ isLogin ? "프로필" : "로그인" }}</div>
          </v-btn>
          <v-btn
            text
            nuxt
            @click="handleSignupClick"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>{{ isLogin ? "로그아웃" : "회원가입" }}</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
import { userActions } from "@/store";

export default {
  computed: {
    ...mapGetters({ isLogin: "user/isLogin" }),
  },
  methods: {
    async handleSignupClick() {
      if (!this.isLogin) {
        this.$router.push("/signup");
        return;
      }

      await this.$store.dispatch(userActions.LOGOUT);
      if (this.$route.path !== "/") await this.$router.replace("/");
    },
  },
};
</script>

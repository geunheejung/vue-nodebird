<template>
  <v-app>
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
            to="/profile"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>프로필</div>
          </v-btn>
          <v-btn
            text
            nuxt
            to="/signup"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters align-content="start">
      <v-col cols="12" md="4">
        <login-form></login-form>
      </v-col>
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { userActions } from "~/store";
import LoginForm from "~/components/LoginForm";

export default {
  components: {
    LoginForm,
  },
  data() {
    return { searchKeyword: "" };
  },
  computed: {
    ...mapState({ searchUsers: "user/searchUsers" }),
    ...mapGetters({ isLogin: "user/isLogin" }),
  },
  methods: {
    onSearchInput() {
      this.$store.dispatch(userActions.SEARCH_USER, {
        nickname: this.searchKeyword.trim(),
      });
    },
  },
};
</script>

<style></style>

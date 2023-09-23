<template>
  <div>
    <v-container v-if="isLogin">
      <post-form />
    </v-container>
    <v-container>
      <profile-card />
      <profile-card />
      <profile-card />
      <profile-card />
      <profile-card />
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileCard from "~/components/ProfileCard";
import PostForm from "~/components/PostForm";
export default {
  components: {
    ProfileCard,
    PostForm,
  },
  computed: {
    ...mapGetters({ isLogin: "user/isLogin" }),
  },
  created() {
    console.log(this.$store);
  },
};
</script>

<style></style>

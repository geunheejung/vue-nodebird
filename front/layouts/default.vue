<template>
  <v-app>
    <MainHeader />
    <v-row no-gutters align-content="start">
      <!--      <v-col cols="12" md="4"> </v-col>-->
      <v-col cols="12" md="12">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import MainHeader from "@/components/MainHeader";

export default {
  components: {
    MainHeader,
  },
};
</script>

<style></style>

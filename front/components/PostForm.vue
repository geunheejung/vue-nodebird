<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :success-message="successMessage"
          :success="success"
          :rules="postRules"
          @input="onChangeTextarea"
        />
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      hideDetails: false,
      successMessage: "",
      success: false,
      // v => condition || error msg
      postRules: [(v = "") => (!!v && !!v.trim()) || "본문을 입력하세요"],
    };
  },
  methods: {
    onChangeTextarea() {},
    onSubmitForm() {
      if (this.$refs.form.validate()) {
      }
    },
  },
};
</script>

<style scoped></style>

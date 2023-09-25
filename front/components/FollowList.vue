<template>
  <v-list>
    <v-list-item>
      <span>
        <slot name="text"></slot>
      </span>
      <button @click="handleRemove">
        <v-icon>mdi-minus-circle-outline</v-icon>
      </button>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  methods: {
    handleRemove() {
      this.$emit("onRemoveClick", this.user);
    },
  },
};
</script>

<style></style>

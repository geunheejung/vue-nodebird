<template>
  <v-app>
    <div>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <v-btn text nuxt to="/">
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
          <v-btn text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </v-app>
</template>

<script></script>

<style></style>

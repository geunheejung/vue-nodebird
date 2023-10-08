<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              label="닉네임"
              required
              v-model="nickname"
              :rules="nicknameRules"
              :success="success"
              :success-messages="successMessages"
            />
            <v-btn :disabled="!valid" color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px">
        <v-container>
          <search
            :list="filteredUsers"
            :target="'nickname'"
            :filtered="user.followingList"
            @onClickItem="handleAddFollowing"
          />
        </v-container>
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <FollowingList
              v-for="following in Array.from(user.followingList)"
              :key="following.id"
              :user="following"
              @onRemoveClick="handleRemoveFollowing"
            >
              <template v-slot:text>
                {{ following.nickname }}
              </template>
            </FollowingList>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container> 
          <v-subheader>팔로워</v-subheader>
          <FollowerList
            v-for="follower in followerList"
            :key="follower.id"
            :user="follower"
            @onRemoveClick="handleRemoveFollowing"
          >
            <template v-slot:text>
              {{ follower.nickname }}
            </template>
          </FollowerList>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList";
import { userActions } from "@/store";
import Search from "~/components/Search";
export default {
  asyncData({ store }) {
    const {
      state: {
        user: { me, users },
      },
    } = store;

    return {
      user: me,
      users,
      nickname: me.nickname,
    };
  },
  components: {
    FollowingList: FollowList,
    FollowerList: FollowList,
    Search,
  },
  head() {
    return {
      title: "프로필",
    };
  },
  data() {
    return {
      valid: false,
      user: {},
      users: [],
      success: false,
      successMessages: "",
      nickname: "",
      nicknameRules: [
        (v) => {
          const value = v.trim();

          if (!value) return "닉네임을 입력해주세요";

          if (value === this.user.nickname) return "이전 닉네임과 동일 합니다.";
        },
      ],
    };
  },
  computed: {
    filteredUsers: ({ users, user }) =>
      users.filter((row) => row.id !== user.id),
      followingList() {
        return this.user.followingList.values() 
      },
      followerList() {
        return this.user.followerList.values()
      },

  },
  methods: {
    async onSubmitForm() {
      await this.$store.dispatch(userActions.UPDATE_USER, {
        id: this.user.id,
        nickname: this.nickname,
      });
      this.success = true;
      this.successMessages = "이름 변경 완료";
    },
    handleAddFollowing(user) {
      this.$store.dispatch(userActions.SET_FOLLOWING, {
        user,
        isRemove: false,
      });
    },
    handleRemoveFollowing(user) {
      
      this.$store.dispatch(userActions.SET_FOLLOWING, { user, isRemove: true });
    },
  },
};
</script>

<style></style>

<template>
  <div class="search-wrapper">
    <div class="input-container">
      <input
        id="searchInput"
        name="searchInput"
        type="text"
        v-model.trim="keyword"
        @input="onSearchInput"
      />
      <label
        for="searchInput"
        :class="['input-label', { active: keyword.length }]"
      />
    </div>
    <ul class="list-container" v-if="listItems.length">
      <li
        class="list-item"
        v-for="item in listItems"
        :key="item.id"
        @click="handleClickItem(item)"
      >
        <span>{{ item[target] }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    filtered: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      keyword: "",
      result: [],
      selectedItem: null,
    };
  },
  computed: {
    listItems(state) {
      if (!this.filtered.length) return state.result;
      const filterdList = this.result.filter((listItem) => {
        return this.filtered.every((filterItem) => {
          return filterItem.id !== listItem.id;
        });
      });

      return filterdList;
    },
  },
  methods: {
    onSearchInput() {
      if (!this.keyword) {
        this.result = [];
        return;
      }

      this.result = this.list.filter((row) =>
        row[this.target].includes(this.keyword)
      );
    },
    handleClickItem(item) {
      this.selectedItem = item;
      this.$emit("onClickItem", item);
      this.result = [];
      this.keyword = "";
    },
  },
};
</script>

<style>
.search-wrapper {
  position: relative;
}

.search-wrapper .list-container {
  position: absolute;
  width: 100%;
  z-index: 20;
  overflow-y: scroll;
  padding: 5px;
  min-height: 40px;
  max-height: 200px;
  background: #eee;
  color: #222;
}

.search-wrapper .input-container {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 16px 5px 16px;
  border-bottom: 1px solid #ccc;
  background: #fff;
  border-radius: 3px 3px 0 0;
}

.search-wrapper .input-container input {
  border: none;
  outline: none;
}

.search-wrapper .input-container input:focus {
  border: none;
}

.search-wrapper .input-container label:after {
  content: "";
}

.search-wrapper .input-container label:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -1px;
  width: 0;
  height: 2px;
  background: #bbb;
  transition: 1s;
}

.search-wrapper .input-container input:focus + label:after {
  content: "";
  width: 100%;
  transition: 1s;
}

.search-wrapper .input-container label:before {
  content: "Search...";
  position: absolute;
  left: 0;
  padding: 0 16px 0 16px;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #222;
  transition: 0.5s;
}

.search-wrapper .input-container label.active:before,
.search-wrapper input:focus + label:before {
  transition: 0.5s;
  top: -16px;
  font-size: 11px;
  color: #ccc;
}

.search-wrapper .list-container .list-item {
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid #222;
}
.search-wrapper .list-contaoner .list-item:last-child {
  border: none;
}
</style>

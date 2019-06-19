<template>
  <div class="container">
    <nav aria-label="Page navigation ">
      <ul
        class="pagination pagination-lg"
        style="display:inline-flex"
      >
        <li :class="{'page-item':1===1, 'disabled':currentPage===1}">
          <a
            class="page-link"
            href="javascript:void(0);"
            aria-label="Previous"
            @click="preClick"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          :class="{'page-item':1===1,'active':item===currentPage}"
          v-for="item of page_item"
          :key="item"
          v-on:click="submit"
        ><a
            class="page-link"
            href="javascript:void(0);"
            @click="itemClick(item)"
          >{{item}}</a></li>
        <li :class="{'page-item':1===1, 'disabled':currentPage===totalPage}">
          <a
            class="page-link"
            href="javascript:void(0);"
            aria-label="Next"
            @click="nextClick"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  created() {
    this.$options.methods.initPageItem.bind(this)();
  },
  data() {
    return {
      totalPage: this.total,
      startPage: 1,
      pageRange: this.range,
      currentPage: 1,
      page_item: []
    };
  },
  props: {
    total: Number,
    range: Number
  },
  watch: {
    currentPage(newVal, oldVal) {
      this.$emit("currentPage", newVal);
    },
    total(newVal, oldVal) {
      this.totalPage = this.total;
      this.$options.methods.initPageItem.bind(this)();
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    preClick() {
      this.currentPage = this.currentPage - 1;
      this.$options.methods.initPageItem.bind(this)();
    },
    nextClick() {
      this.currentPage = this.currentPage + 1;
      this.$options.methods.initPageItem.bind(this)();
    },
    itemClick(item) {
      this.currentPage = item;
      this.$options.methods.initPageItem.bind(this)();
    },
    initPageItem() {
      let left = Math.floor(this.pageRange / 2),
        right = this.totalPage - Math.floor(this.pageRange / 2) + 1;
      if (this.currentPage > left && this.currentPage < right) {
        this.startPage = this.currentPage - Math.floor(this.pageRange / 2);
      }
      if (this.currentPage <= left) {
        this.startPage = 1;
      }
      if (this.currentPage >= right) {
        this.startPage = this.totalPage - this.range + 1;
      }
      this.$options.methods.resetPageItem.bind(this)(
        this.startPage,
        this.pageRange
      );
    },
    resetPageItem(start, range) {
      this.page_item.splice(0);
      if (this.pageRange > this.totalPage) {
        for (let i = 1; i <= this.totalPage; i++) {
          this.page_item.push(i);
        }
      } else {
        for (let i = start; i < range + start; i++) {
          this.page_item.push(i);
        }
      }
    }
  }
};
</script>
<style scoped>
</style>

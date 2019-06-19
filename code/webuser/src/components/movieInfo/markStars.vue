<template>
  <div>
    <font-awesome-icon
      class="text-warning"
      v-for="vicon in icon_list"
      :key="vicon.index"
      :icon="vicon.style"
      v-on:mouseover="starPadding(vicon.index)"
      v-on:mouseout="starInit"
      v-on:click="starEnsure(vicon.index)"
    />

  </div>
</template>
<script>
export default {
  created() {
    this.$options.methods.init.bind(this)(this.score);
  },
  props: {
    score: Number
  },
  data() {
    return {
      message: "",
      mscore: 0,
      ensureScore: 0,
      icon_list: [
        {
          index: 0,
          style: ["far", "star"]
        },
        {
          index: 1,
          style: ["far", "star"]
        },
        {
          index: 2,
          style: ["far", "star"]
        },
        {
          index: 3,
          style: ["far", "star"]
        },
        {
          index: 4,
          style: ["far", "star"]
        }
      ],
      message_list: ["垃圾", "瑕疵", "一般", "不错", "完美"]
    };
  },
  watch: {
    message(newVal, oldVal) {
      this.$emit("changeMessage", newVal);
    },
    ensureScore(newVal, oldVal) {
      newVal = newVal * 2;
      this.$emit("changeScore", newVal);
    }
  },
  methods: {
    init(number) {
      if (number === undefined) {
        this.mscore = 0;
      } else {
        this.mscore = number;
      }
      number = Math.floor(number / 2);
      this.$options.methods.starPadding.bind(this)(number - 1);
    },
    starPadding(index) {
      this.message = this.message_list[index];
      for (let i = 0; i < 5; i++) {
        if (i <= index) {
          this.icon_list[i].style = ["fas", "star"];
        } else {
          this.icon_list[i].style = ["far", "star"];
        }
      }
    },
    starInit() {
      for (let i = 0; i < 5; i++) {
        if (i < this.ensureScore) {
          this.icon_list[i].style = ["fas", "star"];
        } else {
          this.icon_list[i].style = ["far", "star"];
        }
      }
      if (this.ensureScore === 0) {
        this.message = "";
      } else {
        this.message = this.message_list[this.ensureScore - 1];
      }
    },
    starEnsure(index) {
      this.ensureScore = index + 1;
    }
  }
};
</script>
<style scoped>
.text-warning {
  margin: 2px;
}
</style>

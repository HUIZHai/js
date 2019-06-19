<template>
  <div class="container">
    <h1>{{commentary.title}}</h1>
    <div
      class="d-flex justify-content-center"
      style="align-items:center"
    >
      <img
        class="user-img"
        :src=commentary.userUrl
        alt="用户头像"
      >
      <p style="margin-top: 1rem;margin-left:5px">{{commentary.userName}}</p>
      <stars
        :score=commentary.score
        style="margin-left:5px"
      ></stars>
      <small style="margin-left:5px">{{commentary.time}}</small>
    </div>
    <div
      class="article"
      v-html="commentary.content"
    >
    </div>
  </div>
</template>

<script>
import scoreStars from "../../components/scoreStars.vue";

export default {
  created() {
    this.id = this.$route.query.commentaryId;
    this.$options.methods.getCommentary.bind(this)(this.id);
  },
  components: {
    stars: scoreStars
  },
  data() {
    return {
      id: 0,
      commentary: {}
    };
  },
  methods: {
    getCommentary(id) {
      let url = this.GLOBAL.BASE_URL + "long/get/id?id=" + id;
      this.$axios
        .get(url)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.commentary = json.data;
          } else {
            this.$parent.$parent.alert("danger", json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style >
.user-img {
  height: 40px;
  width: 40px;
}
.article {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-top: 3%;
  padding-left: 5%;
  padding-right: 5%;
  margin-left: 5%;
  margin-right: 5%;
  border: 2px solid rgb(0, 119, 255);
}

.article img {
  max-width: 100%;
}

h1 {
  margin-top: 3%;
}
</style>

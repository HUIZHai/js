<template>
  <div class="container">
    <div
      class="row"
      style="padding:15px"
    >
      <h3 style="">{{movie["name"]}} {{movie["foreignName"]}} ({{movie_year}})</h3>
    </div>
    <div class="row">
      <div class="col-lg-3">
        <div
          class="card bg-info"
          style="box-shadow:10px 10px 5px #888888"

        >
          <img
            :src="movie.imgUrl"
            alt=""
            
          >
        </div>
      </div>
      <div class="col-lg-6">
        <div
          class="row mx-1"
          v-for="part in movie_entity"
          :key="part.id"
        >
          <p style="text-align:left">
            <span>{{part.type_name}}</span>
            <span style="text-align:left">{{movie[part.value_name]}}</span></p>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="row">
          <h4>电影评分</h4>
        </div>
        <div
          id="score"
          class="row"
          style="align-items:center"
        >
          <h1>{{movie.score.toFixed(1)}}</h1>
          <stars :score="movie.score"></stars>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="movie.shortCommentary"
            data-toggle="modal"
            data-target="#markDialog"
          >短评</button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="movie.longCommentary"
            @click="termToCommentaryEdit"
          >影评</button>
        </div>
      </div>
    </div>
    <div
      class="row"
      style="padding:15px"
    >
      <h4>电影简介</h4>
    </div>
    <div
      class="row"
      style="text-align:left;padding-left:15px"
    >
      <p>{{movie.introduction}}</p>
    </div>
    <div
      class="row"
      style="padding:15px"
    >
      <h4>电影短评</h4>
    </div>
    <div
      class="row"
      style="text-align:left;padding-left:15px"
    >
      <div
        class="list-group"
        style="width:100%"
      >
        <div
          class="list-group-item list-group-item-action flex-column align-items-start"
          style="margin-bottom:5px"
          v-for="shortCommentary in shortCommentarys"
          :key="shortCommentary.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <div class="d-flex justify-content-start">
              <h5 class="mb-1">{{shortCommentary.username}}</h5>
              <stars
                :score="shortCommentary.score"
                style="margin-left:20px"
              ></stars>
            </div>
          </div>
          <p class="mb-1">{{shortCommentary.content}}</p>
          <small>{{shortCommentary.createDateTimeString}}</small>
        </div>
      </div>
    </div>
    <mark-dialog
      id="markDialog"
      ref="mark"
      :score="userShortCommentary.score"
      :content="userShortCommentary.content"
      v-on:submit="submitShortCommentary"
      v-on:inputscore="watchScore"
      v-on:inputcontent="watchContent"
    ></mark-dialog>
  </div>
</template>

<script>
import scoreStars from "../../components/scoreStars.vue";
import markDialog from "../../components/movieInfo/markDialog.vue";

export default {
  name: "movie_info",
  inject: ["reload"],
  components: {
    "stars": scoreStars,
    "mark-dialog": markDialog
  },
  created() {
    this.movie_id = this.$route.query.movieId;
    this.$options.methods.addReadNum.bind(this)(this.movie_id);
    this.pageHelper.data = this.movie_id;
    this.userShortCommentary.movieId = this.movie_id;
    this.$options.methods.getMovieById.bind(this)();
    this.$options.methods.getMovieShortCommentarys.bind(this)();
  },
  data() {
    return {
      movie_id: 0,
      movie_year: 2018,
      pageHelper: {
        data: "",
        pageNum: 1,
        pageSize: 10
      },
      movie_entity: [
        { id: 1, type_name: "导演：", value_name: "director" },
        { id: 2, type_name: "编剧：", value_name: "screenwriter" },
        { id: 3, type_name: "主演：", value_name: "actors" },
        { id: 4, type_name: "类型：", value_name: "type" },
        {
          id: 5,
          type_name: "制片国家/地区：",
          value_name: "makeState"
        },
        { id: 6, type_name: "语言：", value_name: "language" },
        {
          id: 7,
          type_name: "上映日期：",
          value_name: "releaseTime"
        },
        { id: 8, type_name: "片长：", value_name: "sheetLength" },
        { id: 9, type_name: "外文名：", value_name: "foreignName" }
      ],
      movie: {
        score:0
      },
      userShortCommentary: {
        score: 0,
        content: "",
        movieId: 0
      },
      shortCommentarys: []
    };
  },
  methods: {
    getMovieById() {
      var url = "/movie/info?movieId=" + this.movie_id;
      this.$axios
        .get(url)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.movie = json.data;
            this.movie_year = /\d+/.exec(this.movie.releaseTime)[0];
          } else {
            this.$parent.alert("warning", json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMovieShortCommentarys() {
      this.$axios
        .post("short/search/", this.pageHelper)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.shortCommentarys = json.data;
          } else {
            this.$parent.alert("warning", json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    watchScore(newVal) {
      this.userShortCommentary.score = parseInt(newVal);
    },
    watchContent(newVal) {
      this.userShortCommentary.content = newVal;
    },
    submitShortCommentary() {
      this.$axios
        .post("short/add/", this.userShortCommentary, {
          headers: {
            Authorization: sessionStorage.getItem("TOKEN")
          }
        })
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.$parent.$parent.alert("success", json.message);
          } else {
            this.$parent.$parent.alert("warning", json.message);
          }
          this.$refs.mark.$refs.modalCancel.click();
          this.reload();
        })
        .catch(error => {
          console.log(error);
        });
    },
    addReadNum(id){
      let url = this.GLOBAL.BASE_URL+"movie/read/inc?id="+id;
      this.$axios.get(url)
      .then(res=>{return Promise.resolve(res.data)})
      .then(json=>{
        // console.log(json.message)
      })
      .catch(error=>{console.log(error)})
    },
    termToCommentaryEdit(){
      this.$router.push({path:'/commentary_edit',query:{movieId:this.movie_id}});
    }
  }
};
</script>

<style scoped>
img{
  width: 253px;
  height: 400px;}
.row button{
  margin-right: 20px
}
</style>

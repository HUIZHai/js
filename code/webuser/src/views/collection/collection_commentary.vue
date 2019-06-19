<template>
  <div class="main container">
    <div style="margin:16px;">
      <div class="list-group">
        <a
          href="#/commentary"
          class="list-group-item list-group-item-action flex-column align-items-start"
          v-for="commentary in commentaryList"
          :key="commentary.id"
        >
          <div class="row">
            <div class="col-2">
              <a href="#">
                <img
                  class="movie-img"
                  :src=commentary.movieUrl
                  alt="电影海报图片"
                >
              </a>
            </div>
            <div class="col-10">
              <div
                class="d-flex justify-content-between"
                style="align-items:center"
              >
                <div
                  class="d-flex justify-content-start"
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
                  class="d-flex justify-content-end"
                  style="align-items:center"
                >
                  <a
                    href="javascript:void(0)"
                    @click="clickLike(commentary)"
                  >
                    <font-awesome-icon
                      :icon="['far','thumbs-up']"
                      v-if="!commentary.like"
                    />
                    <font-awesome-icon
                      :icon="['fas','thumbs-up']"
                      v-if="commentary.like"
                    />
                  </a>
                  <small style="padding-right:30px">{{commentary.likeNumber}}</small>
                  <a
                    href="javascript:void(0)"
                    @click="clickCollect(commentary)"
                  >
                    <font-awesome-icon
                      :icon="['far','heart']"
                      v-if="!commentary.collection"
                    />
                    <font-awesome-icon
                      :icon="['fas','heart']"
                      v-if="commentary.collection"
                    />
                  </a>
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <a href="javascript:void(0)" @click="turnToCommentaryInfo(commentary.id)">
                  <p class="mb-1">{{commentary.title}}</p>
                </a>
              </div>
              <div class="d-flex justify-content-start">
                <p
                  class="mb-1"
                  style="text-align: left;"
                >{{commentary.pureContent}}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <page-navigation
      :total=pagination.totalPage
      :range=pagination.pageRange
    ></page-navigation>
  </div>
</template>
<script>
import scoreStars from "../../components/scoreStars.vue";
import pageNavigation from "../../components/pageNavigation.vue";

export default {
  created(){
    this.$options.methods.search.bind(this)(1);
  },
  components: {
    "stars": scoreStars,
    "page-navigation": pageNavigation
  },
  data() {
    return {
      pagination: {
        totalPage: 1,
        pageRange: 5,
        currentPage: 1
      },
      commentaryList: [
      ]
    };
  },
  methods:{
    search(page){
      if(sessionStorage.getItem("TOKEN") == null)
        return;
      //设置请求头
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = sessionStorage.getItem("TOKEN");
      let url = this.GLOBAL.BASE_URL+"long/get/collection?page="+page
      this.$axios.get(url)
      .then(res=>{return Promise.resolve(res.data)})
      .then(json=>{
        if(json.code === "ACK"){
          this.commentaryList = json.data.list;
          this.pagination.totalPage = Math.ceil(json.data.total/this.pagination.pageRange);
        }else{
          console.log(json.message)
        }
      })
      .catch(error=>{console.log(error)})
    },
    turnToCommentaryInfo(commentaryId) {
      this.$router.push({
        path: "/commentary_info",
        query: { commentaryId: commentaryId }
      });
    },
    clickLike(commentary) {
      let flag = commentary.like;
      commentary.like = !commentary.like;
      if (sessionStorage.getItem("TOKEN") == null) {
        if(flag === true)
          commentary.likeNumber--;
        else
          commentary.likeNumber++;
        return;
      }
      var url = this.GLOBAL.BASE_URL;
      if (flag === true) {
        url = url + "long/like/cancel?id=" + commentary.id;
        commentary.likeNumber--;
      } else {
        url = url + "long/like?id=" + commentary.id;
        commentary.likeNumber++;
      }
      this.$options.methods.getRequest.bind(this)(url);
    },
    clickCollect(commentary) {
      let flag = commentary.collection;
      commentary.collection = !commentary.collection;
      if (sessionStorage.getItem("TOKEN") == null) return;
      var url = this.GLOBAL.BASE_URL;
      if (flag === true) {
        url = url + "long/collection/cancel?id=" + commentary.id;
      } else {
        url = url + "long/collection/add?id=" + commentary.id;
      }
      this.$options.methods.getRequest.bind(this)(url);
    },
    getRequest(url) {
      //设置请求头
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = sessionStorage.getItem("TOKEN");
      this.$axios
        .get(url)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(data => {
          if (data.code === "ACK") {
            return data.data;
          } else {
            console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.main {
  min-height: 74vh;
}
.movie-img {
  min-height: 150px;
  max-height: 200px;
  width: 100px;
}
.user-img {
  height: 40px;
  width: 40px;
}
</style>

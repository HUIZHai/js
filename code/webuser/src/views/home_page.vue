<template>
  <div>
    <div
      id="movieSlide"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#movieSlide"
          data-slide-to="0"
          class="active"
        ></li>
        <li
          data-target="#movieSlide"
          data-slide-to="1"
        ></li>
        <li
          data-target="#movieSlide"
          data-slide-to="2"
        ></li>
      </ol>
      <div class="container slide-container">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="slide d-block w-100"
              :src="slideList[0].img"
              alt="First slide"
            >
            <div class="slide-text  carousel-caption d-none d-md-block">
              <h2>{{slideList[0].title}}</h2>
              <p>{{slideList[0].content}}</p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              class="slide d-block w-100"
              :src="slideList[1].img"
              alt="Second slide"
            >
            <div class="slide-text carousel-caption d-none d-md-block">
              <h2>{{slideList[1].title}}</h2>
              <p>{{slideList[1].content}}</p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              class="slide d-block w-100"
              :src="slideList[2].img"
              alt="Third slide"
            >
            <div class="slide-text  carousel-caption d-none d-md-block">
              <h2>{{slideList[2].title}}</h2>
              <p>{{slideList[2].content}}</p>
            </div>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#movieSlide"
        role="button"
        data-slide="prev"
      >
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#movieSlide"
        role="button"
        data-slide="next"
      >
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="container clearfix">
      <hr>
      <div
        class="hot-movie"
        style="display:flex;align-items: center"
      >
        <span style="margin-right:auto">最近热门电影</span>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0);"
                aria-label="Previous"
                @click="getHotPre"
              >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li
              v-for="item in pageIndex"
              :key="item.id"
              :class="{'page-item':1===1,active:item.id === activeHotMoviePage}"
            >
              <a
                class="page-link"
                href="javascript:void(0);"
                @click="reloadHotMovies(item.id)"
              >{{item.id}}</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0);"
                aria-label="Next"
                @click="getHotNext"
              >
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="container clearfix">
      <hr>
      <div class="row">
        <div
          class="col"
          v-for="hotmovie in hotmovies"
          v-bind:key="hotmovie.id"
          @click="turnToMovieInfo(hotmovie.id)"
        >
          <div style="height:290px;overflow:hidden">
            <img
              class="img-fluid"
              :src="hotmovie.imgUrl"
              alt=""
            >
          </div>
          <p style="margin-top:5px">{{hotmovie.name}}</p>
        </div>
      </div>
    </div>
    <div class="container clearfix">
      <hr>
      <div
        class="new-movie"
        style="display:flex;align-items: center"
      >
        <span style="margin-right:auto">最新电影</span>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0);"
                aria-label="Previous"
                @click="getPre"
              >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li
              v-for="item in pageIndex"
              :key="item.id"
              :ref="item.id"
              :class="{'page-item':1===1,active:item.id === activeNewMoviePage}"
            >
              <a
                class="page-link"
                href="javascript:void(0);"
                @click="reloadNewestMovies(item.id)"
              >{{item.id}}</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="javascript:void(0);"
                aria-label="Next"
                @click="getNext"
              >
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="container clearfix">
      <hr>
      <div class="row">
        <div
          class="col-lg"
          v-for="movie in newMovies"
          v-bind:key="movie.id"
          @click="turnToMovieInfo(movie.id)"
        >
          <div style="height:290px;overflow:hidden">
            <img
              class="img-fluid"
              :src="movie.imgUrl"
              alt=""
            >
          </div>
          <p style="margin-top:5px">{{movie.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var index = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
export default {
  name: "home_page",
  created() {
    this.$options.methods.getSlideList.bind(this)();
    this.$options.methods.loadNewestMovies.bind(this)();
    this.$options.methods.loadHotMovies.bind(this)();
  },
  mounted() {},
  data() {
    return {
      pageIndex: index,
      activeHotMoviePage: 1,
      activeNewMoviePage: 1,
      slideList: [
        {
          id: 2,
          title: "海王",
          content: "海王海王",
          img:
            "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/1545882653024.jpg",
          state: 1
        },
        {
          id: 3,
          title: "龙猫",
          content: "龙猫·····",
          img:
            "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/p2413274720.jpg",
          state: 1
        },
        {
          id: 12,
          title: "罗马 Roma",
          content:
            "突如其来的两个意外，同时砸中了女佣克里奥和雇主索菲亚，两人究竟该如何面对苦涩茫然的生活？",
          img:
            "http://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_slide/1545884128757.jpg",
          state: 1
        }
      ],
      hotmovies: [],
      newMovies: []
    };
  },
  methods: {
    //首页幻灯片方法区
    getSlideList() {
      this.$axios
        .get("slide/list")
        .then(res => {
          return Promise.resolve(res);
        })
        .then(json => {
          json = json.data;
          if (json.code === "ACK") this.slideList = json.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //最新电影方法区
    getNext() {
      this.activeNewMoviePage =
        this.activeNewMoviePage + 1 === 6 ? 1 : this.activeNewMoviePage + 1;
      this.$options.methods.loadNewestMovies.bind(this)();
    },
    getPre() {
      this.activeNewMoviePage =
        this.activeNewMoviePage - 1 === 0 ? 5 : this.activeNewMoviePage - 1;
      this.$options.methods.loadNewestMovies.bind(this)();
    },
    reloadNewestMovies(id) {
      this.activeNewMoviePage = id;
      this.$options.methods.loadNewestMovies.bind(this)();
    },
    //最热电影方法区
    getHotNext() {
      this.activeHotMoviePage =
        this.activeHotMoviePage + 1 === 6 ? 1 : this.activeHotMoviePage + 1;
      this.$options.methods.loadHotMovies.bind(this)();
    },
    getHotPre() {
      this.activeHotMoviePage =
        this.activeHotMoviePage - 1 === 0 ? 5 : this.activeHotMoviePage - 1;
      this.$options.methods.loadHotMovies.bind(this)();
    },
    reloadHotMovies(id) {
      this.activeHotMoviePage = id;
      this.$options.methods.loadHotMovies.bind(this)();
    },
    loadNewestMovies() {
      let data = {
        pageNum: this.activeNewMoviePage,
        pageSize: 5
      };
      this.$axios
        .post("/movie/newest", data)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.newMovies = json.data.list;
          } else {
            this.$message.error(json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadHotMovies() {
      let data = {
        pageNum: this.activeHotMoviePage,
        pageSize: 5
      };
      this.$axios
        .post("/movie/hot", data)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.hotmovies = json.data.list;
          } else {
            this.$message.error(json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    turnToMovieInfo(movieId) {
      this.$router.push({ path: "/movie_info", query: { movieId: movieId } });
    }
  }
};
</script>

<style scoped>
.hot-movie > span {
  float: left;
}

.slide {
  height: 500px;
}

#movieSlide {
  background-color: #e2f8ff;
}
/* .slide-text{
    color: black;
} */
</style>

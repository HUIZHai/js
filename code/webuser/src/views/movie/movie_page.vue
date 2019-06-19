<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-5">
          <div class="input-group m-3">
            <input type="text" class="form-control" v-model="searchForm.keyword" placeholder="电影名、导演、演员" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="submitSearch">搜索</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container clearfix">
      <div class="btn-group m-3" role="group" aria-label="Basic example" style="display:flex;flex-wrap:wrap;align-items:center">
        <span class="mr-2 font-weight-bold">电影类型</span>
        <button type="button" :class="{'btn':1===1, 'm-1':1===1,'bg-white':type.value!=searchForm.type,'bg-warning':type.value===searchForm.type}" v-for="type in movie_types" :key="type.value" @click="typeClick(type.value)" href="javascript:void(0);">{{type.label}}</button>
      </div>
      <div class="btn-group m-3" role="group" aria-label="Basic example" style="display:flex;flex-wrap:wrap;align-items:center">
        <span class="mr-2 font-weight-bold">制作国家</span>
        <button type="button" :class="{'btn':1===1, 'm-1':1===1,'bg-white':country.value!=searchForm.makeState,'bg-warning':country.value===searchForm.makeState}" v-for="country in movie_countries" :key="country.value" @click="countryClick(country.value)">{{country.label}}</button>
      </div>
      <div class="m-3" style="display:flex;">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="orderBy" id="exampleRadios1" value="0" v-model="searchForm.orderBy" checked @click="redio1Click">
          <label class="form-check-label" for="exampleRadios1">
            按时间排序
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="orderBy" id="exampleRadios2" value="1" v-model="searchForm.orderBy" @click="redio2Click">
          <label class="form-check-label" for="exampleRadios2">
            按评分排序
          </label>
        </div>
      </div>

      <div class="container clearfix">
        <div class="row justify-content-start">
          <div class="col-lg-1"></div>
          <div class="col-lg-2" v-for="movie in movies.movies1" v-bind:key="movie.id" @click="turnToMovieInfo(movie.id)">
            <div style="height:230px">
              <img class="img-fluid" :src="movie.imgUrl" alt="">
            </div>
            <p style="margin-top:5px">{{movie.name}}</p>
          </div>
        </div>
      </div>
      <div class="container clearfix">
        <div class="row justify-content-start">
          <div class="col-lg-1"></div>
          <div class="col-lg-2" v-for="movie in movies.movies2" v-bind:key="movie.id" @click="turnToMovieInfo(movie.id)">
            <div style="height:230px">
              <img class="img-fluid" :src="movie.imgUrl" alt="">
            </div>
            <p style="margin-top:5px">{{movie.name}}</p>
          </div>
        </div>
      </div>
      <div class="container clearfix">
        <div class="row justify-content-start">
          <div class="col-lg-1"></div>
          <div class="col-lg-2" v-for="movie in movies.movies3" v-bind:key="movie.id" @click="turnToMovieInfo(movie.id)">
            <div style="height:230px">
              <img class="img-fluid" :src="movie.imgUrl" alt="">
            </div>
            <p style="margin-top:5px">{{movie.name}}</p>
          </div>
        </div>
      </div>
      <div class="container clearfix">
        <div class="row justify-content-start">
          <div class="col-lg-1"></div>
          <div class="col-lg-2" v-for="movie in movies.movies4" v-bind:key="movie.id" @click="turnToMovieInfo(movie.id)">
            <div style="height:230px">
              <img class="img-fluid" :src="movie.imgUrl" alt="">
            </div>
            <p style="margin-top:5px">{{movie.name}}</p>
          </div>
        </div>
      </div>
      <div class="container">
        <nav aria-label="Page navigation ">
          <ul class="pagination pagination-lg" style="display:inline-flex">
            <li :class="{'page-item':1===1, 'disabled':pagination.currentPage===1}">
              <a class="page-link" href="javascript:void(0);" aria-label="Previous" @click="preClick">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li :class="{'page-item':1===1,'active':item===searchForm.pageNum}" v-for="item of pagination.page_item" :key="item"><a class="page-link" href="javascript:void(0);" @click="itemClick(item)">{{item}}</a></li>
            <li :class="{'page-item':1===1, 'disabled':pagination.currentPage===pagination.totalPage}">
              <a class="page-link" href="javascript:void(0);" aria-label="Next" @click="nextClick">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "movie_page",
  created() {
    this.$options.methods.searchMovie.bind(this)();
  },
  data() {
    return {
      movie_types: this.GLOBAL.Film_Type,
      movie_countries: this.GLOBAL.Film_Country,
      allPageNum: 5,
      totalMovieNumber: 0,
      movies: {
        movies1: [
          {
            id: 1,
            imgUrl:'',
            name: ''
          }
        ],
        movies2: [
          {
            id: 1,
            imgUrl:'',
            name: ''
          }
        ],
        movies3: [
          {
            id: 1,
            imgUrl:'',
            name: ''
          }
        ],
        movies4: [
          {
            id: 1,
            imgUrl:'',
            name: ''
          }
        ]
      },
      searchForm: {
        pageNum: 1,
        pageSize: 20,
        keyword:"",
        type: "",
        makeState: "",
        orderBy: 0
      },
      pagination: {
        totalPage: 0,
        startPage: 0,
        endPage: 0,
        pageRange: 7,
        currentPage: 1,
        page_item: []
      }
    };
  },
  methods: {
    typeClick(value) {
      this.searchForm.type = value;
      this.searchForm.pageNum = 1;
      this.pagination.currentPage = 1;
      this.$options.methods.searchMovie.bind(this)();
    },
    countryClick(value) {
      this.searchForm.makeState = value;
      this.searchForm.pageNum = 1;
      this.pagination.currentPage = 1;
      this.$options.methods.searchMovie.bind(this)();
    },
    preClick() {
      this.pagination.currentPage = this.pagination.currentPage - 1;
      this.searchForm.pageNum = this.pagination.currentPage;
      this.$options.methods.searchMovie.bind(this)();
    },
    nextClick() {
      this.pagination.currentPage = this.pagination.currentPage + 1;
      this.searchForm.pageNum = this.pagination.currentPage;
      this.$options.methods.searchMovie.bind(this)();
    },
    itemClick(item) {
      this.pagination.currentPage = item;
      this.searchForm.pageNum = item;
      this.$options.methods.searchMovie.bind(this)();
    },
    redio1Click(){
      this.searchForm.orderBy = 0;
      this.$options.methods.searchMovie.bind(this)();
    },
    redio2Click(){
      this.searchForm.orderBy = 1;
      this.$options.methods.searchMovie.bind(this)();
    },
    changePagination() {
      if (this.pagination.totalPage > this.pagination.pageRange) {
        this.pagination.startPage =
          this.pagination.currentPage >
          Math.floor(this.pagination.pageRange / 2)
            ? this.pagination.currentPage -
              Math.floor(this.pagination.pageRange / 2)
            : 1;
        if (
          this.pagination.startPage + this.pagination.pageRange >
          this.pagination.totalPage
        ) {
          this.pagination.startPage =
            this.pagination.totalPage - this.pagination.pageRange + 1;
        }
        this.pagination.endPage =
          this.pagination.startPage + this.pagination.pageRange - 1;
      } else {
        this.pagination.startPage = 1;
        this.pagination.endPage = this.pagination.totalPage;
      }
      this.pagination.page_item.splice(0);
      for (
        let i = this.pagination.startPage;
        i <= this.pagination.endPage;
        i++
      ) {
        this.pagination.page_item.push(i);
      }
      // console.log(this.pagination);
    },
    searchMovie() {
      this.$axios
        .post("/movie/search", this.searchForm)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          let movies = json.data.list;
          this.pagination.totalPage = Math.ceil(json.data.pageNumber / 20);
          this.$options.methods.changePagination.bind(this)();
          this.movies.movies1.splice(0);
          this.movies.movies2.splice(0);
          this.movies.movies3.splice(0);
          this.movies.movies4.splice(0);
          if (movies.length <= 5) {
            this.movies.movies1 = movies.slice(0, movies.length);
          } else if (movies.length <= 10) {
            this.movies.movies1 = movies.slice(0, 5);
            this.movies.movies2 = movies.slice(5, movies.length);
          } else if (movies.length <= 15) {
            this.movies.movies1 = movies.slice(0, 5);
            this.movies.movies2 = movies.slice(5, 10);
            this.movies.movies3 = movies.slice(10, movies.length);
          } else if (movies.length <= 20) {
            this.movies.movies1 = movies.slice(0, 5);
            this.movies.movies2 = movies.slice(5, 10);
            this.movies.movies3 = movies.slice(10, 15);
            this.movies.movies4 = movies.slice(15, movies.length);
          }
        });
    },
    turnToMovieInfo(movieId){
      this.$router.push({path:'/movie_info',query:{movieId:movieId}});
    },
    submitSearch(){
      this.$options.methods.searchMovie.bind(this)()
    }
  }
};
</script>

<style scoped>
</style>

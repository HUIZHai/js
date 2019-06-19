<template>
  <div class="main container">
    <div
      class="d-flex"
      style="flex-direction: row;flex-wrap:wrap"
    >
      <div
        class="card border-primary mb-3 col-3"
        style="width: 18rem;"
        v-for="movie in movies"
        :key="movie.id"
      >
        <img
          class="card-img-top"
          src="https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_img/p1272904657.jpg"
          alt="Card image cap"
        >
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a
            href="#"
            class="btn btn-primary"
          >Go somewhere</a>
        </div>
      </div>
    </div>
    <page-navigation
      :total=pagination.totalPage
      :range=pagination.pageRange
    ></page-navigation>
  </div>
</template>
<script>
import pageNavigation from "../../components/pageNavigation.vue";

export default {
  components: {
    "page-navigation": pageNavigation
  },
  data() {
    return {
      pagination: {
        totalPage: 1,
        pageRange: 7,
        currentPage: 1
      },
      movies: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    };
  }
};
</script>
<style scoped>
.main {
  min-height: 74vh;
}
img{
    box-shadow: 10px 10px 5px #888888;
}
</style>

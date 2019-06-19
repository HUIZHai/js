<template>
  <div class="container">
    <div
      class="row"
      id="which_movie"
    >
      <img
        :src="movie_info.imgUrl"
        alt="电影图片"
      >
      <div>
        <div style="line-height:50px"><a
            href="javascript:viod(0)"
            @click="turnToMovieInfo"
          >{{movie_info.name}}</a></div>
        <div>
          <p>{{movie_info.simpleInfo}}</p>
        </div>
      </div>
    </div>

    <div class="like_row">
      <input
        type="text"
        v-model="commentary.title"
        placeholder="请输入影评标题"
        class="form-control"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
      >
    </div>

    <div class="like_row">
      <froala
        :tag="'textarea'"
        :config="config"
        v-model="commentary.content"
      ></froala>
    </div>

    <div class="like_row">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#commentaryDialog"
      >提交影评</button>
    </div>
    <submit-commentary
      id="commentaryDialog"
      ref="commentaryDialog"
      :score="commentary.score"
      :type="commentary.type"
      v-on:submit="submitCommentary"
      v-on:inputscore="watchScore"
      v-on:inputtype="watchType"
    ></submit-commentary>
  </div>
</template>
<script>
import submitCT from "../../components/submitCommentary/submitCT";

export default {
  created() {
    //设置请求头
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("TOKEN");
    this.commentary.movieId = this.$route.query.movieId;
    this.$options.methods.getMovieSimpleInfo.bind(this)(
      this.commentary.movieId
    );
  },
  components: {
    "submit-commentary": submitCT
  },
  data() {
    return {
      movieId: 0,
      movie_info: {
        imgUrl:
          "https://ygg-31501102-bucket.oss-cn-shenzhen.aliyuncs.com/movie_img/p1014542496.jpg",
        src: "http://localhost:8080/#/movie_info?movieId=183",
        name: "拯救大兵瑞恩",
        simpleInfo:
          "导演 饶晓志 主演 陈建斌 / 任素汐 / 中国大陆 / 8.1分(425103评价)"
      },
      commentary: {
        title: "",
        content: "",
        movieId: "",
        score: 0,
        type: 0
      },
      config: {
        toolbarButtons: [
          "fullscreen",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "|",
          "fontFamily",
          "fontSize",
          "color",
          "|",
          "paragraphFormat",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "quote",
          "-",
          "insertLink",
          "insertImage",
          "embedly",
          "insertTable",
          "|",
          "emoticons",
          "specialCharacters",
          "insertHR",
          "selectAll",
          "clearFormatting",
          "|",
          "print",
          "spellChecker",
          "help",
          "|",
          "fullscreen",
          "|",
          "undo",
          "redo"
        ], //['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],//显示可操作项
        language: "zh_cn",
        imageUploadURL: this.GLOBAL.BASE_URL + "commentary/upload",
        events: {
          "froalaEditor.initialized": function() {
            // console.log("initialized");
          },
          "froalaEditor.blur": function(e, editor) {
            // console.log(editor.html.get());
          }
        }
      }
    };
  },
  methods: {
    getMovieSimpleInfo(movieId) {
      var url = this.GLOBAL.BASE_URL + "movie/info/simple?movieId=" + movieId;
      this.$axios
        .get(url)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.movie_info = json.data;
            this.movieId = movieId;
          } else {
            console.log(json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitCommentary() {
      let url = "long/add/";
      if(this.commentary.type === 0){
        url+="normal";
      }else{
        if(JSON.parse(sessionStorage.getItem("INFO")).power != "pro"){
          alert("你不是专家，不能发布专家影评")
          return;
        }
        url+="pro";
      }
      this.$axios
        .post(url, this.commentary)
        .then(res => {
          this.$refs.commentaryDialog.$refs.modalCancel.click();
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.$parent.$parent.alert("success", json.message);
            this.$options.methods.turnToCommentary.bind(this)();
            this.$router.push("/commentary")
          } else {
            this.$parent.$parent.alert("warning", json.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    turnToMovieInfo() {
      this.$router.push({
        path: "/movie_info",
        query: { movieId: this.movieId }
      });
    },
    turnToCommentary() {
      this.$router.push({
        path: "/commentary"
      });
    },
    watchScore(val) {
      this.commentary.score = parseInt(val);
    },
    watchType(val) {
      this.commentary.type = val;
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  text-align: left;
  width: 70%;
}

#which_movie img {
  width: 60px;
  height: 90px;
  margin-right: 10px;
}

/* #which_movie div {
  line-height: 30px
} */

#which_movie {
  margin-bottom: 20px;
  background-color: #e9ecef;
}

.like_row {
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 20px;
}
</style>

<style>
.fr-box.fr-basic .fr-element {
  min-height: 500px;
}
</style>

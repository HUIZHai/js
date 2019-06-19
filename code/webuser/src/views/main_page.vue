<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-danger movie-navbar">
      <div class="container header">
        <a
          class="navbar-brand"
          href="#"
        >
          
          <!-- &nbsp;青峰大辉&nbsp;&nbsp;'s&nbsp;  -->
          <img
            src="../assets/logo.png"
            width="140"
            height="30"
            alt=""
          >
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul
            class="navbar-nav mr-auto"
            @click="removeActive"
          >
            <li class="nav-item ">
              <a
                :class="{'nav-link': 1===1,'active':'首页'===navActive}"
                ref="home"
                href="#/home"
                @click="navActive='首页'"
              >首页</a>
            </li>
            <li class="nav-item ">
              <a
                :class="{'nav-link': 1===1,'active':'电影'===navActive}"
                href="#/movie"
                @click="navActive='电影'"
              >电影</a>
            </li>
            <li class="nav-item ">
              <a
                :class="{'nav-link': 1===1,'active':'影评'===navActive}"
                href="#/commentary"
                @click="navActive='影评'"
              >影评</a>
            </li>
            <li class="nav-item dropdown">
              <a
                :class="{'nav-link': 1===1,'dropdown-toggle':1===1,'active':'影评'===navActive}"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-if="!login_show"
                @click="navActive='收藏'"
              >
                收藏
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <a
                  class="dropdown-item"
                  href="#/store/movie"
                  v-if="false"
                >电影</a>
                <a
                  class="dropdown-item"
                  href="#/store/review"
                >影评</a>
              </div>
            </li>
          </ul>
          <ul
            class="navbar-nav ml-auto "
            @click="removeActive"
          >
            <li class="nav-item ">
              <a
                class="nav-link"
                ref="login"
                href="javascript:void(0);"
                data-toggle="modal"
                data-target="#loginModal"
                v-if="login_show"
              >登陆</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="javascript:void(0);"
                data-toggle="modal"
                data-target="#registerModal"
                v-if="login_show"
              >注册</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-if="!login_show"
              >
                设置
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <a
                  class="dropdown-item"
                  href="#/personal_info"
                >个人信息</a>
                <a
                  class="dropdown-item"
                  href="JavaScript:void(0)"
                  v-if="user_power!='pro'"
                  data-toggle="modal"
                  data-target="#askDialog"
                >专家申请</a>
                <a
                  class="dropdown-item"
                  href="JavaScript:void(0)"
                  @click="logout"
                >退出</a>
              </div>
            </li>
          </ul>
          <a
            class="navbar-brand"
            href="#"
            data-toggle="tooltip"
            data-placement="bottom"
            :title="user.nickname"
          >
            <img
              v-if="!login_show"
              style="border-radius:50%"
              :src="user.headerImgUrl"
              width="30"
              height="30"
              alt=""
            >
          </a>
        </div>
      </div>
    </nav>
    <div>
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <footer
      class="page-footer text-center font-small mt-4 wow fadeIn bg-danger"
      style="visibility: visible; animation-name: fadeIn;"
    >

      <!--Call to action-->
      <div class="pt-4">
        <div class="container">
          <div
            class="row"
            style="text-align: center"
          >
            <div class="col-md-6">
              <div class="content tag-linksite">
                <h4 class="title">相关网站</h4>
                <a
                  class="footer-link"
                  href="https://movie.douban.com/"
                  target="_blank"
                >豆瓣电影</a>
                <i style="font-style:normal">|</i>
                <a
                  class="footer-link"
                  href="http://maoyan.com/"
                  target="_blank"
                >猫眼电影</a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="content tag-friendsite">
                <div class="content tag-cloud friend-links">
                  <h4 class="title">友情链接</h4>
                  <a
                    class="footer-link"
                    href="http://www.bootcss.com"
                    title="Bootstrap 中文网"
                    target="_blank"
                  >Bootstrap中文网</a>
                  <i style="font-style:normal">|</i>
                  <a
                    class="footer-link"
                    href="https://cn.vuejs.org/"
                    title="vue 官网"
                    target="_blank"
                  >VUE官网</a>
                  <i style="font-style:normal">|</i>
                  <a
                    class="footer-link"
                    href="https://www.jquery123.com/"
                    title="jQuery 中文文档"
                    target="_blank"
                  >jQuery中文文档</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Copyright-->
      <div class="footer-copyright py-3">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">
            ©2019版权所有：2019_31601342黄依伦
          </font>
        </font>
      </div>
      <!--/.Copyright-->

    </footer>
    <!-- 登陆模态框 Modal -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >登陆</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div class="input-group input-group-lg">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-lg"
                      >账号</span>
                    </div>
                    <input
                      type="text"
                      v-model="login_form.username"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder="请输入账号"
                    >
                  </div>
                  <div class="input-group input-group-lg my-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-lg"
                      >密码</span>
                    </div>
                    <input
                      type="password"
                      v-model="login_form.password"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder="请输入密码"
                    >
                  </div>
                  <button
                    type="button"
                    ref="login_button"
                    class="btn btn-primary btn-lg btn-block"
                    @click="login"
                  >登陆</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- 注册模态框 Modal -->
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
            >注册</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <div class="input-group input-group-lg">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-lg"
                      >账号</span>
                    </div>
                    <input
                      type="text"
                      v-model="register_form.username"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder="请输入账号"
                    >
                  </div>
                  <div class="input-group input-group-lg my-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-lg"
                      >密码</span>
                    </div>
                    <input
                      type="password"
                      v-model="register_form.password"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder="请输入密码"
                    >
                  </div>
                  <div class="input-group input-group-lg my-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-lg"
                      >确认密码</span>
                    </div>
                    <input
                      type="password"
                      v-model="register_form.repeat"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                      placeholder="请再次输入密码"
                    >
                  </div>
                  <button
                    type="button"
                    ref="register_button"
                    class="btn btn-primary btn-lg btn-block"
                    @click="register"
                  >注册</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    <ask-dialog
      id="askDialog"
      ref="ask"
      v-on:message="changeMessage"
      v-on:submit="upgradeProSubmit"
    ></ask-dialog>
  </div>
</template>
<script>
import qs from "qs";
import askDialog from "../components/AskPro/askDialog.vue";

$(document).ready(function() {});
export default {
  name: "main_page",
  components: {
    "ask-dialog": askDialog
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
    this.$router.push("/home");
    // this.$options.methods.getAllRegions.bind(this)();
    if (sessionStorage.getItem("TOKEN")) {
      this.login_show = false;
      //设置请求头
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = sessionStorage.getItem("TOKEN");
      this.$options.methods.getUserInfo.bind(this)();
    } else {
      this.login_show = true;
    }
    if(sessionStorage.getItem('INFO')){
      let info = sessionStorage.getItem('INFO');
      info = JSON.parse(info);
      this.user_role = info.role;
      this.user_power = info.power;
    }
  },
  data() {
    return {
      isRouterAlive: true,
      user_name: "",
      user_role: "",
      user_power: "",
      navActive: "首页",
      loginDisable: "able",
      login_form: {
        username: "",
        password: ""
      },
      register_form: {
        username: "",
        password: "",
        repeat: ""
      },
      login_show: true,
      user: {},
      askProMessage: {"content":""}
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    navSelect(e) {
      // console.log(e.target);
    },
    removeActive() {
      this.$refs.home.classList.remove("active");
    },
    login() {
      this.$refs.login_button.setAttribute("disabled", "true");
      this.$axios
        .post("/login", qs.stringify(this.login_form))
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          this.$refs.login_button.removeAttribute("disabled");
          if (json.code === "ACK") {
            this.user_name = this.login_form.username;
            this.user_role = json.data.role;
            if (this.user_role != "user"){
              this.$parent.alert("danger", '此账号不是网站用户账号');
              return;
            }
            this.user_power = json.data.power;
            this.$parent.alert("success", json.message);
            sessionStorage.setItem("TOKEN", json.data.token);
            sessionStorage.setItem("INFO", JSON.stringify(json.data));
            this.$refs.login_button.classList.remove("disabled");
            $("#loginModal").modal("hide");
            this.$refs.login.setAttribute("disabled", "true");
            //设置请求头
            this.$axios.defaults.headers.common[
              "Authorization"
            ] = sessionStorage.getItem("TOKEN");
            this.$options.methods.getUserInfo.bind(this)();
            this.login_show = false;
          } else {
            this.$parent.alert("danger", json.message);
          }
        })
        .catch(error => {
          this.$refs.login_button.removeAttribute("disabled");
          console.log(error);
        });
    },
    logout() {
      this.login_show = true;
      sessionStorage.clear();
      window.location.reload(); 
    },
    register() {
      if (this.register_form.password != this.register_form.repeat) {
        this.$parent.alert("danger", "请确认密码");
      } else {
        this.$axios
          .post("user/register", {
            username: this.register_form.username,
            password: this.register_form.password
          })
          .then(res => {
            return Promise.resolve(res.data);
          })
          .then(json => {
            if (json.code === "ACK") {
              $("#registerModal").modal("hide");
              this.login_form.username = this.register_form.username;
              this.login_form.password = this.register_form.password;
              this.$options.methods.login.bind(this)();
            } else {
              this.$parent.alert("danger", json.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getUserInfo() {
      this.$axios
        .get("/user")
        .then(res => {
          return Promise.resolve(res);
        })
        .then(json => {
          json = json.data;
          this.user = json.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllRegions() {
      this.$axios
        .get("/SRegion/listAll")
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          this.GLOBAL.BASE_REGIONS = json[0].children;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeMessage(val) {
      this.askProMessage.content = val;
    },
    upgradeProSubmit() {
      this.$axios
        .post("upgrade/add",qs.stringify(this.askProMessage))
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          this.$refs.ask.$refs.modalCancel.click();
          if (json.code === "ACK") {
            this.$parent.alert("success", json.message);
          } else {
            this.$parent.alert("danger", json.message);
          }
        })
        .catch(error => {
          this.$parent.alert("danger", "申请失败");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
/* .container header{
  color: white
} */
.header {
  min-height: 5vh;
  
}
.movie-navbar .nav-link {
  color: white;
}
footer {
  min-height: 15vh;
  color: white;
}
.footer-link {
  color: white;
}
.input-group-text {
  width: 130px;
}
</style>
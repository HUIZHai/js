<template>
  <el-container style="width:100%;height:100%">
    <el-row
      class="tac"
      style="width:100%;height:100%"
    >
      <el-container
        id="navBar"
        :style="{width:navBarWidth+'vw'}"
      >
        <el-menu
          id="navbar"
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          background-color="#3f51b5"
          text-color="#fff"
          active-text-color="#ffd04b"
          :style="{width:navBarWidth+'vw'}"
        >
          <el-submenu index="1">
            <template slot="title">
              <icon
                style="float:left;height:3vh;margin:1.5vh;"
                name="user-admin"
                split=""
              ></icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="1-1"
                @click.native.prevent="breadCrumbAdd"
              >网站用户</el-menu-item>
              <el-menu-item index="1-2">后台管理员</el-menu-item>
              <el-menu-item index="1-3">专家申请</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <icon
                style="float:left;height:3vh;margin:1.5vh;"
                name="movie"
                split=""
              ></icon>
              <span>电影信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">电影上传</el-menu-item>
              <el-menu-item index="2-2">电影管理</el-menu-item>
              <el-menu-item index="2-3">幻灯片管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <icon
                style="float:left;height:3vh;margin:1.5vh;"
                name="paper"
                split=""
              ></icon>
              <span>影评信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">普通影评</el-menu-item>
              <el-menu-item index="3-2">专家影评</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-container>
      <el-container style="height:100%;display：inline-block;">
        <el-header style="height:5%;padding:0;background-color:#9fa8da">
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            style="line-height:5vh;"
          >
            <icon
              style="float:left;height:5vh"
              name="bread-logo"
              split=""
            ></icon>
            <el-breadcrumb-item
              style="color=white"
              v-for="nav in navBarName"
              :key="nav.id"
            >{{nav.name}}</el-breadcrumb-item>
            <img
              src="@/assets/admin-head.png"
              alt="头像"
              style="float:right;height:5vh"
            >
            <el-dropdown
              style="float:right;line-height:5vh;padding-right:1vw"
              @command="handleNavCommand"
            >
              <span
                class="el-dropdown-link"
                style="color:#303133"
              >
                {{adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="register">管理员注册</el-dropdown-item>
                <!-- <el-dropdown-item command="adminInfo">管理员信息</el-dropdown-item> -->
                <el-dropdown-item
                  divided
                  command="logout"
                >退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-breadcrumb>
        </el-header>
        <el-main style="width:100%;height:90%">
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>

      <el-dialog
        class="adminRegister"
        title="管理员用户注册"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :rules="rules"
          ref="adminRegisterForm"
          :model="adminRegisterForm"
        >
          <el-form-item
            label="账号名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input
              v-model="adminRegisterForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="adminRegisterForm.password"
              autocomplete="off"
              :type="showPassword"
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                @click="shownPassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item
            label="重复密码"
            :label-width="formLabelWidth"
            prop="repeatPassword"
          >
            <el-input
              v-model="adminRegisterForm.repeatPassword"
              autocomplete="off"
              type='password'
            ></el-input>
          </el-form-item>
          <el-form-item
            label="权限"
            :label-width="formLabelWidth"
            prop="permission"
          >
            <el-select
              v-model="adminRegisterForm.permission"
              placeholder="请选择管理员权限"
            >
              <el-option
                label="root"
                value="root"
              ></el-option>
              <el-option
                label="normal"
                value="normal"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAdminRegisterForm"
          >确 定</el-button>
        </div>
      </el-dialog>

    </el-row>
  </el-container>
</template>

<script>
import Icon from "vue2-svg-icon/Icon.vue";

var navbar = [
  {
    name: "用户管理",
    children: [
      {
        name: "网站用户",
        path: "/admin/page/manage/user"
      },
      {
        name: "后台管理员",
        path: "/admin/page/manage/admin"
      },
      {
        name: "专家申请",
        path: "/admin/page/manage/askpro"
      }
    ]
  },
  {
    name: "电影信息",
    children: [
      {
        name: "电影上传",
        path: "/admin/page/manage/film"
      },
      {
        name: "电影管理",
        path: "/admin/page/manage/filmlist"
      },
      {
        name: "幻灯片管理",
        path: "/admin/page/manage/filmslide"
      }
    ]
  },
  {
    name: "影评信息",
    children: [
      {
        name: "普通影评",
        path: "/admin/page/manage/commentary"
      },
      {
        name: "专业影评",
        path: "/admin/page/manage/commentary/pro"
      }
    ]
  }
];
export default {
  name: "admin_layout",
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
    //设置请求头
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("JWT");
    this.$router.push("/admin/page/manage/user");
  },
  data() {
    var validateEmpty = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此处不能为空"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此处不能为空"));
      } else {
        if (value === this.adminRegisterForm.password) callback();
        else {
          callback(new Error("密码不相同"));
        }
      }
    };
    return {
      dialogFormVisible: false,
      adminRegisterForm: {
        username: "",
        password: "",
        repeatPassword: "",
        permission: ""
      },
      formLabelWidth: "120px",
      adminName: sessionStorage.getItem("username"),
      isCollapse: true,
      navBarWidth: 15,
      breadcrumb: {},
      navBarName: [{ name: "用户管理" }, { name: "网站用户" }],
      isRouterAlive: true,
      showPassword: "password",
      rules: {
        username: [{ validator: validateEmpty, trigger: "blur" }],
        password: [{ validator: validateEmpty, trigger: "blur" }],
        repeatPassword: [{ validator: validatePassword, trigger: "blur" }],
        permission: [{ validator: validateEmpty, trigger: "blur" }]
      }
    };
  },
  methods: {
    shownPassword() {
      if (this.showPassword === "password") this.showPassword = "text";
      else this.showPassword = "password";
    },
    submitAdminRegisterForm() {
      this.$refs["adminRegisterForm"].validate(valid => {
        if (valid) {
          this.$axios
            .post("admin/register", this.adminRegisterForm)
            .then(res => {
              let data = Promise.resolve(res.data);
              return data;
            })
            .then(data => {
              if (data.code == "ACK") {
                this.$message({
                  message: data.message,
                  type: "success"
                });
                this.$options.methods.emptyForm(this.adminRegisterForm);
              } else {
                this.$message.error(data.message);
              }
              this.dialogFormVisible = false;
            });
        } else {
          this.$message({
            message: "请填写必填项",
            type: "warning"
          });
        }
      });
    },
    handleNavCommand(command) {
      if (command === "register") {
        this.$options.methods.adminRegister.bind(this)();
      }
      if (command === "logout") {
        sessionStorage.removeItem("JWT");
        this.$router.push("/");
      }
    },
    adminRegister() {
      this.dialogFormVisible = true;
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    handleSelect(key, keyPath) {
      var index = keyPath[keyPath.length - 1].match(/\d/g);
      var nav = [],
        temp,
        path;
      for (let i of index) {
        if (temp != null) temp = temp.children[i - 1];
        else temp = navbar[i - 1];
        let ob = new Object();
        ob.name = temp.name;
        nav.push(ob);
        if (temp.path != null) path = temp.path;
      }
      this.navBarName = nav;
      this.$router.push(path);
    },
    breadCrumbAdd() {
      // console.log(document.getElementById("navbar"));
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    emptyForm(form) {
      for (let property in form) {
        form[property] = "";
      }
    }
  },
  components: {
    Icon
  }
};
</script>

<style scoped>
.el-submenu {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-menu {
  height: 100%;
  border: 0;
}
#navBar {
  height: 100%;
  float: left;
}
.el-breadcrumb__inner {
  color: white;
}
.adminRegister .el-input {
  width: 80%;
  float: left;
}
.adminRegister .el-select {
  float: left;
}
.adminRegister .dialog-footer {
  text-align: center;
}
</style>
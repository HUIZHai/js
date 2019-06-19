<template>
  <div class="container">
    <div
      class="row m-3"
      style="display:flex;align-items: center"
    >
      <h2>个人基本信息</h2>
    </div>
    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>账号：</h5>
      <input
        type="text"
        disabled="true"
        v-model="user.username"
      >
    </div>
    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>昵称：</h5>
      <input
        type="text"
        v-model="user.nickname"
      >
    </div>
    <div class="row m-2">
      <h5>头像：</h5>
      <div style="display: grid">
        <img
          :src="user.headerImgUrl"
          alt=""
          style="width:150px;height:150px"
        >
        <button
          type="button"
          class="btn btn-primary my-2"
          data-toggle="modal"
          data-target="#headerImgExchange"
        >更换头像</button>
      </div>
    </div>
    <div
      class="row m-2"
      style="display:flex;"
    >
      <h5>性别：</h5>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="orderBy"
          id="sex-man"
          value="0"
          v-model="user.sex"
          checked
        >
        <label
          class="form-check-label"
          for="sex-man"
        >
          男生
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="orderBy"
          id="sex-woman"
          value="1"
          v-model="user.sex"
        >
        <label
          class="form-check-label"
          for="sex-woman"
        >
          女生
        </label>
      </div>
    </div>

    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>电话：</h5>
      <input
        type="text"
        v-model="user.phoneNumber"
      >
    </div>
    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>邮件：</h5>
      <input
        type="text"
        v-model="user.email"
      >
    </div>
    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>工作：</h5>
      <input
        type="text"
        v-model="user.occupation"
      >
    </div>
    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>所在地：</h5>
      <v-distpicker
        :province="location.province"
        :city="location.city"
        :area="location.area"
        @province="changeLocation"
        @city="changeLocation"
        @selected="addressSelect"
      ></v-distpicker>
    </div>
    <div
      class="row m-2"
      style="display:flex;align-items: center"
    >
      <h5>个性签名：</h5>
      <textarea
        class="form-control"
        v-model="user.personalitySignature"
        rows="3"
      ></textarea>
    </div>
    <div
      class="modal fade bd-example-modal-lg"
      id="headerImgExchange"
      tabindex="-1"
      role="dialog"
      aria-labelledby="headerImgExchange"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">头像更换</h5>
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
              <div class="row">
                <div class="col-6">
                  <div style="width: 300px; height:300px; border: 1px solid gray; display: inline-block;">
                    <vue-cropper
                      ref='cropper'
                      :guides="true"
                      :view-mode="1"
                      drag-mode="move"
                      :auto-crop-area="0.5"
                      :min-container-width="250"
                      :min-container-height="250"
                      :minCropBoxWidth="200"
                      :minCropBoxHeight="200"
                      :background="true"
                      :rotatable="true"
                      :src="imgSrc"
                      :cropBoxResizable="false"
                      :cropmove="cropImage"
                      :ready="cropImage"
                      :zoom="cropImage"
                      alt="请上传图片"
                      :img-style="{ 'width': '300px', 'height': '300px' }"
                    >
                    </vue-cropper>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    style="font-size: 1.2em; padding: 10px 0;"
                    @change="setImage"
                  />
                </div>
                <div class="col-6">
                  <img
                    :src="cropImg"
                    style="width: 200px; height: 200px; border: 1px solid gray"
                    alt="头像预览"
                  />
                  <div class="my-2">
                    <button
                      class="btn btn-secondary"
                      @click="rotate"
                      v-if="imgSrc != ''"
                    >旋转图片</button>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    ref="closeModal"
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >关闭</button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="uploadImg"
                  >保存更改</button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="row m-2">
      <button
        class="btn btn-danger"
        @click="modifySubmit"
      >保存修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "personal_info",
  inject:['reload'],
  created() {
    //设置请求头
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("TOKEN");

    this.$options.methods.getUserInfo.bind(this)();
  },
  data() {
    return {
      user: {},
      imgSrc: "",
      cropImg: "",
      cropImgName: "",
      location: {
        province: "",
        city: "",
        area: ""
      }
    };
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      this.cropImgName = file.name;
      if (!file.type.includes("image/")) {
        alert("请上传图片文件");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("浏览器不支持FileReader方法");
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    uploadImg() {
      var form = new FormData();
      var img = this.cropImg;
      var imgName = this.cropImgName;
      var file = this.$options.methods.dataURLtoFile(img, imgName);
      var fileSize = file.size;
      //检查头像图片的大小是否小于3MB
      if (fileSize > 3 * 1024 * 1024) {
        console.log("图像超过3MB，无法上传");
        return;
      }
      // console.log("file size:" + file.size);
      form.append("file", file);
      this.$axios
        .post("/upload/img/movie", form)
        .then(res => {
          return Promise.resolve(res);
        })
        .then(json => {
          json = json.data;
          this.$refs.closeModal.click();
          this.$parent.user.headerImgUrl = json.data;
          this.user.headerImgUrl = json.data;
          this.$parent.$parent.alert("success", json.message);
        })
        .catch(error => {
          console.log(error);
          this.$parent.$parent.alert("danger", error);
        });
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    getUserInfo() {
      var url = "/user/info?username=" + this.$parent.user.username;
      this.$axios
        .get(url)
        .then(res => {
          return Promise.resolve(res);
        })
        .then(json => {
          json = json.data;
          this.user = json.data;
          this.$options.methods.regionExchange.bind(this)(this.user.location);
        });
    },
    addressSelect(object) {
      this.user.location = object.area.code;
    },
    regionExchange(id) {
      let regionId = id;
      let splitRegion = /(\d{2})(\d{2})/.exec(regionId);
      let provinceId = splitRegion[1] * 10000;
      let cityId = provinceId + splitRegion[2] * 100;
      var location = this.GLOBAL.BASE_REGIONS;
      for (let region of location) {
        if (region.id === provinceId) {
          location = region;
          break;
        }
      }
      this.location.province = location.name;
      if(provinceId === cityId)
        return
      for (let region of location.children) {
        if (region.id === cityId) {
          location = region;
          break;
        }
      }
      this.location.city = location.name;
      if(regionId === cityId)
        return
      for (let region of location.children) {
        if (region.id === regionId) {
          location = region;
          break;
        }
      }
      this.location.area = location.name;
    },
    changeLocation(e){
      if(e.code!=null)
        this.user.location = e.code
    },
    modifySubmit() {
      this.$axios
        .post("/user/update", this.user)
        .then(res => {
          return Promise.resolve(res);
        })
        .then(json => {
          json = json.data;
          this.$parent.$parent.alert("success", json.message);
          this.reload()
        });
    }
  }
};
</script>

<style scoped>
</style>
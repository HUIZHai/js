
<template>
    <el-form class="filmUploadFrom" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="电影名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="外文名">
            <el-input v-model="form.foreignName"></el-input>
        </el-form-item>
        <el-form-item label="片长" prop="sheetLength">
            <el-input v-model="form.sheetLength"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="language">
            <el-select class="filmPropertySelector" v-model="filmLanguage" multiple placeholder="电影类型">
                <el-option v-for="item in film_language" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="电影类型" prop="type">
            <el-select v-model="filmType" multiple placeholder="电影类型">
                <el-option v-for="item in film_type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="制片国家" prop="makeState">
            <el-select v-model="filmCountry" multiple placeholder="制片国家">
                <el-option v-for="item in film_country" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="上映时间">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择上映日期" v-model="form.releaseTime" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="导演" prop="dirctors">
            <el-input v-model="form.directors" placeholder="用'/'分隔'"></el-input>
        </el-form-item>
        <el-form-item label="编剧" prop="screenWriter">
            <el-input v-model="form.screenwriter" placeholder="用'/'分隔'"></el-input>
        </el-form-item>
        <el-form-item label="主演" prop="actors">
            <el-input type="textarea" v-model="form.actors" placeholder="用'/'分隔'"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
            <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="电影海报">
            <el-upload class="upload-demo" ref="upload_img" :limit=1 :http-request="imgUpload" action="localhost:8090/movie/img/upload" :on-remove="handleRemove" :on-change="changeImgFileSize" :file-list="fileList" :auto-upload="false" :on-exceed="overLimit">
                <div>
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </div>
            </el-upload>
        </el-form-item>
        <el-form-item style="text-align:left">
            <el-button type="primary" @click="onSubmit()">确认添加</el-button>
            <el-button @click="resetAddForm">重 置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  inject: ["reload"],
  created() {
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("JWT");
  },
  data() {
    var validateEmpty = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此处不能为空"));
      } else {
        callback();
      }
    };
    var validateInteger = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("此处不能为空"));
      } else {
        let tempValue = value.match(/\d+/g)
        if(tempValue.length === 1) {
          if(tempValue[0].length === value.length)
            callback()
          else
            callback(new Error("请输入整数"))
        }else{
            callback(new Error("你输入的字符中有空格"))
        }
      }
    };
    var validateList = (rule,value,callback) => {
      if(value == null){
        callback(new Error("此处不能为空"));
      }else{
        if(value.length>0)
          callback()
        else{
          callback(new Error("请至少选择一个选项"))
        }
      }
    }
    return {
      film_type: this.GLOBAL.Film_Type,
      film_country: this.GLOBAL.Film_Country,
      film_language: this.GLOBAL.Film_Language,
      fileList: [],
      filmType: [],
      filmCountry: [],
      filmLanguage: [],
      imgFileSize: 0,
      Authorization: {
        Authorization: sessionStorage.getItem("JWT")
      },
      form: {
        name: "",
        foreignName: "",
        language: "",
        sheetLength: "",
        type: "",
        makeState: "",
        actors: "",
        directors: "",
        screenwriter: "",
        releaseTime: "",
        introduction: "",
        imgUrl: ""
      },
      rules: {
        name: [{ validator: validateEmpty, trigger: "blur" }],
        language: [{ validator: validateEmpty, trigger: "blur" }],
        type: [{ validator: validateEmpty, trigger: "blur" }],
        sheetLength: [{ validator: validateInteger, trigger: "blur" }],
        makeState: [{ validator: validateEmpty, trigger: "blur" }],
        actors: [{ validator: validateEmpty, trigger: "blur" }],
        directors: [{ validator: validateEmpty, trigger: "blur" }],
        screenwriter: [{ validator: validateEmpty, trigger: "blur" }],
        introduction: [{ validator: validateEmpty, trigger: "blur" }]
      }
    };
  },
  watch: {
    filmType(newType, oldType) {
      let types = "";
      for (let a of newType) {
        types += a + "/";
      }
      this.form.type = types.substring(0, types.length - 1);
    },
    filmCountry(newType, oldType) {
      let types = "";
      for (let a of newType) {
        types += a + "/";
      }
      this.form.makeState = types.substring(0, types.length - 1);
    },
    filmLanguage(newType, oldType) {
      let types = "";
      for (let a of newType) {
        types += a + "/";
      }
      this.form.language = types.substring(0, types.length - 1);
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.imgFileSize > 0) {
            this.$refs.upload_img.submit();
          } else {
            this.$options.methods.submitFilmFormDate.bind(this)();
          }
        } else {
          this.$message({
            message: "请填写必填项",
            type: "warning"
          });
        }
      });
    },
    overLimit(files, fileList) {
      this.$message("只能上传一张图片");
    },
    imgUpload(data) {
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let formDate = new FormData();
      formDate.append("file", data.file);
      this.$axios
        .post("/movie/img/upload", formDate, config)
        .then(function(res) {
          return Promise.resolve(res.data);
        })
        .then(json => {
          this.form.imgUrl = json.data;
          this.$options.methods.submitFilmFormDate.bind(this)();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitUpload() {
      this.$refs.upload_img.submit();
    },
    handleRemove(file, fileList) {
      this.imgFileSize = fileList.length;
    },
    changeImgFileSize(file, fileList) {
      this.imgFileSize = fileList.length;
    },
    submitFilmFormDate() {
      this.$axios
        .post("/movie/add", this.form)
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
            this.reload()
          } else {
            this.$message.error(data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    resetAddForm(){
      for(let index in this.form){
        this.form[index] = "";
      }
      this.filmCountry = [];
      this.filmLanguage = [];
      this.filmType = [];
      this.fileList = [];
    }
  }
};
</script>

<style  scoped>
.el-input {
  width: 50%;
  float: left;
}
.el-select {
  width: 50%;
  float: left;
}
.el-select > .el-input {
  width: 100%;
}
.upload-demo{
  text-align: left;
}
.el-upload-list {
  float: left;
}
</style>

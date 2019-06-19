<template>
  <div style="width:100%;height:100%">
    <div style="width:100%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left;margin-left:2vw">
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="电影名"></el-input>
        </el-form-item>
        <el-select v-model="formInline.type" filterable placeholder="电影种类">
          <el-option v-for="item in film_types" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="formInline.makeState" filterable placeholder="国家">
          <el-option v-for="item in film_country" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="formInline.language" filterable placeholder="语言">
          <el-option v-for="item in film_language" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="onSubmitSearch(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="releaseTimeString" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="name" label="电影名" width="120">
        </el-table-column>
        <el-table-column prop="makeState" label="国家" width="120">
        </el-table-column>
        <el-table-column prop="language" label="语言" width="120">
        </el-table-column>
        <el-table-column prop="type" label="种类" width="180">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog class="filmInfoDialog" title="电影详细信息" :visible.sync="dialogFormVisible" top="1vh">
        <el-form :model="form">
          <el-container>
            <el-row style="width:100%">
              <el-col :span="16">
                <el-container>
                  <el-form-item label="电影名" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.name" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label="别名" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.foreignName" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label="上映时间" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.releaseTimeString" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label="片长" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.sheetLength" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label="国家" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.makeState" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label="导演" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.director" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
                <el-container>
                  <el-form-item label="编剧" :label-width="formLabelWidth" style="width:100%">
                    <el-input v-model="form.screenwriter" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
                  </el-form-item>
                </el-container>
              </el-col>
              <el-col :span="8">
                <img :src="form.imgUrl" alt="电影图片" style="width:60%">
              </el-col>
            </el-row>
          </el-container>
          <el-container>
            <el-form-item label="演员" :label-width="formLabelWidth" style="width:80%">
              <el-input type="textarea" :rows="3" v-model="form.actors" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="简介" :label-width="formLabelWidth" style="width:80%">
              <el-input type="textarea" :rows="5" v-model="form.introduction" autocomplete="off" :disabled="filmInfoModifyAble"></el-input>
            </el-form-item>
          </el-container>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning " @click="changeModifyStatus">修 改</el-button>
          <el-button type="primary" @click="ensureModify" :disabled="filmInfoModifyAble == true">确 定</el-button>
        </span>
      </el-dialog>

    </div>
    <div style="float:left">
      <el-pagination :page-size="pageSize" background layout="prev, pager, next" @current-change="getSelectPage" :total="pageNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "managerFilmList",
  inject: ["reload"],
  created() {
    //设置请求头
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("JWT");

    var data = {
      pageNum: 1,
      pageSize: 10
    };
    this.$options.methods.getFilmList.bind(this)(data);
    this.options = this.GLOBAL.REGIONS;
  },
  data() {
    return {
      pageNumber: 0,
      pageSize:10,
      filmInfoModifyAble: true,
      dialogFormVisible: false,
      formInline: {
        name: "",
        type: "",
        language: "",
        makeState: ""
      },
      film_types: this.GLOBAL.Film_Type,
      film_country: this.GLOBAL.Film_Country,
      film_language: this.GLOBAL.Film_Language,
      tableData: [],
      multipleSelection: [],
      form: {},
      formLabelWidth: "70px",
      options: []
    };
  },
  methods: {
    changeModifyStatus() {
      if (this.filmInfoModifyAble === true) this.filmInfoModifyAble = false;
      else this.filmInfoModifyAble = true;
    },
    ensureModify(){
      if(this.filmInfoModifyAble === false){
        this.$axios.post("/movie/update",this.form)
        .then(res=>{
          return Promise.resolve(res.data);
        })
        .then(json=>{
          if(json.code === "ACK"){
            this.$message({
              message: json.message,
              type: "success"
            })
            this.dialogFormVisible=false
            this.reload();
          }else {
            this.$message.error(json.message);
          }
        })
        .catch(error=>{
          console.log(error)
        })
      }else{
        this.dialogFormVisible=false
      }
    },
    onSubmitSearch(pageNum) {
      this.formInline.pageNum = pageNum;
      this.formInline.pageSize = 10;
      this.$options.methods.getFilmList.bind(this)(this.formInline);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    handleDelete(index, row) {
      this.$options.methods.openDelete.bind(this)(row.id)
    },
    getSelectPage(page) {
      this.formInline.pageNum = page;
      this.formInline.pageSize = 10;
      this.$options.methods.getFilmList.bind(this)(this.formInline);
    },
    getFilmList(data) {
      this.$axios
        .post("/movie/search", data)
        .then(function(res) {
          return Promise.resolve(res.data);
        })
        .then(json => {
          this.pageNumber = json.data.pageNumber;
          this.tableData = json.data.list;
          for (var data of json.data.list) {
            convertToString(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    regionChange(value) {
      this.form.location = value[value.length - 1];
    },
    openDelete(id) {
      this.$confirm("此操作将删除该电影, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$options.methods.deleteMovie.bind(this)(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteMovie(id){
      if(id<0)
        return;
      let url = this.GLOBAL.BASE_URL+"movie/delete?id="+id;
      this.$axios.get(url)
      .then(res=>{return Promise.resolve(res.data)})
      .then(json=>{
        this.$message({
            type: "info",
            message: json.message
          });
        this.reload();
      })
      .catch(error=>{console.log(error)})
    }
  }
};
function convertToString(form) {
  if (form.sex === 0) form.sex = "0";
  else if (form.sex === 1) form.sex = "1";
}

function linkFatherRegions(region) {
  var locations = [];
  locations[0] = region - (region % 1000);
  if (region != locations[0]) {
    locations[1] = region - (region % 100);
    if (region != locations[1]) locations[2] = region;
  }
  return locations;
}
</script>

<style lang="scss" scoped>
.filmInfoDialog {
  .el-dialog {
    width: 70%;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    color: #606266;
  }
  .el-dialog__footer{
    height: 70px;
  }
}
</style>


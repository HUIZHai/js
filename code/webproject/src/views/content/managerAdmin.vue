<template>
  <div style="width:100%;height:100%">
    <div style="width:100%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:left;margin-left:2vw">
        <el-form-item label="用户名">
          <el-input v-model="formInline.user" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="createDate" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="username" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="用户详细信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-container>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
          </el-container>
          <el-form-item label="性别" :label-width="formLabelWidth" style="text-align:left">
            <el-radio v-model="form.sex" label=0>男</el-radio>
            <el-radio v-model="form.sex" label=1>女</el-radio>
          </el-form-item>
          <el-container>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮件" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-container>
          <el-container>
            <el-form-item label="工作" :label-width="formLabelWidth">
              <el-input v-model="form.occupation" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在地" :label-width="formLabelWidth">
              <el-cascader placeholder="行政区划" :options="options" filterable change-on-select v-model="selectedOptions" @change="regionChange"></el-cascader>
            </el-form-item>
          </el-container>
          <el-form-item label="签名" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.personalitySignature" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUserForm()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <div style="float:left">
      <el-pagination background layout="prev, pager, next" @current-change="getSelectPage" :total="pageNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "managerUser",
  inject: ["reload"],
  created() {
    this.$options.methods.getUserList.bind(this)(1);
    this.options = this.GLOBAL.REGIONS;
  },
  data() {
    return {
      pageNumber: 0,
      dialogFormVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      multipleSelection: [],
      form: {},
      formLabelWidth: "60px",
      options: [],
      selectedOptions: []
    };
  },
  methods: {
    onSubmit() {
      var data = {
        username: this.formInline.user,
        pageSize: 10,
        pageNum: 1
      };
      //设置请求头
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = sessionStorage.getItem("JWT");
      this.$axios
        .post("/admin/search", data)
        .then(function(res) {
          return Promise.resolve(res.data);
        })
        .then(json => {
          this.tableData = json.data.list;
          this.pageNumber = json.data.pageNumber;
        })
        .catch(function(error) {
          console.log(error);
        });
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
      this.selectedOptions = [];
      if (this.form.location != null)
        this.selectedOptions = linkFatherRegions(this.form.location);
    },
    handleDelete(index, row) {
      this.$options.methods.openDelete.bind(this)(row.id)
    },
    openDelete(id) {
      this.$confirm("此操作将删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$options.methods.delete.bind(this)(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delete(id){
      let url = this.GLOBAL.BASE_URL+"admin/delete?adminId="+id;
      //设置请求头
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = sessionStorage.getItem("JWT");
      this.$axios.get(url)
      .then(res=>{return Promise.resolve(res.data)})
      .then(json=>{
        if(json.code==="ACK"){
          this.$message({
            type: "success",
            message: json.message
          });
        }else{
          this.$message.error(json.message)
        }
      this.reload();
      })
      .catch(error=>{this.$message.error(error)})
    },
    submitUserForm() {
      this.$axios
        .post("/admin/update", this.form)
        .then(function(res) {
          return Promise.resolve(res.data)
        })
        .then(json=>{
          this.$message({
            type: "info",
            message: json.message
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      this.dialogFormVisible = false;
    },
    getSelectPage(page) {
      this.$options.methods.getUserList.bind(this)(page);
    },
    getUserList(page) {
      var data = {
        pageNum: page,
        pageSize: 10
      };
      //设置请求头
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = sessionStorage.getItem("JWT");
      this.$axios
        .post("/admin/search", data)
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

<style scoped>
.el-form-item_label {
  text-align: center;
}
</style>

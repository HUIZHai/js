<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="float:left;margin-left:2vw"
    >
      <el-form-item>
        <el-input
          v-model="formInline.movieName"
          placeholder="电影名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.userName"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.commentaryName"
          placeholder="影评名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmitSearch()"
        >查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="日期"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="影评标题"
        width="360"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="评分"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="likeNumber"
        label="点赞数"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleWatch(scope.$index, scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float:left">
      <el-pagination :page-size="formInline.pageSize" background layout="prev, pager, next" @current-change="getSelectPage" :total="total">
      </el-pagination>
    </div>
    <el-dialog class="CommentaryInfoDialog" title="影评详细信息" :visible.sync="dialogFormVisible" top="1vh">
        <el-form :model="commentary">
          <div class="article"  v-html="commentary.content"></div>
        </el-form>
        <span slot="footer" class="dialog-footer info-button">
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          <el-button type="danger" @click="handleBanAccount(commentary.userName)">封 号</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  created(){
    this.$options.methods.onSubmitSearch.bind(this)(1);
  },
  data() {
    return {
      filmInfoModifyAble: true,
      dialogFormVisible: false,
      total:0,
      formInline: {
        movieName: "",
        userName: "",
        commentaryName: "",
        type:0,
        pageNum: 0,
        pageSize: 10
      },
      tableData: [],
      commentary: {},
      formLabelWidth: "70px",
      options: []
    };
  },
  methods: {
    onSubmitSearch(page) {
      this.formInline.pageNum = page;
      this.$axios.post("long/search",this.formInline)
      .then(res=>{return Promise.resolve(res.data)})
      .then(json=>{
        if(json.code==="ACK"){
          this.tableData = json.data.list;
          this.total = json.data.total;
        }else{
          this.$message.error(json.message);
        }
      })
      .catch(error=>{this.$message.error(error);})
    },
    getSelectPage(page){
      this.$options.methods.onSubmitSearch.bind(this)(page);
    },
    handleWatch(index,row){
      this.commentary = row;
      this.dialogFormVisible = true;
    },
    handleDelete(index,row){
      this.$options.methods.openDelete.bind(this)(row.id)
    },
    delete(id){
      let url = this.GLOBAL.BASE_URL+"long/delete?id="+id;
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
      })
      .catch(error=>{this.$message.error(error)})
    },
     openDelete(id) {
      this.$confirm("此操作将删除该影评, 是否继续?", "提示", {
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
    handleBanAccount(username) {
      this.$confirm("确认对该用户给予封号处理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
        .get("/user/ban", { params: { username: username } })
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
            dialogFormVisible = false;
          } else {
            this.$message.error(data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
.article {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-top: 3%;
  padding-left: 5%;
  padding-right: 5%;
  margin-left: 5%;
  margin-right: 5%;
  border: 2px solid rgb(0, 119, 255);
}

.info-button {
  padding-right: 5%;
}

.article img {
  max-width: 100%;
}
</style>

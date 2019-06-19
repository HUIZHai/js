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
          v-model="formInline.username"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-select
        v-model="formInline.state"
        filterable
        placeholder="审核状态"
      >
        <el-option
          v-for="item in askState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmitSearch(1)"
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
        prop="createtimeString"
        label="申请日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="auditingtimeString"
        label="审核时间"
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
            :disabled="pageState!=0"
            @click="handlePass(scope.$index, scope.row)"
          >通过</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="pageState!=0"
            @click="handleUnpass(scope.$index, scope.row)"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float:left">
      <el-pagination
        :page-size="formInline.pageSize"
        background
        layout="prev, pager, next"
        @current-change="getSelectPage"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      class="AskInfoDialog"
      title="申请详细信息"
      :visible.sync="dialogFormVisible"
      top="1vh"
    >
      <el-form :model="ask">
        <div
          class="article"
          v-html="ask.content"
        ></div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  created() {
    //设置请求头
    this.$axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("JWT");
    this.$options.methods.onSubmitSearch.bind(this)(1);
  },
  data() {
    return {
      dialogFormVisible: false,
      total: 0,
      pageState: 0,
      formInline: {
        username: "",
        state: 0,
        pageNum: 1,
        pageSize: 10
      },
      askState: this.GLOBAL.ASK_PRO_STATE,
      tableData: [],
      ask: {},
      formLabelWidth: "70px"
    };
  },
  methods: {
    onSubmitSearch(page) {
      this.formInline.pageNum = page;
      this.$axios
        .post("upgrade/search", this.formInline)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.tableData = json.data.list;
            this.total = json.data.total;
            this.pageState = this.formInline.state;
          } else {
            this.$message.error(json.message);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    getSelectPage(page) {
      this.$options.methods.onSubmitSearch.bind(this)(page);
    },
    handleWatch(index, row) {
      this.ask = row;
      this.dialogFormVisible = true;
    },
    handlePass(index, row) {
      this.$options.methods.openPass.bind(this)(row.id);
    },
    handleUnpass(index, row) {
      this.$options.methods.openUnpass.bind(this)(row.id);
    },
    openPass(id) {
      this.$confirm("你确定通过该用户的申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = this.GLOBAL.BASE_URL + "upgrade/pass?id=" + id;
          this.$options.methods.upgradeResult.bind(this)(url);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    openUnpass(id) {
      this.$confirm("你确定拒绝该用户的申请吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = this.GLOBAL.BASE_URL + "upgrade/unpass?id=" + id;
          this.$options.methods.upgradeResult.bind(this)(url);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    upgradeResult(url) {
      this.$axios
        .get(url)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .then(json => {
          if (json.code === "ACK") {
            this.$message(json.message);
          } else {
            this.$message.error(json.message);
          }

          this.reload();
        })
        .catch(error => {
          this.$message.error(error);
          console.log(error);
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

.article img {
  max-width: 100%;
}
</style>

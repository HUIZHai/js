<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">影评提交</h5>
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
            <div class="form-group">
              <label for="markCommentInput">影评种类</label>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-danger dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{typeName}}
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    href="javascript:void(0);"
                    @click="changeType(0)"
                  >普通</a>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0);"
                    @click="changeType(1)"
                    v-if="power === 'pro'"
                  >专家</a>
                </div>
              </div>
            </div>
              <label for="markCommentInput">请给电影打个分吧</label>
              <mark-stars
                :score="vscore"
                v-on:changeScore="changeScore"
              ></mark-stars>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="submit"
          >确认</button>
          <button
            type="button"
            ref="modalCancel"
            class="btn btn-secondary"
            data-dismiss="modal"
          >取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import markStars from "../movieInfo/markStars";
export default {
  created(){
    if(sessionStorage.getItem("INFO")!=null){
      this.power = JSON.parse(sessionStorage.getItem("INFO")).power;
    }
  },
  components: {
    "mark-stars": markStars
  },
  data() {
    return {
      vscore: 0,
      typeName: '普通',
      vtype: 0,
      power: false
    };
  },
  watch: {
    vscore(newVal, OldVal) {
      this.$emit("inputscore", newVal);
    },
    vtype(newVal, OldVal) {
      if(newVal === 1)
        this.typeName = '专家'
      else
        this.typeName = '普通'
      this.$emit("inputtype", newVal);
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    changeScore(score) {
      this.vscore = score;
    },
    changeType(type) {
      this.vtype = type;
    }
  }
};
</script>
<style scoped>
.modal-body {
  text-align: left;
}
</style>

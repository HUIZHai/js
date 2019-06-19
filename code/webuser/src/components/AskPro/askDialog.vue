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
          <h5 class="modal-title">专家申请</h5>
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
              <label for="markCommentInput">申请信息</label>
              <textarea
                rows="5"
                class="form-control"
                id="markCommentInput"
                aria-describedby="markComment"
                placeholder="输入你的申请信息"
                v-model="message"
              ></textarea>
              <small
                id="markComment"
                class="form-text text-muted"
              >申请限制字数为500个字</small>
            </div>
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
export default {
  data() {
    return {
      message: ""
    };
  },
  watch: {
    message(newVal, OldVal) {
      this.$emit("message", newVal);
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    }
  }
};
</script>
<style scoped>
.modal-body {
  text-align: left;
}
</style>

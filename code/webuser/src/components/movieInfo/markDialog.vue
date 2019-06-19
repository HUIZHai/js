<template>
  <div
    class="modal fade"
    :id="id"
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
          <h5 class="modal-title">用户电影点评</h5>
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
              <label for="markNumberInput">评分</label>
              <!-- <input
                type="text"
                class="form-control"
                id="markNumberInput"
                aria-describedby="markNumber"
                placeholder="mark"
                v-model="vscore"
              > -->
              <mark-star
                :score="vscore"
                v-on:changeMessage="changeMessage"
                v-on:changeScore="changeScore"
              ></mark-star>
              <!-- <p>{{vscore}}</p> -->
              <p>{{markMessage}}</p>
              <small
                id="markNumber"
                class="form-text text-muted"
              >短评评分限制在1-10分之间</small>
            </div>
            <div class="form-group">
              <label for="markCommentInput">你的短评</label>
              <textarea
                rows="5"
                class="form-control"
                id="markCommentInput"
                aria-describedby="markComment"
                placeholder="输入你的短评"
                v-model="vcontent"
              ></textarea>
              <small
                id="markComment"
                class="form-text text-muted"
              >短评限制字数为350个字</small>
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
import markStars from "./markStars.vue";

export default {
  components: {
    "mark-star": markStars
  },
  props: {
    id: String,
    score: Number,
    content: String
  },
  data() {
    return {
      vscore: this.score,
      vcontent: this.content,
      markMessage: ""
    };
  },
  watch: {
    vscore(newVal, OldVal) {
      this.$emit("inputscore", newVal);
    },
    vcontent(newVal, OldVal) {
      this.$emit("inputcontent", newVal);
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    changeMessage(markMessage) {
      this.markMessage = markMessage;
    },
    changeScore(score) {
      this.vscore = score;
    }
  }
};
</script>
<style scoped>
.modal-body {
  text-align: left;
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    alert(type,message) {
      var alert =
        '<div class=" alert alert-dismissible fade show" style="position:absolute;left:30%;right:30%;z-index:1100" id="alert" role="alert"> </div>' ;
      if (type === "success") {
        $("#app").prepend(alert);
        $("#alert").addClass("alert-success")
        $("#alert").prepend(" <strong>成功</strong> ")
        $("#alert").text(message)
      }else if(type === "warning"){
        $("#app").prepend(alert);
        $("#alert").addClass("alert-warning")
        $("#alert").prepend(" <strong>警告</strong> ")
        $("#alert").text(message)
      }else if(type === "danger"){
        $("#app").prepend(alert);
        $("#alert").addClass("alert-danger")
        $("#alert").prepend(" <strong>错误</strong> ")
        $("#alert").text(message)
      }else if(type === "info"){
        $("#app").prepend(alert);
        $("#alert").addClass("alert-info")
        $("#alert").prepend(" <strong>消息</strong> ")
        $("#alert").text(message)
      }

      setTimeout(function(){
        $(".alert").alert("close")
      },2000)
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

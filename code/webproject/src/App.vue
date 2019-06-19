<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // this.$axios
    //   .get("SRegion/listAll")
    //   .then(function(res) {
    //     return Promise.resolve(res.data);
    //   })
    //   .then(json => {
    //     var regions = json[0].children;
    //     addOptions(regions);
    //     sessionStorage.setItem("regions", JSON.stringify(regions));
    //     this.GLOBAL.REGIONS = regions;
    //     console.log(this.GLOBAL.REGIONS)
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }
};

function addOptions(options) {
  for (let a of options) {
    a.label = a.name;
    a.value = a.id;
    if (a.children != null) {
      addOptions(a.children);
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>

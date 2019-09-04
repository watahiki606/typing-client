<template>
  <el-container id="app">
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <a href="/lesson">lessons</a>
          </el-menu-item>

          <el-menu-item index="4">
            <a href="/" target="_blank">Sgin in</a>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-header id="nav">
      <global-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import GlobalHeader from "./components/GlobalHeader.vue";
export default {
  components: {
    GlobalHeader
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

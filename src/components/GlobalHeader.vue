<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="1">
            <el-link :underline="false" @click="push('/')">about</el-link>
          </el-menu-item>
          <el-menu-item index="2">
            <el-link :underline="false" @click="push('/lesson')">lessons</el-link>
          </el-menu-item>

          <el-menu-item index="3">
            <el-link :underline="false" @click="push('/signin')">Sign in</el-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GlobalHeader",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    push: function(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/colors";

.global-header {
  background-color: $HEADER_BACKGROUND;
}
.global-header-label {
  color: $HEADER_LABEL;
  font-weight: bold;
  line-height: 6.5vh;
}
</style>

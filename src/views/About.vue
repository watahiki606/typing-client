<template>
  <div class="about">
    <el-row class="global-header">
      <el-col :span="24">
        <span class="global-header-label">Welcome to Shakyo Application!</span>
      </el-col>
    </el-row>
    <el-row>
      <h1>Typing Practice for Programmers</h1>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="9">
        <el-image :src="src"></el-image>
      </el-col>
    </el-row>

    <el-row>
      <el-button size="lerge" type="primary" @click="gotoLessons()">Sign In</el-button>
    </el-row>
  </div>
</template>
<script>
import src from "@/assets/about.jpg";
export default {
  name: "About",

  data() {
    return {
      src
    };
  },

  mounted() {},
  methods: {
    gotoLessons: function() {
      this.$router.push("/lesson");
    }
  }
};
</script>
<style scoped lang="scss">
@import "../styles/base";
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
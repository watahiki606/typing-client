<template>
  <div class="about">
    <div class="global-header">
      <el-row>
        <el-col :span="24">
          <span class="global-header-label">Welcome to Shakyo Application!</span>
        </el-col>
      </el-row>
    </div>
    <h1>Typing Practice for Programmers</h1>
    <div class="block">
      <el-image :src="src"></el-image>
    </div>

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
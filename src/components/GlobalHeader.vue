<template>
  <div class="global-header">
    <el-row>
      <el-col :span="24">
        <span class="global-header-label">Welcome to Shakyo Application!</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "GlobalHeader"
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

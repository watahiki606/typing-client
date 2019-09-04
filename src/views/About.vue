<template>
  <div class="about">
    <h1>Typing Practice for Programmers</h1>

    <el-button
      size="lerge"
      type="primary"
      @click="startLesson(scope.row.language, scope.row.sourceCode)"
    >Sign In</el-button>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/base";
</style>
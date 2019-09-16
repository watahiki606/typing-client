<template>
  <el-button type="text" class="signout-label" @click="signout">Signout</el-button>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "SubHeader",
  methods: {
    signout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style scoped>
</style>
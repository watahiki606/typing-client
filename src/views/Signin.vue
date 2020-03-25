<template>
  <div class="signin">
    <h2>Sign in</h2>

    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import firebaseui from "firebaseui-ja";
import "firebaseui-ja/dist/firebaseui.css";
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      uiConfig: {
        signInSuccessUrl: "/lesson",
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
      }
    };
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start("#firebaseui-auth-container", this.uiConfig);
  },
  methods: {
    signIn: async function() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.username, this.password);
        this.$router.push("/lesson");
      } catch (error) {
        this.$message({
          showClose: true,
          message: error,
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/base";
</style>

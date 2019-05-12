<template>
  <el-row>
    <sub-header/>
    <el-col>
      <el-button type="success" @click="gameSet">Press Space to start</el-button>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>STATUS</span>
        </div>
        <el-row class="row-wrapper">
          <el-col :span="8">
            <span>{{lessonName}}</span>
          </el-col>
          <el-col :span="4">
            <span>typeable characters</span>
          </el-col>
          <el-col :span="4">
            <span>collaterally typed</span>
          </el-col>
          <el-col :span="4">
            <span>remaining</span>
          </el-col>
          <el-col :span="4">
            <span>incorrectly typed</span>
          </el-col>
        </el-row>
        <el-row class="row-wrapper score">
          <el-col :span="8">
            <span>01:01:00</span>
          </el-col>
          <el-col :span="4">
            <span>{{typStringsLength}}</span>
          </el-col>
          <el-col :span="4">
            <span v-bind:class="{correctColor:correctColor}">{{cnt}}</span>
          </el-col>
          <el-col :span="4">
            <span v-bind:class="{correctColor:correctColor}">{{typStringsLength - cnt}}</span>
          </el-col>
          <el-col :span="4">
            <span v-bind:class="{incorrectColor:incorrectColor}">{{missCount}}</span>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :span="24" class="code">
      <div v-show="mappedKeyCodeElement.length == 0" @click="backToLesson">
        <el-link>Text is empty. Please select.</el-link>
      </div>
      <el-col :span="24">
        <div class="code">
          <code v-show="!gameEndFlag">
            <span
              v-for="(obj, index) in mappedKeyCodeElement"
              v-bind:key="index"
              v-bind:class="{active:index === cnt,return:obj.char === returnChar,typed:index <= cnt - 1 }"
            >{{obj.char}}</span>
          </code>
          <div v-show="gameEndFlag">{{fin}}</div>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import SubHeader from "../components/SubHeader.vue";
export default {
  name: "Typing",
  components: { SubHeader },
  data() {
    return {
      typStringsLength: this.$store.state.mappedKeyCodeElement.length,
      mappedKeyCodeElement: this.$store.state.mappedKeyCodeElement,
      lessonName: this.$store.state.lessonName,
      shiftCheck: 0, //シフトが押された状態かを区別する
      isGaming: false, //ゲーム中かどうかフラグ
      gameEndFlag: false, //ゲームを最後までやったかフラグ
      typStart: "", //開始時と終了時の時刻を格納
      typEnd: "",
      cnt: 0, //何文字目かを格納
      ans: 0, //回答数
      shiftFlg: [], //問題文字列の文字が大文字か小文字かを区別するためのフラグ
      missCount: 0, //ミスタイプの数
      fin: "",
      returnChar: "↲",

      correctColor: false,
      incorrectColor: false
    };
  },
  beforeCreate: function() {
    this.$store.commit("setSourceCode");
  },

  mounted() {
    window.addEventListener("keydown", this.typeGame);
    window.addEventListener("keyup", this.shiftUp);
  },
  destroyed() {
    window.removeEventListener("keydown", this.typeGame);
    window.removeEventListener("keyup", this.shiftUp);
  },
  watch: {
    cnt: function() {
      console.log("cnt!!!!!!!!!!!!!!!!!!!!!!");
      this.correctColor = !this.correctColor;
      setTimeout(() => {
        this.correctColor = !this.correctColor;
      }, 300);
    },
    missCount: function() {
      console.log("mis!!!!!!!!!!!!!!!!!!!!!!");
      this.incorrectColor = !this.incorrectColor;
      setTimeout(() => {
        this.incorrectColor = !this.incorrectColor;
      }, 300);
    }
  },
  methods: {
    backToLesson: async function() {
      this.$router.push("/lesson");
    },
    shiftUp: function(event) {
      if (event.keyCode == "16") {
        this.shiftCheck = 0;
        console.log("shiftcheck:" + this.shiftCheck);
      }
    },
    getInputKeycode: function(event) {
      var inputKeycode; //入力されたキーコードを格納する変数

      //点滅のカウントをクリア
      // countBlink = 0;

      //入力されたキーのキーコードを取得
      if (document.all) {
        inputKeycode = event.keyCode;
      } else {
        inputKeycode = event.which;
      }

      //シフトが押されたらshiftCheckを1にする。
      if (inputKeycode == "16") {
        this.shiftCheck = 1;
        console.log("shiftCheck : " + this.shiftCheck);
      }
      return inputKeycode;
    },
    gameSet: function() {
      console.log(
        "============================================gameSet start================================================"
      );
      document.activeElement.blur();

      // ゲーム中になる
      this.cnt = 0;
      console.log("cnt Clear!");
      this.isGaming = true;
      console.log("isGaming:" + this.isGaming);
      this.gameEndFlag = false;
      console.log("gameEndfgl:" + this.gameEndFlag);
      this.missCount = 0;
      this.typStart = new Date();
    },

    //キー入力を受け取る関数
    typeGame: function(event) {
      var inputKeycode = this.getInputKeycode(event);

      //スペースが押されたらゲームスタート
      if (inputKeycode == "32" && !this.isGaming && !this.gameEndFlag) {
        this.gameSet();
        console.log("pushed space");
        // 問題文の一文字目がスペースの場合そのまま正解してしまうのを防ぐ
        return;
      }
      //rが押されたらリスタート
      if (inputKeycode == "82" && this.gameEndFlag) {
        this.gameSet();
        console.log("pushed r");
        // 問題文の一文字目がrの場合そのまま正解してしまうのを防ぐ
        return;
      }
      //ゲーム中にescが押されたらリスタート
      if (inputKeycode == "27" && this.isGaming) {
        this.gameSet();
        console.log("pushed esc");
      }

      console.log(
        "inputKeycode:[" +
          inputKeycode +
          "]" +
          "       shiftCheck:[" +
          this.shiftCheck +
          "]" +
          "       cnt:[" +
          this.cnt +
          "]" +
          "       lesson.keyCode:[" +
          this.mappedKeyCodeElement[this.cnt].keycode +
          "]" +
          "       lesson.shiftCode:[" +
          this.mappedKeyCodeElement[this.cnt].shiftCode +
          "]"
      );
      if (this.isGaming) {
        if (
          //入力されたキーコードと問題文のキーコードを比較
          inputKeycode == this.mappedKeyCodeElement[this.cnt].keycode &&
          this.shiftCheck == this.mappedKeyCodeElement[this.cnt].shiftCode
        ) {
          //キーコードが一致した時の処理
          console.log("キーコード一致");
          //最初の1文字が一致したらスタート
          // if (this.cnt == 0) {
          //   this.gameSet();
          // }

          this.cnt++;
          console.log(
            "                                                  cnt:[" +
              this.cnt +
              "]"
          );

          //全文字入力したか確認
          if (this.cnt == this.typStringsLength) {
            //全文字入力していたら、終了時間を記録する
            this.typEnd = new Date();

            //終了時間－開始時間で掛かったミリ秒を取得する
            var keika = this.typEnd - this.typStart;

            //1000で割って「切捨て」、秒数を取得
            var sec = Math.floor(keika / 1000);

            //1000で割った「余り(%で取得できる）」でミリ秒を取得
            var msec = keika % 1000;

            //問題終了を告げる文字列を作成し表示
            this.fin = "finish ： " + sec + " sec " + msec + " m ";

            //ゲーム終了
            console.log(
              "=====================================END====================================="
            );
            this.gameEndFlag = true;
            this.isGaming = false;
            this.cnt = 0;
            console.log(
              "                                        cnt Clear[" +
                this.cnt +
                "]"
            );
            console.log(
              "                                        gameEndFlag [" +
                this.gameEndFlag +
                "]"
            );
            console.log(
              "                                        isGaming [" +
                this.isGaming +
                "]"
            );
          }
        } else {
          console.log("キーコードfu一致");
          //不正解の場合はここにelse
          if (this.cnt !== 0 && !this.gameEndFlag) this.missCount++;
          console.log("miss" + this.missCount);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/base";
.code {
  all: initial;
  text-align: left;
  white-space: pre;
}
.active {
  color: #ffffff;
  background-color: #47d42b;
  outline: 1px solid #40be27;
}
.return {
  margin-right: auto;
}
.return:after {
  content: "\A";
}
.correctColor {
  color: #ffffff;
  transition: all 0.1s 0s linear;
  background-color: #71e2b3;
}
.incorrectColor {
  color: #ffffff;
  transition: all 0.1s 0s linear;
  background-color: #e68d8d;
}
.typed {
  color: #ffffff;
  background-color: #ffffff;
}
</style>

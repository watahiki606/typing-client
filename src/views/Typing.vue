<template>
  <el-row>
    <sub-header/>
    <el-card>
      <el-button type="success" @click="gameSet">Press Space to start</el-button>
    </el-card>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>STATUS</span>
        </div>
        <el-row class="row-wrapper">
          <el-col :span="8">
            <span>{{language}}</span>
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
            <span>{{stopWatch}}</span>
          </el-col>
          <el-col :span="4">
            <span>{{typStringsLength}}</span>
          </el-col>
          <el-col v-bind:class="{correctColor:correctColor}" :span="4">
            <span>{{correct}}</span>
          </el-col>
          <el-col v-bind:class="{correctColor:correctColor}" :span="4">
            <span>{{typStringsLength - correct}}</span>
          </el-col>
          <el-col v-bind:class="{incorrectColor:incorrectColor}" :span="4">
            <span>{{missCount}}</span>
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
          <pre class="prettyprint"><code v-show="!isGameEnded"><span
  class="code"
  v-for="(obj, index) in mappedKeyCodeElement"
  v-bind:key="index"
  v-bind:class="{active:index === correct, return:obj.char === returnChar,typed:index <= correct - 1 }"
>{{obj.char}}</span>
          </code></pre>
          <div v-show="isGameEnded">{{fin}}</div>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import SubHeader from "../components/SubHeader.vue";
const prettyPrint = require("code-prettify");
export default {
  name: "Typing",
  components: { SubHeader },
  data() {
    return {
      typStringsLength: this.$store.state.mappedKeyCodeElement.length,
      mappedKeyCodeElement: this.$store.state.mappedKeyCodeElement,
      language: this.$store.state.language,
      shiftPushed: 0, //シフトが押された状態の場合は1
      isGaming: false, //ゲーム中はtrue
      isGameEnded: false, //ゲームを最後までやったらtrue
      typStart: 0, //開始時と終了時の時刻を格納
      typEnd: 0,
      stopWatchID: undefined,
      correct: 0, //何文字目まで正解したかを格納
      missCount: 0, //ミスタイプの数を格納
      fin: "",
      returnChar: "\n",
      keika: 0,
      stopWatch: "00:00:000",
      correctColor: false,
      incorrectColor: false
    };
  },
  beforeCreate: function() {
    this.$store.commit("setSourceCode");
  },

  mounted() {
    this.$nextTick(function() {
      prettyPrint.prettyPrint();
    });
    window.addEventListener("keydown", this.typeGame);
    window.addEventListener("keyup", this.shiftUp);
  },
  destroyed() {
    window.removeEventListener("keydown", this.typeGame);
    window.removeEventListener("keyup", this.shiftUp);
  },
  watch: {
    correct: function() {
      this.correctColor = !this.correctColor;
      setTimeout(() => {
        this.correctColor = !this.correctColor;
      }, 300);
    },
    missCount: function() {
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
        this.shiftPushed = 0;
      }
    },
    time: function() {
      const self = this;
      this.typStart = Date.now();
      let count = function() {
        let duration = Date.now() - self.typStart;
        let min = Math.floor(duration / 60000);
        let sec = Math.floor((duration % 60000) / 1000);
        let msec = duration % 1000;

        min = ("0" + min).slice(-2);
        sec = ("0" + sec).slice(-2);
        msec = ("00" + msec).slice(-3);
        self.stopWatch = min + ":" + sec + "." + msec;
      };
      if (this.stopWatchID) {
        clearInterval(this.stopWatchID);
        this.stopWatch = "00:00:000";
      }
      if (this.isGaming) {
        this.stopWatchID = setInterval(count, 10);
      }
    },
    getInputKeycode: function(event) {
      var inputKeycode; //入力されたキーコードを格納する変数

      //入力されたキーのキーコードを取得
      if (document.all) {
        inputKeycode = event.keyCode;
      } else {
        inputKeycode = event.which;
      }

      //シフトが押されたらshiftPushedを1にする。
      if (inputKeycode == "16") {
        this.shiftPushed = 1;
      }
      return inputKeycode;
    },
    gameSet: function() {
      document.activeElement.blur();
      this.time();
      // ゲーム中になる
      this.correct = 0;
      this.isGameEnded = false;
      this.missCount = 0;
    },

    //キー入力を受け取る関数
    typeGame: function(event) {
      var inputKeycode = this.getInputKeycode(event);

      //スペースが押されたらゲームスタート
      if (inputKeycode == "32" && !this.isGaming && !this.isGameEnded) {
        this.isGaming = true;
        this.gameSet();
        // 問題文の一文字目がスペースの場合そのまま正解してしまうのを防ぐ
        return;
      }
      //rが押されたらリスタート
      if (inputKeycode == "82" && this.isGameEnded) {
        this.gameSet();
        // 問題文の一文字目がrの場合そのまま正解してしまうのを防ぐ
        return;
      }
      //ゲーム中にescが押されたらリスタート
      if (inputKeycode == "27" && this.isGaming) {
        this.isGaming = false;
        this.gameSet();
      }

      if (this.isGaming) {
        if (
          //入力されたキーコードと問題文のキーコードを比較
          inputKeycode == this.mappedKeyCodeElement[this.correct].keycode &&
          this.shiftPushed == this.mappedKeyCodeElement[this.correct].shiftCode
        ) {
          //キーコードが一致した時の処理
          this.correct++;

          //全文字入力したか確認
          if (this.correct == this.typStringsLength) {
            //全文字入力していたら終了時間を記録する
            this.typEnd = new Date();

            //終了時間－開始時間で掛かったミリ秒を取得する
            this.keika = this.typEnd - this.typStart;

            //1000で割って「切捨て」、秒数を取得
            this.sec = Math.floor(this.keika / 1000);

            //1000で割った「余り(%で取得できる）」でミリ秒を取得
            this.msec = this.keika % 1000;

            //問題終了を告げる文字列を作成し表示
            this.fin = "finish ： " + this.sec + " sec " + this.msec + " m ";

            //ゲーム終了
            this.isGameEnded = true;
            this.isGaming = false;
            this.correct = 0;
          }
        } else if ("16" != inputKeycode) {
          if (this.correct !== 0 && !this.isGameEnded) this.missCount++;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/base";

.code {
  text-align: left;
  white-space: pre;
}
code {
  font-family: Menlo, Consolas, "DejaVu Sans Mono", monospace;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
}
.active {
  color: #ffffff;
  background-color: #47d42b;
  outline: 1px solid #40be27;
}
.return {
  margin-right: auto;
}
.return:before {
  content: "\23CE";
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
  opacity: 0.3;
}
</style>

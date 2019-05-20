<template>
  <el-row>
    <sub-header/>
    <el-col :span="24">
      <el-card class="box-card box-card-wrapper">
        <div slot="header">
          <span>add new lesson</span>
        </div>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>language</span>
          </el-col>
          <el-col :span="12">
            <el-input v-model="language" placeholder="language..." clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>source code</span>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="sourceCode"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="New code..."
              clearable
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="24">
            <el-button type="success" @click="addLesson">add</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>lessons</span>
        </div>

        <el-table :data="lessons" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <pre v-highlightjs><code>{{props.row.sourceCode}}</code></pre>
            </template>
          </el-table-column>
          <el-table-column prop="language" label="language"></el-table-column>
          <el-table-column prop="operation" align="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteLesson(scope.row.lessonId)">×</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="startLesson(scope.row.language,scope.row.sourceCode)"
              >lesson</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable no-console */
import SubHeader from "../components/SubHeader.vue";
import firebase from "firebase";
const prettyPrint = require("code-prettify");
export default {
  name: "Lesson",
  components: { SubHeader },
  data() {
    return {
      lessons: [],
      database: firebase.database(),
      lessonId: undefined,
      language: undefined,
      sourceCode: undefined
    };
  },
  created() {
    this.refresh();
  },
  mounted() {
    var vm = this;
    this.$nextTick(function() {
      prettyPrint.prettyPrint();
    });
  },
  methods: {
    refresh: function() {
      let _this = this;
      this.database.ref("lessons").on("value", snapshot => {
        this.lessons = [];
        Object.keys(snapshot.val()).forEach(function(key) {
          _this.lessons.push({
            lessonId: key,
            language: snapshot.val()[key].lessonName,
            sourceCode: snapshot.val()[key].sourceCode
          });
        });
      });
    },
    addLesson: function() {
      try {
        this.database.ref("lessons").push({
          language: this.language,
          sourceCode: this.sourceCode
        });
      } catch {
        this.$message({
          showClose: true,
          message: "Add Lesson Failure!",
          type: "error"
        });
        return;
      }
      this.$message({
        showClose: true,
        message: "Add Lesson Success!",
        type: "success"
      });
      this.language = undefined;
      this.sourceCode = undefined;
    },
    deleteLesson: function(lessonId) {
      let _this = this;
      this.database
        .ref("lessons")
        .child(lessonId)
        .remove(function(error) {
          if (error) {
            _this.$message({
              showClose: true,
              message: "Delete Lesson Failure!",
              type: "error"
            });
          } else {
            _this.$message({
              showClose: true,
              message: "Delete Lesson Success!",
              type: "success"
            });
          }
        });
    },

    startLesson: function(language, sourceCode) {
      // 問題文をローカルに保存してゲームスタート
      localStorage.setItem("language", language);
      localStorage.setItem("sourceCode", sourceCode);
      this.$router.push("/typing");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/base";
</style>
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
            <span>lesson name</span>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="New Name..." clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="row-wrapper">
          <el-col :span="12">
            <span>source code</span>
          </el-col>
          <el-col :span="12">
            <el-input
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
          <el-table-column prop="lessonId" label="lessonID" width="200" align="left"/>
          <el-table-column prop="lessonName" label="lessonName" width="200" align="left"/>
          <el-table-column prop="sourceCode" label="souce code" width="200" align="left"/>
          <el-table-column prop="operation" label width="200" align="left">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteLesson(scope.row.lessonId)">×</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label width="200" align="left">
            <template slot-scope="scope">
              <el-button
                size="medium"
                type="primary"
                @click="startLesson(scope.row.lessonName,scope.row.sourceCode)"
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
import axios from "axios";
import SubHeader from "../components/SubHeader.vue";
import firebase from "firebase";

const database = firebase.database();

export default {
  name: "Lesson",
  components: { SubHeader },
  data() {
    return {
      lessons: [],

      lessonId: undefined,
      lessonName: undefined,
      sourceCode: undefined
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh: function() {
      let lessonArray = [];
      let _this = this;
      database.ref("lessons").on("value", snapshot =>
        Object.keys(snapshot.val()).forEach(function(key) {
          lessonArray[lessonArray.length] = {
            //aa
            lessonId: key,
            lessonName: snapshot.val()[key].lessonName,
            sourceCode: snapshot.val()[key].sourceCode
          };
          _this.lessons = lessonArray;
        })
      );
    },
    addLesson: function() {
      // await axios.post("http://localhost:8080/", this.request);
      // await this.refresh();
      // this.$message({
      //   showClose: true,
      //   message: "Add Lesson Success!",
      //   type: "success"
      // });
      database.ref("lessons").push({
        //aa
        lessonName: this.request.lessonName,
        sourceCode: this.request.sourceCode
      });
    },
    deleteLesson: async function(lessonId) {
      await axios.delete("http://localhost:8080/" + lessonId);
      await this.refresh();
      this.$message({
        showClose: true,
        message: "Delete Code Success!",
        type: "success"
      });
    },
    startLesson: async function(lessonName, sourceCode) {
      // 問題文をローカルに保存してゲームスタート
      localStorage.setItem("lessonName", lessonName);
      localStorage.setItem("sourceCode", sourceCode);
      this.$router.push("/typing");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/base";
</style>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyCodeElement: {
      a: { id: "", char: "a", keycode: 65, shiftCode: 0 },
      b: { id: "", char: "b", keycode: 66, shiftCode: 0 },
      c: { id: "", char: "c", keycode: 67, shiftCode: 0 },
      d: { id: "", char: "d", keycode: 68, shiftCode: 0 },
      e: { id: "", char: "e", keycode: 69, shiftCode: 0 },
      f: { id: "", char: "f", keycode: 70, shiftCode: 0 },
      g: { id: "", char: "g", keycode: 71, shiftCode: 0 },
      h: { id: "", char: "h", keycode: 72, shiftCode: 0 },
      i: { id: "", char: "i", keycode: 73, shiftCode: 0 },
      j: { id: "", char: "j", keycode: 74, shiftCode: 0 },
      k: { id: "", char: "k", keycode: 75, shiftCode: 0 },
      l: { id: "", char: "l", keycode: 76, shiftCode: 0 },
      m: { id: "", char: "m", keycode: 77, shiftCode: 0 },
      n: { id: "", char: "n", keycode: 78, shiftCode: 0 },
      o: { id: "", char: "o", keycode: 79, shiftCode: 0 },
      p: { id: "", char: "p", keycode: 80, shiftCode: 0 },
      q: { id: "", char: "q", keycode: 81, shiftCode: 0 },
      r: { id: "", char: "r", keycode: 82, shiftCode: 0 },
      s: { id: "", char: "s", keycode: 83, shiftCode: 0 },
      t: { id: "", char: "t", keycode: 84, shiftCode: 0 },
      u: { id: "", char: "u", keycode: 85, shiftCode: 0 },
      v: { id: "", char: "v", keycode: 86, shiftCode: 0 },
      w: { id: "", char: "w", keycode: 87, shiftCode: 0 },
      x: { id: "", char: "x", keycode: 88, shiftCode: 0 },
      y: { id: "", char: "y", keycode: 89, shiftCode: 0 },
      z: { id: "", char: "z", keycode: 90, shiftCode: 0 },
      " ": { id: "", char: " ", keycode: 32, shiftCode: 0 },
      "-": { id: "", char: "-", keycode: 189, shiftCode: 0 },
      "=": { id: "", char: "=", keycode: 187, shiftCode: 0 },
      "\\": { id: "", char: "\\", keycode: 220, shiftCode: 0 },
      "`": { id: "", char: "`", keycode: 192, shiftCode: 0 },
      "[": { id: "", char: "[", keycode: 219, shiftCode: 0 },
      "]": { id: "", char: "]", keycode: 221, shiftCode: 0 },
      ";": { id: "", char: ";", keycode: 186, shiftCode: 0 },
      "'": { id: "", char: "'", keycode: 222, shiftCode: 0 },
      ",": { id: "", char: ",", keycode: 188, shiftCode: 0 },
      ".": { id: "", char: ".", keycode: 190, shiftCode: 0 },
      "/": { id: "", char: "/", keycode: 191, shiftCode: 0 },
      "0": { id: "", char: "0", keycode: 48, shiftCode: 0 },
      "1": { id: "", char: "1", keycode: 49, shiftCode: 0 },
      "2": { id: "", char: "2", keycode: 50, shiftCode: 0 },
      "3": { id: "", char: "3", keycode: 51, shiftCode: 0 },
      "4": { id: "", char: "4", keycode: 52, shiftCode: 0 },
      "5": { id: "", char: "5", keycode: 53, shiftCode: 0 },
      "6": { id: "", char: "6", keycode: 54, shiftCode: 0 },
      "7": { id: "", char: "7", keycode: 55, shiftCode: 0 },
      "8": { id: "", char: "8", keycode: 56, shiftCode: 0 },
      "9": { id: "", char: "9", keycode: 57, shiftCode: 0 },
      "↲": { id: "", char: "↲", keycode: 13, shiftCode: 0 },
      A: { id: "", char: "A", keycode: 65, shiftCode: 1 },
      B: { id: "", char: "B", keycode: 66, shiftCode: 1 },
      C: { id: "", char: "C", keycode: 67, shiftCode: 1 },
      D: { id: "", char: "D", keycode: 68, shiftCode: 1 },
      E: { id: "", char: "E", keycode: 69, shiftCode: 1 },
      F: { id: "", char: "F", keycode: 70, shiftCode: 1 },
      G: { id: "", char: "G", keycode: 71, shiftCode: 1 },
      H: { id: "", char: "H", keycode: 72, shiftCode: 1 },
      I: { id: "", char: "I", keycode: 73, shiftCode: 1 },
      J: { id: "", char: "J", keycode: 74, shiftCode: 1 },
      K: { id: "", char: "K", keycode: 75, shiftCode: 1 },
      L: { id: "", char: "L", keycode: 76, shiftCode: 1 },
      M: { id: "", char: "M", keycode: 77, shiftCode: 1 },
      N: { id: "", char: "N", keycode: 78, shiftCode: 1 },
      O: { id: "", char: "O", keycode: 79, shiftCode: 1 },
      P: { id: "", char: "P", keycode: 80, shiftCode: 1 },
      Q: { id: "", char: "Q", keycode: 81, shiftCode: 1 },
      R: { id: "", char: "R", keycode: 82, shiftCode: 1 },
      S: { id: "", char: "S", keycode: 83, shiftCode: 1 },
      T: { id: "", char: "T", keycode: 84, shiftCode: 1 },
      U: { id: "", char: "U", keycode: 85, shiftCode: 1 },
      V: { id: "", char: "V", keycode: 86, shiftCode: 1 },
      W: { id: "", char: "W", keycode: 87, shiftCode: 1 },
      X: { id: "", char: "X", keycode: 88, shiftCode: 1 },
      Y: { id: "", char: "Y", keycode: 89, shiftCode: 1 },
      Z: { id: "", char: "Z", keycode: 90, shiftCode: 1 },
      _: { id: "", char: "_", keycode: 189, shiftCode: 1 },
      "+": { id: "", char: "+", keycode: 187, shiftCode: 1 },
      "|": { id: "", char: "|", keycode: 220, shiftCode: 1 },
      "~": { id: "", char: "~", keycode: 192, shiftCode: 1 },
      "{": { id: "", char: "{", keycode: 219, shiftCode: 1 },
      "}": { id: "", char: "}", keycode: 221, shiftCode: 1 },
      ":": { id: "", char: ":", keycode: 186, shiftCode: 1 },
      '"': { id: "", char: '"', keycode: 222, shiftCode: 1 },
      "<": { id: "", char: "<", keycode: 188, shiftCode: 1 },
      ">": { id: "", char: ">", keycode: 190, shiftCode: 1 },
      "?": { id: "", char: "?", keycode: 191, shiftCode: 1 },
      ")": { id: "", char: ")", keycode: 48, shiftCode: 1 },
      "!": { id: "", char: "!", keycode: 49, shiftCode: 1 },
      "@": { id: "", char: "@", keycode: 50, shiftCode: 1 },
      "#": { id: "", char: "#", keycode: 51, shiftCode: 1 },
      $: { id: "", char: "$", keycode: 52, shiftCode: 1 },
      "%": { id: "", char: "%", keycode: 53, shiftCode: 1 },
      "^": { id: "", char: "^", keycode: 54, shiftCode: 1 },
      "&": { id: "", char: "&", keycode: 55, shiftCode: 1 },
      "*": { id: "", char: "*", keycode: 56, shiftCode: 1 },
      "(": { id: "", char: "(", keycode: 57, shiftCode: 1 }
    },
    mappedKeyCodeElement: [],
    language: ""
  },

  mutations: {
    setSourceCode(state) {
      // 問題文をクリア
      state.mappedKeyCodeElement = [];
      state.language = "";
      state.language = localStorage.getItem("language");
      // 選択されたソースコードを変換
      let sourceCode = localStorage
        .getItem("sourceCode")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#044;/g, ",")
        .replace(/&amp;/g, "&")
        .replace(/\r\n/g, "↲")
        .replace(/(\n|\r)/g, "↲")
        .replace(/\t/g, "    ");
      // 変換したソースコードとkeycodeの対応付け
      for (let i = 0; i < sourceCode.length; i++) {
        let char = sourceCode.charAt(i);

        let toAddId = i;
        let toAddChar = state.keyCodeElement[char].char;
        let toAddKeycode = state.keyCodeElement[char].keycode;
        let toAddShiftCode = state.keyCodeElement[char].shiftCode;
        let toAddObj = {
          id: toAddId,
          char: toAddChar,
          keycode: toAddKeycode,
          shiftCode: toAddShiftCode
        };

        state.mappedKeyCodeElement[
          state.mappedKeyCodeElement.length
        ] = toAddObj;
      }
    }
  },
  actions: {}
});

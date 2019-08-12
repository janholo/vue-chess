<template>
  <div id="app">
    <ChessBoard v-bind:gameState="gameState" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Color, Kind, GameState } from "./types";
import HelloWorld from "./components/HelloWorld.vue";
import ChessField from "./components/ChessField.vue";
import ChessBoard from "./components/ChessBoard.vue";

@Component({
  components: {
    HelloWorld,
    ChessBoard,
    ChessField
  }
})
export default class App extends Vue {
  gameState: GameState = {
    timerWhite: 0,
    timerBlack: 0,
    takenPieces: [],
    fields: [
      { background: Color.White, name: "A8", piece: {color: Color.Black, kind: Kind.King }},
      { background: Color.Black, name: "A7", piece: {color: Color.Black, kind: Kind.Queen }},
      { background: Color.White, name: "A6", piece: undefined},
      { background: Color.Black, name: "A5", piece: undefined},
      { background: Color.White, name: "A4", piece: {color: Color.Black, kind: Kind.Rook }},
      { background: Color.Black, name: "A3", piece: {color: Color.Black, kind: Kind.Bishop }},
      { background: Color.White, name: "A2", piece: {color: Color.Black, kind: Kind.Knight }},
      { background: Color.Black, name: "A1", piece: {color: Color.Black, kind: Kind.Pawn }},
    ],
    turn: Color.White
  };
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

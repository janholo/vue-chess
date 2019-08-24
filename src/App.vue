<template>
  <div id="app">
    <ChessBoard v-bind:gameState="gameState" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Color, Kind, GameState } from "./types";
import { ChessHelper } from "./chess"
import HelloWorld from "./components/HelloWorld.vue";
import ChessField from "./components/ChessField.vue";
import ChessBoard from "./components/ChessBoard.vue";
import ChessPiece from './components/ChessPiece.vue';

@Component({
  components: {
    HelloWorld,
    ChessBoard,
    ChessField,
    ChessPiece,
  }
})
export default class App extends Vue {
  chessHelper = new ChessHelper();
  gameState: GameState = {
    timerWhite: 125,
    timerBlack: 99,
    takenPieces: [ ],
    selectedPiece: -1,
    possibleMoves: [ ],
    fields: this.chessHelper.getInitialBoard(),
    turn: Color.White
  };
}
</script>

<style lang="scss">
@import "./_variables.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
}

body {background-color: $background}
</style>

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
  gameState: GameState = new GameState(this.chessHelper.getInitialBoard());
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

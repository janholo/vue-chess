<template>
  <div id="app">
    <ChessBoard class="chess-board" v-bind:gameState="gameState" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Color, Kind, GameState } from "./types";
import { ChessHelpers } from "./chessHelpers"
import ChessField from "./components/ChessField.vue";
import ChessBoard from "./components/ChessBoard.vue";
import ChessPiece from './components/ChessPiece.vue';

@Component({
  components: {
    ChessBoard,
    ChessField,
    ChessPiece,
  }
})
export default class App extends Vue {
  chessHelper = new ChessHelpers();
  gameState: GameState = new GameState(this.chessHelper.getInitialBoard());
}
</script>

<style lang="scss">
@import "./_variables.scss";

body {
  background-color: $background;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#app {
  display: grid;
  place-items: center;
}

.chess-board {
  width: 95vmin;
  max-width: 35rem;
}

</style>

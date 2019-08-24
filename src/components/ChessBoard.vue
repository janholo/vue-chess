<template>
  <div>
    <div class="border">
      <div class="info-grid">
        <div class="info-text shadow">{{whiteTime()}}</div>
        <ChessPiece
          v-for="(p, k) in whiteTakenPieces()"
          v-bind:key="k"
          v-bind:piece="p.piece"
          v-bind:style="{ gridColumn: p.column, gridRow: 1 }"
        />
      </div>
    </div>
    <div class="border">
      <div class="board shadow">
        <ChessField
          v-for="(p, k) in gameState.fields"
          v-bind:key="k"
          v-bind:field="p"
          v-bind:possible="gameState.possibleMoves.includes(k)"
          v-bind:selected="k === gameState.selectedPiece"
          v-bind:clickable="isClickable(k)"
          v-on:click.native="onClick(k)"
        />
      </div>
    </div>
    <div class="border">
      <div class="info-grid">
        <div class="info-text shadow">{{blackTime()}}</div>
        <ChessPiece
          v-for="(p, k) in blackTakenPieces()"
          v-bind:key="k"
          v-bind:piece="p.piece"
          v-bind:style="{ gridColumn: p.column, gridRow: 1 }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Color, Kind, GameState, Piece } from "@/types";
import ChessField from "./ChessField.vue";
import ChessPiece from "./ChessPiece.vue";
import { ChessHelper } from '@/chess';

@Component({
  components: {
    ChessField,
    ChessPiece
  }
})
export default class ChessBoard extends Vue {
  @Prop() private gameState!: GameState;
  chessHelper = new ChessHelper();
  whiteTakenPieces() {
    let whitePieces = this.gameState.takenPieces.filter(p => p.color == Color.White);
    return whitePieces.map((p, i) => {
      return { column: 18-i, piece: p };
    });
  }
  blackTakenPieces() {
    let whitePieces = this.gameState.takenPieces.filter(p => p.color == Color.Black);
    return whitePieces.map((p, i) => {
      return { column: 18-i, piece: p };
    });
  }
  whiteTime() {
    return this.timeDisplay(this.gameState.timerWhite);
  }
  blackTime() {
    return this.timeDisplay(this.gameState.timerBlack);
  }
  timeDisplay(time: number) {
    let minutes = time % 60;
    let seconds = Math.round(time / 60);
    return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
  }
  onClick(id: number) {
    this.chessHelper.clickField(id, this.gameState);
    
  }
  isClickable(id: number) {
    if(id === this.gameState.selectedPiece) {
      return true;
    }

    if(this.gameState.selectedPiece != -1 && this.gameState.possibleMoves.includes(id))
    {
      return true;
    }

    if(this.gameState.fields[id].piece as Piece) {
      return (this.gameState.fields[id].piece as Piece).color == this.gameState.turn;
    }
    
    return false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../_variables.scss";

.board {
  background: pink;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.border {
  padding: 0.5%;
}

.info-grid {
  display: grid;
  grid-template-columns: 3.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.info-text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  background: $bg-timer;
  color: $color-timer;
}

.shadow {
  box-shadow: 2px 2px 5px black;
}
</style>

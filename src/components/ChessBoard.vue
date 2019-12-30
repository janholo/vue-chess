<template>
  <div>
    <div class="border">
      <div class="info-grid">
        <button v-on:click="onClickMove()" :disabled="!isBlackTurn() || isThinking()" class="move-button shadow">{{isThinking() ? "Thinking" : "Move"}}</button>
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
        <div class="info-text shadow">{{whiteTime()}}</div>
        <ChessPiece
          v-for="(p, k) in blackTakenPieces()"
          v-bind:key="k"
          v-bind:piece="p.piece"
          v-bind:style="{ gridColumn: p.column, gridRow: 1 }"
        />
      </div>
    </div>
    <div v-if="IsDraw() || IsWhiteWin() || IsBlackWin()" class="modal">
       <div class="modal-content">
        <span class="close" v-on:click="CloseModal()">&times;</span>
        <p v-if="IsDraw()">Game ended in a DRAW.</p>
        <p v-if="IsWhiteWin()">White WIN</p>
        <p v-if="IsBlackWin()">Black WIN</p>
        <p>Reload the site to start a new game</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Color, Kind, GameState, Piece, GameResult } from "@/types";
import ChessField from "./ChessField.vue";
import ChessPiece from "./ChessPiece.vue";
import { ChessHelpers } from "@/chessHelpers";

@Component({
  components: {
    ChessField,
    ChessPiece
  }
})
export default class ChessBoard extends Vue {
  @Prop() private gameState!: GameState;
  chessHelper = new ChessHelpers();
  gameResult: GameResult = GameResult.Pending;
  IsDraw() {
    return this.gameResult == GameResult.Draw;
  }
  isBlackTurn() {
    return this.gameState.turn === Color.Black;
  }
  isThinking() {
    return this.gameState.isThinking;
  }
  IsWhiteWin() {
    return this.gameResult == GameResult.WhiteWin;
  }
  IsBlackWin() {
    return this.gameResult == GameResult.BlackWin;
  }
  CloseModal() {
    this.gameResult = GameResult.Pending;
  }
  whiteTakenPieces() {
    let whitePieces = this.gameState.takenPieces.filter(
      p => p.color == Color.White
    );
    return whitePieces.map((p, i) => {
      return { column: 18 - i, piece: p };
    });
  }
  blackTakenPieces() {
    let whitePieces = this.gameState.takenPieces.filter(
      p => p.color == Color.Black
    );
    return whitePieces.map((p, i) => {
      return { column: 18 - i, piece: p };
    });
  }
  whiteTime() {
    return this.timeDisplay(this.gameState.timerWhite);
  }
  blackTime() {
    return this.timeDisplay(this.gameState.timerBlack);
  }
  timeDisplay(time: number) {
    let seconds = time % 60;
    let minutes = Math.round(time / 60);
    return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
  }
  onClick(id: number) {
    this.gameResult = this.chessHelper.clickField(id, this.gameState);
  }
  onClickMove() {
    this.gameState.isThinking = true;
    this.gameResult = this.chessHelper.startBackgroundAi(this.gameState);
    this.gameState.isThinking = false;
  }
  isClickable(id: number) {
    if (id === this.gameState.selectedPiece) {
      return true;
    }

    if (
      this.gameState.selectedPiece != -1 &&
      this.gameState.possibleMoves.includes(id)
    ) {
      return true;
    }

    if (this.gameState.fields[id].piece as Piece) {
      return (
        (this.gameState.fields[id].piece as Piece).color == this.gameState.turn
      );
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
  font-size: 3vmin;
  background: $bg-timer;
  color: $color-timer;
}

.shadow {
  box-shadow: 2px 2px 5px black;
}

.move-button {
  font-size: 3vmin;
  border-style: none;
  padding: 0;
  margin: 0;
  transition: transform 0.1s;
}

.move-button:active {
  transform: translateX(0.2vmin) translateY(0.2vmin)
}

.move-button:disabled {
  background-color: grey;
}

 /* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 40% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 60%; /* Could be more or less, depending on screen size */
  height: 10%;
}

.modal-content p {
  font-size: 2vh;
  font-weight: bold;
  text-align: center;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
} 
</style>

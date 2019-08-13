<template>
  <div class="figure" v-bind:class="{ white: IsWhiteBackground() }">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 45 45">
      <!-- <text x="22.5" y="32" font-size="25" text-anchor=middle v-bind:fill="IsWhiteBackground() ? '#e6e6e6' : '#999999'" v-bind:stroke="IsWhiteBackground() ? '#e6e6e6' : '#999999'" >{{field.name}}</text> -->
      <text
        x="1"
        y="10"
        font-size="12"
        v-bind:fill="IsWhiteBackground() ? '#e6e6e6' : '#999999'"
        v-bind:stroke="IsWhiteBackground() ? '#e6e6e6' : '#999999'"
      >{{field.name}}</text>
    </svg>
    <ChessPiece v-bind:piece="field.piece" class="fixed-pos" selectable="true" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Kind, Color, Field } from "@/types";
import ChessPiece from "./ChessPiece.vue";

@Component({
  components: {
    ChessPiece
  }
})
export default class ChessField extends Vue {
  @Prop() private field!: Field;

  IsWhiteBackground() {
    return this.field.background == Color.White;
  }

  IsBlack() {
    return (
      this.field.piece != undefined && this.field.piece.color == Color.Black
    );
  }
  IsWhite() {
    return (
      this.field.piece != undefined && this.field.piece.color == Color.White
    );
  }
  IsKing() {
    return this.field.piece != undefined && this.field.piece.kind == Kind.King;
  }
  IsQueen() {
    return this.field.piece != undefined && this.field.piece.kind == Kind.Queen;
  }
  IsBishop() {
    return (
      this.field.piece != undefined && this.field.piece.kind == Kind.Bishop
    );
  }
  IsRook() {
    return this.field.piece != undefined && this.field.piece.kind == Kind.Rook;
  }
  IsPawn() {
    return this.field.piece != undefined && this.field.piece.kind == Kind.Pawn;
  }
  IsKnight() {
    return (
      this.field.piece != undefined && this.field.piece.kind == Kind.Knight
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.figure {
  background: gray;
  position: relative;
}

.white {
  background: white;
}

.fixed-pos {
  left: 0;
  top: 0;
  position: absolute;
}
</style>

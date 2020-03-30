<template>
  <div class="figure" v-bind:class="{ white: IsWhiteBackground(), 'is-clickable': clickable }">
    <svg class="display-block" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 45 45">
      <text
        x="1"
        y="10"
        font-size="12"
        class="unselectable"
        v-bind:class="{ 'text-color-white': IsWhiteBackground(), 'text-color-black': !IsWhiteBackground() }"
      >{{fieldInfo.name}}</text>
    </svg>
    <ChessPiece v-bind:piece="field" v-bind:isShadow="isShadow" class="fixed-pos" v-bind:selected="selected" />
    <svg v-if="possible && IsEmpty()" class="fixed-pos" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 45 45">
      <circle cx="22.5" cy="22.5" r="7" class="move-possible"/>
    </svg>
    <svg v-if="possible && !IsEmpty()" class="fixed-pos" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 45 45">
      <rect x="1.8" y="-30" width="60" height="60" style="fill:transparent;stroke-width:11px" class="move-possible-rect" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ChessPiece from "./ChessPiece.vue";
import { is_same_color, Piece, Color } from "rust-chess";
import { FieldInfo } from '@/wasmWrapper';

@Component({
  components: {
    ChessPiece
  }
})
export default class ChessField extends Vue {
  @Prop() private fieldInfo!: FieldInfo;
  @Prop() private field!: Piece;
  @Prop() private isShadow!: boolean;
  @Prop() private selected!: boolean;
  @Prop() private possible!: boolean;
  @Prop() private clickable!: boolean;
  IsWhiteBackground() {
    return this.fieldInfo.background == Color.Black;
  }
  IsWhitePiece() {
    return is_same_color(this.field, Color.White);
  }
  IsEmpty() {
    return this.field == Piece.Empty;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../_variables.scss";
.figure {
  background: $black-field;
  position: relative;
}

.is-clickable {
  cursor: pointer;
}

.display-block {
  display: block;
}

.unselectable {
  user-select: none;
}

.white {
  background: $white-field;
}

.move-possible {
  fill: $figure-selected;
}

.move-possible-rect {
  stroke: $figure-selected;
  transform: rotate(45deg);
}

.text-color-white {
  fill: $white-field-text;
  stroke: $white-field-text;
}

.text-color-black {
  fill: $black-field-text;
  stroke: $black-field-text;
}

.fixed-pos {
  left: 0;
  top: 0;
  position: absolute;
}
</style>

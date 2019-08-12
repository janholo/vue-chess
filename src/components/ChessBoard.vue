<template>
  <div class="board">
    <template v-for="(p, k) in gameState.fields">
      <ChessField
        v-bind:key="k"
        v-bind:field="p"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Color, Kind, GameState } from "@/types";
import ChessField from "./ChessField.vue";

@Component({
  components: {
    ChessField
  }
})
export default class ChessBoard extends Vue {
  @Prop() private gameState!: GameState;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  grid-template-rows: auto auto auto auto auto auto auto auto;
}
</style>

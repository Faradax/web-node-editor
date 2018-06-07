<template>
    <div class="i" @mouseup="mouseUp">
        <span class="input-mark"></span> {{ socketName }}
    </div>
</template>

<script lang="ts">
import eventBus from "../EventBus.js";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class InputSocket extends Vue {
  public readonly anchor: any = {
    x: 0,
    y: 0
  };

  @Prop() private socketName!: string;

  public recalculateAnchor() {
    this.anchor.x = this.clientPosition().x;
    this.anchor.y = this.clientPosition().y;
  }

  private mouseUp() {
    eventBus.$emit("connection-finish", this);
  }

  private clientPosition(): { x: number; y: number } {
    const bounds = this.$el
      .querySelector(".input-mark")!
      .getBoundingClientRect();
    let x = bounds.left;
    let y = bounds.top;
    x += bounds.width / 2;
    y += bounds.height / 2;
    return { x, y };
  }
}
</script>

<style>
</style>

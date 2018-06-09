<template>
    <div class="i" @mouseup="mouseUp">
        <span class="input-mark"></span> {{ socket.label }}
    </div>
</template>

<script lang="ts">
import eventBus from "../EventBus.js";

import Socket from "../model/Socket";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class InputSocket extends Vue {
  public readonly anchor: any = {
    x: 0,
    y: 0
  };

  public markedForDeletion: boolean = false;

  @Prop() private socket!: Socket;

  public mounted() {
    eventBus.$emit("socket-mounted", this.socket.id, this);
  }

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

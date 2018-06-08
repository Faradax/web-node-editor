<template>
    <div>
        <div class="o">
            {{ socket.label }} 
            <span class="input-mark" style="position: relative" @mousedown="startDrag">
                <div style="position: absolute" :style="tempConnectionStyle">
                </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import eventBus from "../EventBus.js";

import Socket from "../model/Socket";

import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class OutputSocket extends Vue {
  public readonly anchor: any = {
    x: 0,
    y: 0
  };

  @Prop() private socket!: Socket;

  public mounted() {
    eventBus.$emit("socket-mounted", this.socket.id, this);
  }

  public recalculateAnchor() {
    this.anchor.x = this.clientPosition().x;
    this.anchor.y = this.clientPosition().y;
  }

  private startDrag() {
    eventBus.$emit("connection", this);
  }

  private clientPosition() {
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
.o {
  user-select: none;
}

connection {
  z-index: -2;
}
</style>

<template>
    <div>
        <div class="o">
            {{ socketName }} 
            <span class="input-mark" style="position: relative" @mousedown="startDrag">
                <div style="position: absolute" :style="tempConnectionStyle">
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import eventBus from "../EventBus.js";

export default {
  name: "OutputSocket",
  props: ["socketName"],
  data: function() {
    return {
      anchor: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    startDrag() {
      eventBus.$emit("connection", this);
    },
    clientPosition() {
      const bounds = this.$el
        .querySelector(".input-mark")
        .getBoundingClientRect();
      let x = bounds.x;
      let y = bounds.y;
      x += bounds.width / 2;
      y += bounds.height / 2;
      return { x: x, y: y };
    },
    recalculateAnchor() {
      this.anchor.x = this.clientPosition().x;
      this.anchor.y = this.clientPosition().y;
    }
  }
};
</script>

<style>
.o {
  user-select: none;
}

connection {
  z-index: -2;
}
</style>

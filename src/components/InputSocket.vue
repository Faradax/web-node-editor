<template>
    <div class="i" @mouseup="mouseUp">
        <span class="input-mark"></span> {{ socketName }}
    </div>
</template>

<script>
import eventBus from "../EventBus.js";

export default {
  name: "InputSocket",
  props: ["socketName"],
  methods: {
    mouseUp() {
      eventBus.$emit("connection-finish", this);
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
    }
  }
};
</script>

<style>
</style>

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
import eventBus from '../EventBus.js';

export default {
  name: "OutputSocket",
  props: ["socketName"],
  data: function() {
    return {
      tempConnectionStyle: {
        left: "0px",
        top: "0px",
        height: "0px",
        width: "0px"
      }
    };
  },
  methods: {
    startDrag() {

      eventBus.$emit("connection", this);

      document.onmousemove = this.drawConnection;
      document.onmouseup = () => {
        this.tempConnectionStyle = 
        {
          left: "0px",
          top: "0px",
          height: "0px",
          width: "0px"
        };
        document.onmousemove = null;
      };
    },

    drawConnection() {
      const bounds = this.$el
        .querySelector(".input-mark")
        .getBoundingClientRect();
      let x = bounds.x;
      let y = bounds.y;
      x += bounds.width / 2;
      y += bounds.height / 2;
      this.tempConnectionStyle.left = (bounds.width / 2) + "px"
      this.tempConnectionStyle.top = (bounds.height / 2) + "px"
      let targetX = event.clientX;
      let targetY = event.clientY;
      this.tempConnectionStyle.width = targetX - x + "px";
      this.tempConnectionStyle.height = targetY - y + "px";
    },

    clientPosition() {
            const bounds = this.$el
        .querySelector(".input-mark")
        .getBoundingClientRect();
      let x = bounds.x;
      let y = bounds.y;
      x += bounds.width / 2;
      y += bounds.height / 2;
      return {x: x, y: y};
    }
  }
};
</script>

<style>
.o {
  user-select: none;
}

connection {
    z-index: -2
}
</style>

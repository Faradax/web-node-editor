<template>
    <div>
        <div class="o">
            {{ socketName }} 
            <span class="input-mark" style="position: relative" @mousedown="startDrag">
                <div style="position: absolute" :style="tempConnectionStyle">
                    <connection></connection>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import Connection from "./Connection.vue";

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
      document.onmousemove = this.drawConnection;
      document.onmouseup = () => {
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
    }
  },
  components: {
    Connection
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

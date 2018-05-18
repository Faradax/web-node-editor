<template>
    <div 
        class="graph-node"
        v-bind:style="pos">
        <div 
            class="name"         
            @mousedown="startMove">
            {{ graphNodeData.name }}
        </div>
        <div class="io">
            <div class="inputs">
                    <div class="i" v-for="input in graphNodeData.inputs" :key="input.id">
                        <span class="input-mark"></span> {{ input.label }}
                    </div>
            </div>
            <div class="outputs">
                    <div class="o" v-for="output in graphNodeData.outputs" :key="output.id">
                        {{ output.label }} <span class="input-mark"></span>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "GraphNode",
  data() {
    return {
      dragState: {
        startX: 0,
        startY: 0,
        posX: 0,
        posY: 0
      },
      pos: {
        left: "0",
        top: "0"
      },
      graphNodeData: {
        name: "grayscale",
        inputs: [
          {
            id: 1,
            label: "color"
          },
          {
            id: 2,
            label: "factor"
          }
        ],
        outputs: [
          {
            id: 1,
            label: "color"
          }
        ]
      }
    };
  },
  methods: {
    startMove(event) {
      event = event || window.event;
      // get the mouse cursor position at startup:
      this.dragState.startX = event.clientX - this.dragState.posX;
      this.dragState.startY = event.clientY - this.dragState.posY;
      document.onmousemove = this.doMove;
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    },

    doMove(event) {
      event = event || window.event;
      this.dragState.posX = event.clientX - this.dragState.startX;
      this.dragState.posY = event.clientY - this.dragState.startY;
      this.pos.left = this.dragState.posX + "px";
      this.pos.top = this.dragState.posY + "px";
    }
  }
};
</script>

<style>
.graph-node {
  position: absolute;
  background-color: #454565;
  color: white;
  padding: 0.2em;
  border: 1px solid #404050;
  border-radius: 4px;
  font-family: "Source Sans Pro", "lato", sans-serif;
}

.name {
  border-bottom: 1px solid white;
  cursor: move;
  user-select: none;
  font-variant-caps: small-caps;
  font-size: 1.1rem;
}

.io {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.i,
.o {
  position: relative;
  padding: 0.3em;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.i {
  left: -14px;
}
.o {
    right: -14px;
}

.input-mark {
  display: inline-block;
  width: 12px;
  height: 12px;

  background-color: lightgray;
  border: 1px solid black;
  border-radius: 50%;
  box-sizing: border-box;
}

.i .input-mark {
    margin-right: 6px;
}

.o .input-mark {
    margin-left: 6px;
}

.i:hover .input-mark {
  background-color: yellow;
}

table {
  border: 1px solid red;
}

td {
  border: 1px solid red;
}
</style>
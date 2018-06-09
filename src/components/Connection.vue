<template>
    <path vector-effect="non-scaling-stroke" :d="calcPath" :class="{'temp': temp, 'marked-for-deletion': marked}"/>
</template>

<script lang="ts">
import OutputSocket from "./OutputSocket.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import InputSocket from "./InputSocket.vue";

@Component({})
export default class Connection extends Vue {
  @Prop() private start!: {x: number, y: number};
  @Prop() private end!: {x: number, y: number};
  @Prop() private temp = false;
  @Prop() private marked = false;

  get calcPath() {
    const start = this.start;
    const end = this.end instanceof InputSocket ? this.end : this.end;
    const anchorX = start.x + (end.x - start.x) / 2;
    return `M ${start.x},${start.y} C ${anchorX},${start.y} ${anchorX},${
      end.y
    } ${end.x},${end.y}`;
  }
}
</script>

<style>
path {
  fill: none;
  stroke: #000000;
  stroke-width: 3px;
  stroke-linecap: round;
}

path.temp {
  stroke: #000000;
  stroke-dasharray: 5, 5;
}

@keyframes blink {
  0% { opacity: 1; }
  100% { opacity: 0.3; }
}

path.marked-for-deletion {
  stroke: #ff0000;
  animation: blink alternate 300ms infinite;
}
</style>

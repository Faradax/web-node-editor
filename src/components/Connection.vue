<template>
    <path vector-effect="non-scaling-stroke" :d="calcPath"/>
</template>

<script lang="ts">
import OutputSocket from "./OutputSocket.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import InputSocket from "./InputSocket.vue";

@Component({})
export default class Connection extends Vue {
  @Prop() private start!: {x: number, y: number};
  @Prop() private end!: {x: number, y: number};

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
</style>

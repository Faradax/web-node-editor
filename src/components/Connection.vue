<template>
    <path vector-effect="non-scaling-stroke" :d="calcPath()"/>
</template>

<script>
export default {
  name: "Connection",
  props: ["start", "end"],
  methods: {
    calcPath() {
      const start = this.start;
      const end = this.end;
      const anchorX = start.x + (end.x - start.x) / 2;
      return `M ${start.x},${start.y} C ${anchorX},${start.y} ${anchorX},${end.y} ${end.x},${end.y}`;
    }
  }
};
</script>

<style>
</style>

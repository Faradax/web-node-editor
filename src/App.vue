<template>
  <div id="app">
    <graph-node></graph-node>
    <graph-node></graph-node>
    <graph-node></graph-node>
    <graph-node></graph-node>
  </div>
</template>

<script>
import GraphNode from './components/GraphNode.vue'

export default {
  name: 'app',
  components: {
    GraphNode
  }
}
</script>

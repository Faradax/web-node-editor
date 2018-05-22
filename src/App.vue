<template>
  <div id="app">
    <graph-node></graph-node>
    <graph-node></graph-node>
    <graph-node></graph-node>
    <graph-node></graph-node>
    <connection>
    </connection>
  </div>
</template>

<script>
import GraphNode from './components/GraphNode.vue'
import Connection from './components/Connection.vue'

export default {
  name: 'app',
  components: {
    GraphNode,
    Connection
  }
}
</script>

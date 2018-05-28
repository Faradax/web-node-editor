<template>
  <div id="app">
    <node-editor></node-editor>
    <graph-node></graph-node>
    <graph-node></graph-node>
    <graph-node></graph-node>
    <graph-node></graph-node>
  </div>
</template>

<script>
import GraphNode from './components/GraphNode.vue'
import NodeEditor from './components/NodeEditor.vue'

export default {
  name: 'app',
  components: {
    NodeEditor,
    GraphNode
  }
}
</script>

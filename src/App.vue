<template>
  <div id="app">
    <node-editor></node-editor>
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

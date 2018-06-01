<template>
    <div class="editor">
        <div class="connection-pane">
            <svg width="100%" height="100%"
                preserveAspectRatio="none"
                >
                <connection v-for="connection in connections" :key="connection.id"
                    :start="connection.start.anchor" :end="connection.end.anchor"/>
            </svg>
        </div>
        <div class="node-pane">
            <graph-node v-for="graphNode in graphModel.roots" 
                :graph-node="graphNode" 
                :key="graphNode.name"
                >
            </graph-node>
        </div>
    </div>
</template>

<script>
import eventBus from "../EventBus.js";
import Connection from "./Connection.vue";
import GraphNode from "./GraphNode.vue";

var graphModel = {
  roots: [
    {
      name: "sth",
      inputs: [],
      outputs: [
        {
          label: "color",
          type: "rgb"
        }
      ]
    }
  ]
};

export default {
  data: function() {
    return {
      graphModel: graphModel,
      connectionsId: 0,
      connectionStart: null,
      connections: []
    };
  },
  methods: {
    startConnection(outputSocket) {
      this.connectionStart = outputSocket;
    },
    finishConnection(inputSocket) {
      if (this.connectionStart) {
        console.log(
          "connected " +
            this.connectionStart.socketName +
            " to " +
            inputSocket.socketName
        );
        this.connections.push({
          id: this.connectionsId++,
          start: this.connectionStart,
          end: inputSocket
        });
      }
    }
  },
  computed: {
    nodes() {
      return graphModel.roots;
    }
  },
  watches: {
    connections() {
      console.log("blub");
    }
  },
  mounted() {
    eventBus.$on("connection", this.startConnection);
    eventBus.$on("connection-finish", this.finishConnection);
  },
  components: {
    Connection,
    GraphNode
  }
};
</script>

<style>
svg {
  overflow: visible;
}

svg path {
  fill: none;
  stroke: #000000;
  stroke-width: 3px;
  stroke-linecap: round;
}
</style>

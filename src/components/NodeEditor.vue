<template>
    <div class="editor">
        <div class="connection-pane">
            <svg width="100%" height="100%"
                preserveAspectRatio="none"
                >
                <connection v-for="connection in graphModel.connections" :key="connection.id"
                    :start="connection.start.anchor" :end="connection.end.anchor"/>
                <connection v-if="connectionEnd" :start="connectionStart.anchor" :end="connectionEnd"></connection>
            </svg>
        </div>
        <div class="node-pane">
            <graph-node v-for="graphNode in graphModel.nodes"
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

// TODO: Builder / Interface
var graphModel = {
  nodes: [
    {
      name: "sth",
      inputs: [],
      outputs: [
        {
          label: "color",
          type: "rgb"
        }
      ]
    },
    {
      name: "passes",
      inputs: [],
      outputs: [
        {
          label: "out",
          type: "rgb"
        }
      ]
    },
    {
      name: "render",
      outputs: [],
      inputs: [
        {
          label: "color",
          type: "rgb"
        }
      ]
    }
  ],
  connections: []
};

export default {
  data: function() {
    return {
      graphModel: graphModel,
      connectionsId: 0,
      connectionStart: null,
      connectionEnd: null
    };
  },
  methods: {
    drawConnection(outputSocket) {
      this.connectionStart = outputSocket;
      document.onmousemove = function() {
        this.connectionEnd = {
          x: event.clientX,
          y: event.clientY
        }
      }.bind(this);
      document.onmouseup = () => {
        this.tempConnectionStyle = {
          left: "0px",
          top: "0px",
          height: "0px",
          width: "0px"
        };
        document.onmousemove = null;
        this.connectionStart =null;
        this.connectionEnd = null;
      };
    },
    finishConnection(inputSocket) {
      if (this.connectionStart) {
        console.log(
          "connected " +
            this.connectionStart.socketName +
            " to " +
            inputSocket.socketName
        );
        let existingConnection = this.graphModel.connections.find(
          connection => {
            return connection.end == inputSocket;
          }
        );
        this.graphModel.connections = this.graphModel.connections.filter(
          item => item !== existingConnection
        );
        this.graphModel.connections.push({
          id: this.connectionsId++,
          start: this.connectionStart,
          end: inputSocket
        });
      }
    }
  },
  mounted() {
    eventBus.$on("connection", this.drawConnection);
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

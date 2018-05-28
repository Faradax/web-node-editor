<template>
    <div class="editor">
        <div class="connection-pane"></div>
        <div class="node-pane">
            <svg width="100%" height="100%"
                preserveAspectRatio="none"
                >
                <path v-for="connection in connections" :key="connection.id"
                    vector-effect="non-scaling-stroke" :d="calcPath(connection)"/>
            </svg>
        </div>
    </div>
</template>

<script>
import eventBus from "../EventBus.js";

export default {
  data: function() {
    return {
      connectionsId: 0,
      connectionStart: null,
      connections: []
    };
  },
  methods: {
    startConnection(outputSocket) {
      this.connectionStart = outputSocket;
    },
    calcPath(connection) {
        const start = connection.start.clientPosition();
        const end = connection.end.clientPosition();
        const anchorX = start.x + ((end.x - start.x) / 2);
        return `M ${start.x},${start.y} C ${anchorX},${start.y} ${anchorX},${end.y} ${end.x},${end.y}`
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
  watches: {
    connections() {
      console.log("blub");
    }
  },
  mounted() {
    eventBus.$on("connection", this.startConnection);
    eventBus.$on("connection-finish", this.finishConnection);
    eventBus.$on("node-move", function() { this.$forceUpdate(); }.bind(this));
  }
};
</script>

<style>
svg {
    overflow: visible;
}

svg path {
    fill:none;
    stroke:#000000;
    stroke-width:3px;
    stroke-linecap:round;
}
</style>

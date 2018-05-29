<template>
    <div class="editor">
        <div class="connection-pane"></div>
        <div class="node-pane">
            <svg width="100%" height="100%"
                preserveAspectRatio="none"
                >
                <connection v-for="connection in connections" :key="connection.id"
                    :start="connection.start.anchor" :end="connection.end.anchor"/>
            </svg>
        </div>
    </div>
</template>

<script>
import eventBus from "../EventBus.js";
import Connection from "./Connection.vue";

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
  },
  components: {
    Connection
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

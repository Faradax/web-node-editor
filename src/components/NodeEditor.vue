<template>
    <div class="editor">
        <div class="connection-pane">
            <svg width="100%" height="100%"
                preserveAspectRatio="none"
                >
                <connection v-for="connection in graphModel.connections" :key="connection.id"
                    :start="componentForSocket(connection.start).anchor" :end="componentForSocket(connection.end).anchor"/>
                <connection v-if="connectionEnd" :start="connectionStart.anchor" :end="connectionEnd.anchor" stroke-dasharray="5,5"></connection>
            </svg>
        </div>
        <div class="node-pane">
            <graph-node v-for="graphNode in nodes"
                :graph-node="graphNode" 
                :key="graphNode.name"
                >
            </graph-node>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import eventBus from "../EventBus.js";

import Connection from "./Connection.vue";
import GraphNode from "./GraphNode.vue";
import OutputSocket from "./OutputSocket.vue";
import InputSocket from "./InputSocket.vue";

import Graph from "../model/Graph";
import Node from "../model/Node";
import Socket from "../model/Socket";

@Component({
  components: {
    Connection,
    GraphNode
  }
})
export default class NodeEditor extends Vue {

  private graphModel: Graph = (() => {
    const graph = new Graph();
    graph.addNode(this.mockNode());
    graph.addNode(this.mockNode());
    graph.addNode(this.mockNode());
    graph.addNode(this.mockNode());
    return graph;
  })();
  private tempConnectionStyle: any = {};
  private connectionsId = 0;
  private connectionStart: OutputSocket | null = null;
  private connectionEnd: { anchor: { x?: number; y?: number } } | null = null;
  private socketMap: Map<number, InputSocket | OutputSocket> = new Map();

  get nodes() {
    return [...this.graphModel.nodes];
  }

  get sockets(): Socket[] {
    let sockets: Socket[] = [];
    [...this.graphModel.nodes].forEach(
      it => (sockets = sockets.concat(it.inputs).concat(it.outputs))
    );
    return sockets;
  }

  private created() {
    eventBus.$on("connection", this.startTempConnectionFrom);
    eventBus.$on("connection-finish", this.finishConnection);

    eventBus.$on("socket-mounted", this.registerSocketInMap);
  }

  private mockNode() {
    const node = new Node("something");
    node.inputs.push(new Socket("input"));
    node.outputs.push(new Socket("output"));
    return node;
  }

  private registerSocketInMap(
    id: number,
    component: InputSocket | OutputSocket
  ) {
    this.socketMap.set(id, component);
  }

  private socketForComponent(component: InputSocket | OutputSocket): Socket {
    const socketId = [...this.socketMap].find(pair => {
      return pair[1] === component;
    })![0];
    return this.sockets.find(it => it.id === socketId)!;
  }

  private componentForSocket(socket: Socket): InputSocket | OutputSocket {
    return this.socketMap.get(socket.id)!;
  }

  private startTempConnectionFrom(outputSocket: OutputSocket) {
    this.connectionStart = outputSocket;
    document.onmousemove = (event: MouseEvent) => {
      if (!event) {
        return;
      }
      this.connectionEnd = {
        anchor: {
          x: event.clientX,
          y: event.clientY
        }
      };
    };
    document.onmouseup = (event: MouseEvent) => {
      this.tempConnectionStyle = {
        left: "0px",
        top: "0px",
        height: "0px",
        width: "0px"
      };
      document.onmousemove = null;
      this.connectionStart = null;
      this.connectionEnd = null;
    };
  }

  private finishConnection(inputSocket: InputSocket) {
    if (this.connectionStart) {
      const startSocket = this.socketForComponent(this.connectionStart);
      const endSocket = this.socketForComponent(inputSocket);
      console.log("connecting", startSocket, endSocket);
      this.graphModel.connectSockets(startSocket, endSocket);
      this.connectionStart = null;
    }
  }
}
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

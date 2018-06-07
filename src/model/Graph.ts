import Connection from "./Connection";
import Node from "./Node";
import Socket from "./Socket";

export default class Graph {
    public nodes = new Set<Node>();
    public connections: Connection[] = [];

    private connectionsId = 0;

    public addNode(node: Node): void {
        this.nodes.add(node);
    }

    public removeNode(node: Node): void {
        const sockets = node.inputs.concat(node.outputs);
        const connectionsToRemove = this.connections.filter((it) => {
            return sockets.includes(it.start) || sockets.includes(it.end);
        });

        connectionsToRemove.forEach((it) => this.removeConnection(it));

        this.nodes.delete(node);
    }

    public connectSockets(outputSocket: Socket, inputSocket: Socket): Connection {
        const existingConnection = this.connections.find((it) => {
            return it.end === inputSocket;
        });
        this.connections = this.connections.filter(
            (item) => item !== existingConnection,
        );
        const connection = {
            id: this.connectionsId++,
            end: inputSocket,
            start: outputSocket,
        };
        this.connections.push(connection);
        return connection;
    }

    public removeConnection(connection: Connection): void {
        this.connections = this.connections.filter((it) => {
            return it !== connection;
        });
    }
}
export class Graph {
    nodes = [];
    connections = new Array();

    addNode(node) {
        this.nodes.push(node);
    }

    removeNode(node) {
        this.nodes = this.nodes.filter(it => {
            return it !== node;
        })
    }

    connectSockets(outputSocket, inputSocket) {
        let existingConnection = this.connections.find(connection => {
            return connection.end == inputSocket;
        });
        this.connections = this.connections.filter(
            item => item !== existingConnection
        );
        const connection = {
            id: this.connectionsId++,
            start: outputSocket,
            end: inputSocket
        }
        this.connections.push(connection);
        return connection;
    };

    removeConnection(connection) {
        this.connections = this.connections.filter(it => {
            return it !== connection;
        });
    }
}
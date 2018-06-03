export class Graph {
    nodes = [];
    connections = new Array();

    connectSockets(outputSocket, inputSocket) {
        let existingConnection = this.connections.find(connection => {
            return connection.end == inputSocket;
        });
        this.connections = this.connections.filter(
            item => item !== existingConnection
        );
        this.connections.push({
            id: this.connectionsId++,
            start: outputSocket,
            end: inputSocket
        });
    };
}
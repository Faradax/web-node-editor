import Graph from '../../src/model/Graph';

describe('Graph', () => {
  test('should connect two sockets', () => {
    const graph = new Graph();

    const stubOutputSocket = {
      handle: {
        x: 1,
        y: 2
      }
    };

    const stubInputSocket = {
      handle: {
        x: 3,
        y: 4
      }
    };

    const connection = graph.connectSockets(stubOutputSocket, stubInputSocket);
    expect(connection.start).toBe(stubOutputSocket);
    expect(connection.end).toBe(stubInputSocket);
  });

  it('removes existing connections from input when connecting a new one', () => {
    // given a graph with a connection between two sockets
    const graph = new Graph();

    const stubOutputSocket = {
      handle: {
        x: 1,
        y: 2
      }
    };

    const stubInputSocket = {
      handle: {
        x: 3,
        y: 4
      }
    };

    const firstConnection = graph.connectSockets(stubOutputSocket, stubInputSocket);

    // and a second output socket
    const stubOutputSocket2 = {
      handle: {
        x: 1,
        y: 2
      }
    };

    // when connecting the second socket to the input
    const secondConnection = graph.connectSockets(stubOutputSocket2, stubInputSocket);

    // only the connection from the second output remains
    expect(graph.connections).toContain(secondConnection);
    expect(graph.connections).not.toContain(firstConnection);
  });

  it('can remove existing connections', () => {
    // given a graph with a connection
    const graph = new Graph();
    const connection = graph.connectSockets({}, {});

    graph.removeConnection(connection);
    expect(graph.connections).not.toContain(connection);
  });


  it('only removes the desired connection', () => {
    // given a graph with more than one connection
    const graph = new Graph();
    const firstConnection = graph.connectSockets({ x: 14, y: 1 }, { x: 0, y: 0 });
    const removalConnection = graph.connectSockets({}, {});

    graph.removeConnection(removalConnection);
    expect(graph.connections).toContain(firstConnection);
  });

  it('can add a node', () => {
    // given an empty graph
    const graph = new Graph();

    // when adding an empty node
    graph.addNode({
      name: "foo",
      inputs: [],
      outputs: []
    });

    expect(graph.nodes[0].name).toBe('foo');
  });

  it('can remove a node', () => {
    // given a graph with one node in it
    const graph = new Graph();

    const node = {
      name: "foo",
      inputs: [],
      outputs: []
    }

    graph.addNode(node);

    // when removing that node
    graph.removeNode(node);

    // graph is empty
    expect(graph.nodes.length).toBe(0);
  });

  it('disconnects node upon removal', () => {
    // given a graph with a connection
    const graph = new Graph();
    const stubOutput = { label: 'out' };
    const stubInput = { label: 'in' };
    const stubNode1 = { name: 'foo', inputs: [stubInput], outputs: [] };
    const stubNode2 = { name: 'foo', inputs: [], outputs: [stubOutput] };
    graph.addNode(stubNode1);
    graph.addNode(stubNode2);
    const connection = graph.connectSockets(stubOutput, stubInput);

    graph.removeNode(stubNode2);
    expect(graph.connections).not.toContain(connection);
  });

  it('cannot add the same node twice', () => {
    // given graph and node
    const graph = new Graph();
    const node = {
      name: "foo",
      inputs: [],
      outputs: []
    };

    graph.addNode(node);
    graph.addNode(node);

    expect(graph.nodes.length).toBe(1);
  });
});

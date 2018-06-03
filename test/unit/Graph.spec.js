import { Graph } from '../../src/model/Graph';

describe('Graph', () => {
  it('should connect two sockets', () => {
    const graph = new Graph();
    console.log(graph);
    console.log(graph.connections);
    console.log(graph.connections.find);

    const stubOutputSocket = {
      handle: {
        x: 1,
        y: 2
      }
    };

    const stubInputSocket = {
      handle: {
        x: 1,
        y: 2
      }
    };

    const connection = graph.connectSockets(stubOutputSocket, stubInputSocket);
    expect(connection.start).toBe(stubOutputSocket);
    expect(connection.end).toBe(stubInputSocket);
  })

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
    const firstConnection = graph.connectSockets({x: 14, y: 1}, {x: 0, y: 0});
    const removalConnection = graph.connectSockets({}, {});

    graph.removeConnection(removalConnection);
    expect(graph.connections).toContain(firstConnection);
  });
})

// also see example testing a component with mocks at
// https://github.com/vuejs/vueify-example/blob/master/test/unit/a.spec.js#L22-L43

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

    graph.connectSockets(stubOutputSocket, stubInputSocket);
    expect(graph.connections.length).toBe(1)
    expect(graph.connections[0].start).toBe(stubOutputSocket);
    expect(graph.connections[0].end).toBe(stubInputSocket);
  })
})

// also see example testing a component with mocks at
// https://github.com/vuejs/vueify-example/blob/master/test/unit/a.spec.js#L22-L43

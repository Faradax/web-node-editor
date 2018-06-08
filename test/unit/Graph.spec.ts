import Graph from "../../src/model/Graph";
import Socket from "../../src/model/Socket";
import Node from "../../src/model/Node";

describe("Graph", () => {
  test("should connect two sockets", () => {
    const graph = new Graph();

    const stubOutputSocket = new Socket("out");
    const stubInputSocket = new Socket("in");

    const connection = graph.connectSockets(stubOutputSocket, stubInputSocket);
    expect(connection.start).toBe(stubOutputSocket);
    expect(connection.end).toBe(stubInputSocket);
  });

  it("removes existing connections from input when connecting a new one", () => {
    // given a graph with a connection between two sockets
    const graph = new Graph();

    const stubOutputSocket = new Socket("out");
    const stubInputSocket = new Socket("in");

    const firstConnection = graph.connectSockets(stubOutputSocket, stubInputSocket);

    // and a second output socket
    const stubOutputSocket2 = new Socket("out2");

    // when connecting the second socket to the input
    const secondConnection = graph.connectSockets(stubOutputSocket2, stubInputSocket);

    // only the connection from the second output remains
    expect(graph.connections).toContain(secondConnection);
    expect(graph.connections).not.toContain(firstConnection);
  });

  it("can remove existing connections", () => {
    // given a graph with a connection
    const graph = new Graph();
    const stubOutputSocket = new Socket("out");
    const stubInputSocket = new Socket("in");
    const connection = graph.connectSockets(stubOutputSocket, stubInputSocket);

    graph.removeConnection(connection);
    expect(graph.connections).not.toContain(connection);
  });

  it("only removes the desired connection", () => {
    // given a graph with more than one connection
    const graph = new Graph();
    const stubOutputSocket = new Socket("out");
    const stubInputSocket = new Socket("in");
    const firstConnection = graph.connectSockets(stubOutputSocket, stubInputSocket);

    const stubOutputSocket2 = new Socket("out2");
    const stubInputSocket2 = new Socket("in2");
    const removalConnection = graph.connectSockets(stubOutputSocket2, stubInputSocket2);

    graph.removeConnection(removalConnection);
    expect(graph.connections).toContain(firstConnection);
  });

  it("can add a node", () => {
    // given an empty graph
    const graph = new Graph();

    // when adding an empty node
    const node = new Node();
    graph.addNode(node);

    expect(graph.nodes).toContain(node);
  });

  it("can remove a node", () => {
    // given a graph with one node in it
    const graph = new Graph();

    const node = {
      name: "foo",
      inputs: [],
      outputs: []
    };

    graph.addNode(node);

    // when removing that node
    graph.removeNode(node);

    // graph is empty
    expect(graph.nodes.size).toBe(0);
  });

  it("disconnects node upon removal", () => {
    // given a graph with a connection
    const graph = new Graph();
    const stubOutput = new Socket("out");
    const stubInput = new Socket("in");
    const stubNode1 = { name: "foo", inputs: [stubInput], outputs: [] };
    const stubNode2 = { name: "foo", inputs: [], outputs: [stubOutput] };
    graph.addNode(stubNode1);
    graph.addNode(stubNode2);
    const connection = graph.connectSockets(stubOutput, stubInput);

    graph.removeNode(stubNode2);
    expect(graph.connections).not.toContain(connection);
  });

  it("cannot add the same node twice", () => {
    // given graph and node
    const graph = new Graph();
    const node = {
      name: "foo",
      inputs: [],
      outputs: []
    };

    graph.addNode(node);
    graph.addNode(node);

    expect(graph.nodes.size).toBe(1);
  });
});

import Socket from "./Socket";

export default class Node {
    public readonly inputs: Socket[] = [];
    public readonly outputs: Socket[] = [];

    constructor(public name = "empty") {

    }
}
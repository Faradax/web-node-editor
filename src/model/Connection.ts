import Socket from "./Socket";

export default class Connection {

    constructor(readonly start: Socket, readonly end: Socket) {
    }
}
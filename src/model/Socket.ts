export default class Socket {

    private static idGen = 0;
    public readonly id = Socket.idGen++;

    constructor(readonly label: string) {
    }
}
import Tetromino from './Tetromino'

export default class S extends Tetromino {
    constructor ({ name, color } = {}) {
        super({ name: "S", color: "blue" });

        // 3 => [x, y] and Solid
        // 2 => [x, y] and Empty
        // 1 => Solid
        // 0 => Empty
        this.rotations = [
            [
                [0, 3, 1],
                [1, 1, 0]
            ],
            [
                [3, 0],
                [1, 1],
                [0, 1]
            ],
            [
                [0, 3, 1],
                [1, 1, 0]
            ],
            [
                [3, 0],
                [1, 1],
                [0, 1]
            ]
        ];
    }
}

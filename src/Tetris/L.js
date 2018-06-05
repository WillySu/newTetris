import Tetromino from './Tetromino'

export default class L extends Tetromino {
    constructor ({ name, color } = {}) {
        super({ name: "L", color: "yellow" });

        // 3 => [x, y] and Solid
        // 2 => [x, y] and Empty
        // 1 => Solid
        // 0 => Empty
        this.rotations = [
            [
                [1, 3, 1],
                [1, 0, 0]
            ],
            [
                [1, 3],
                [0, 1],
                [0, 1]
            ],
            [
                [0, 2, 1],
                [1, 1, 1]
            ],
            [
                [3, 0],
                [1, 0],
                [1, 1]
            ]
        ];
    }
}

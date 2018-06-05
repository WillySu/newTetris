import Tetromino from './Tetromino'

export default class I extends Tetromino {
    constructor ({ name, color } = {}) {
        super({ name: "I", color: "red" });

        // 3 => [x, y] and Solid
        // 2 => [x, y] and Empty
        // 1 => Solid
        // 0 => Empty
        this.rotations = [
            [
                [3],
                [1],
                [1],
                [1]
            ],
            [
                [1, 3, 1, 1]
            ],
            [
                [3],
                [1],
                [1],
                [1]
            ],
            [
                [1, 1, 3, 1]
            ]
        ];
    }
}

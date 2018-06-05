import Tetromino from './Tetromino'

export default class T extends Tetromino {
    constructor ({ name, color } = {}) {
        super({ name: "T", color: "silver" });

        // 3 => [x, y] and Solid
        // 2 => [x, y] and Empty
        // 1 => Solid
        // 0 => Empty
        this.rotations = [
            [
                [1, 3, 1],
                [0, 1, 0]
            ],
            [
                [0, 3],
                [1, 1],
                [0, 1]
            ],
            [
                [0, 3, 0],
                [1, 1, 1]
            ],
            [
                [3, 0],
                [1, 1],
                [1, 0]
            ]
        ];
    }
}

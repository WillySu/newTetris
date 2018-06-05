import Tetromino from './Tetromino'

export default class O extends Tetromino {
    constructor ({ name, color } = {}) {
        super({ name: "O", color: "cyan" });

        // 3 => [x, y] and Solid
        // 2 => [x, y] and Empty
        // 1 => Solid
        // 0 => Empty
        this.rotations = [
            [
                [3, 1],
                [1, 1]
            ],
            [
                [1, 3],
                [1, 1]
            ],
            [
                [3, 1],
                [1, 1]
            ],
            [
                [1, 3],
                [1, 1]
            ]
        ];
    }
}

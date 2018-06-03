export default class Tetromino {
    constructor ({ name, color } = {}) {
        this.name = name;
        this.color = color || "red";

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
                [3, 0],
                [1, 0],
                [1, 1]
            ],
            [
                [0, 2, 1],
                [1, 1, 1]
            ],
            [
                [1, 3],
                [0, 1],
                [0, 1]
            ]
        ]; // Default L
        this.rotationIndex = 0;
    }

    get rotation () {
        return this.rotations[this.rotationIndex];
    }

    rotateLeft () {
        this.rotationIndex--;

        if (this.rotationIndex < 0) {
            this.rotationIndex = 3;
        }
    }

    rotateRight () {
        this.rotationIndex++;

        if (this.rotationIndex > 3) {
            this.rotationIndex = 0;
        }
    }
}

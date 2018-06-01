export default class Tetromino {
    constructor ({ name, x = 0, y = 0, xLimit = 10, yLimit = 20 } = {}) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.xLimit = xLimit;
        this.yLimit = yLimit;
        this.rotations = [
            [1],
            [1],
            [1],
            [1]
        ];
        this.rotationIndex = 0;
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

    moveLeft () {
        this.x--;

        if (this.x < 0) {
            this.x = 0;
        }
    }

    moveRight () {
        this.x++;

        if (this.x > this.xLimit - 1) {
            this.x = this.xLimit - 1;
        }
    }

    drop () {
        this.y++;

        if (this.x > this.xLimit - 1) {
            this.x = this.xLimit - 1;
        }
    }
}
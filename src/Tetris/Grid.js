import I from "./I";
import J from "./J";
import L from "./L";
import O from "./O";
import S from "./S";
import T from "./T";
import Z from "./Z";

export const LEFT = "left";
export const RIGHT = "right";
export const BOTTOM = "bottom";

const TETROS = [
    new I(),
    new J(),
    new L(),
    new O(),
    new S(),
    new T(),
    new Z()
];

const DEFAULT_TIMESTAMP = 3000;

export default class Grid {
    constructor ({ numOfCol = 10, numOfRow = 20, defaultTetroX, defaultTetroY, uiComponent } = {}) {
        this.numOfCol = numOfCol;
        this.numOfRow = numOfRow;
        this.defaultTetroX = defaultTetroX || 0;
        this.defaultTetroY = defaultTetroY || 0;
        this.intervall = 1000; // 3 sec.
        this.tetro = null;
        this.tetroX;
        this.tetroY;
        this.timestamp = DEFAULT_TIMESTAMP;
        this.uiComponent = uiComponent;
        const matrix = [];

        for (let r = 0; r < numOfRow; r++) {
            matrix.push(new Array(numOfCol).fill(""));
        }

        this.matrix = matrix;

        if (this.uiComponent && typeof this.uiComponent.setMatrix === "function") {
            this.uiComponent.setMatrix(this.matrix);
        }
    }

    reset () {
        this.matrix.forEach(cells => cells.fill(""));
        console.log(this.matrix);
    }

    getTetroPositions () {
        const { tetro, tetroX, tetroY } = this;
        if (tetro) {
            const rotation = this.tetro.rotation;

            return rotation.reduce((list, pos, row) => {
                for (let col = 0; col < pos.length; col++) {
                    const code = pos[col];
                    if (code === 1 || code === 3) {
                        list.push({
                            x: tetroX + col,
                            y: tetroY + row,
                            color: tetro.color
                        });
                    }
                }

                return list;
            }, []);
        }

        return undefined;
    }

    updateMatrix ({ reset = false } = {}) {
        const { numOfCol, numOfRow } = this;
        const blockPositions = this.getTetroPositions();

        if (blockPositions) {
            const outOfBoundary = blockPositions.some((b) => {
                const { x, y } = b;
                return x < 0 || x > numOfCol - 1 || y < 0 || y > numOfRow -1;
            });

            if (outOfBoundary) {
                console.log("outOfBoundary");
                return false;
            }

            if (reset) {
                const canReset = blockPositions.every(b => this.matrix[b.y][b.x] !== "");

                if (canReset) {
                    blockPositions.forEach(b => this.matrix[b.y][b.x] = "");
                    console.log("canReset");
                    return true;
                }

                console.log("cannotReset");
            } else {
                const canMove = blockPositions.every(b => this.matrix[b.y][b.x] === "");

                if (canMove) {
                    blockPositions.forEach(b => this.matrix[b.y][b.x] = b.color);
                    console.log("canMove");
                    return true;
                }

                console.log("cannotMove");
            }
        }

        return false;
    }

    addTetro ({ x, y } = {}) {
        const len = TETROS.length;
        const rand = Math.floor(Math.random() * len);
        this.tetro = TETROS[rand];
        this.tetroX = x || this.defaultTetroX;
        this.tetroY = y || this.defaultTetroY;

        if (this.updateMatrix()) {
            this.updateUiComponent();
            return true;
        }

        return false;
    }

    // direction = [left, right, down]
    moveTetro ({ direction } = {}) {
        if (this.updateMatrix({ reset: true })) {
            if (direction === LEFT) {
                this.tetroX--;
            } else if (direction === RIGHT) {
                this.tetroX++;
            } else if (direction === BOTTOM) {
                this.tetroY++;
            }

            if (!this.updateMatrix()) {
                if (direction === LEFT) {
                    this.tetroX++;
                } else if (direction === RIGHT) {
                    this.tetroX--;
                } else if (direction === BOTTOM) {
                    this.tetroY--;
                }

                this.updateMatrix();
            } else {
                this.updateUiComponent();
                return true;
            }
        }

        return false;
    }

    moveLeft () {
        return this.moveTetro({ direction: LEFT });
    }

    moveRight () {
        return this.moveTetro({ direction: RIGHT });
    }

    moveDown () {
        return this.moveTetro({ direction: BOTTOM });
    }

    drop () {
        while (this.moveDown()) {
            // keep looping until unable to go down
        }
    }

    // direction = [left, right]
    rotateTetro ({ direction } = {}) {
        if (this.updateMatrix({ reset: true })) {
            if (direction === LEFT) {
                this.tetro.rotateLeft();
            } else if (direction === RIGHT) {
                this.tetro.rotateRight();
            }

            if (!this.updateMatrix()) {
                if (direction === LEFT) {
                    this.tetro.rotateRight();
                } else if (direction === RIGHT) {
                    this.tetro.rotateLeft();
                }

                this.updateMatrix();
            } else {
                this.updateUiComponent();
                return true;
            }
        }

        return false;
    }

    rotateLeft () {
        return this.rotateTetro({ direction: LEFT });
    }

    rotateRight () {
        return this.rotateTetro({ direction: RIGHT });
    }

    updateUiComponent () {
        if (this.uiComponent && typeof this.uiComponent.update === "function") {
            this.uiComponent.update();
        }
    }

    start () {
        this.addTetro();
        this.dropping();
    }

    stop () {
        this.reset();
        this.updateUiComponent();
    }

    dropping (timestamp) {
        if (timestamp - this.timestamp > this.intervall) {
            this.timestamp = timestamp;
            if (this.moveDown()) {

            } else if (!this.addTetro()) {
                this.gameOver()
                return;
            }
        }

        requestAnimationFrame((t) => this.dropping(t));
    }

    gameOver () {
        this.timestamp = DEFAULT_TIMESTAMP;
        this.stop();
    }
}

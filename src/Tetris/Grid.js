export const LEFT = "left";
export const RIGHT = "right";
export const BOTTOM = "bottom";

export default class Grid {
    constructor ({ numOfCol = 10, numOfRow = 20, defaultTetroX, defaultTetroY, uiComponent } = {}) {
        this.numOfCol = numOfCol;
        this.numOfRow = numOfRow;
        this.defaultTetroX = defaultTetroX || 0;
        this.defaultTetroY = defaultTetroY || 0;
        this.tetro = undefined;
        this.tetroX;
        this.tetroY;
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
                return false;
            }

            if (reset) {
                const canReset = blockPositions.every(b => this.matrix[b.y][b.x] !== "");

                if (canReset) {
                    blockPositions.forEach(b => this.matrix[b.y][b.x] = "");
                    return true;
                }
            } else {
                const canDrop = blockPositions.every(b => this.matrix[b.y][b.x] === "");

                if (canDrop) {
                    blockPositions.forEach(b => this.matrix[b.y][b.x] = b.color);
                    return true;
                }
            }
        }

        return false;
    }

    addTetro ({ tetro, x, y }) {
        this.tetroX = x || this.defaultTetroX;
        this.tetroY = y || this.defaultTetroY;
        this.tetro = tetro;

        this.updateMatrix();
        this.updateUiComponent();
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
}

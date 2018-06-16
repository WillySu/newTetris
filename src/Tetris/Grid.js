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
export const EMPTY = "";

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
        this.isGameOver = false;
        this.intervall = 1000; // 3 sec.
        this.tetro = null;
        this.tetroX;
        this.tetroY;
        this.timerKey = null;
        this.timestamp = DEFAULT_TIMESTAMP;
        this.uiComponent = uiComponent;
        this.uiControl = null; // set by setControl after initialization
        const matrix = [];

        for (let r = 0; r < numOfRow; r++) {
            matrix.push(new Array(numOfCol).fill(EMPTY));
        }

        this.matrix = matrix;

        if (this.uiComponent && typeof this.uiComponent.setMatrix === "function") {
            this.uiComponent.setMatrix(this.matrix);
        }
    }

    setControl (control) {
        this.uiControl = control;
    }

    resetMatrix () {
        this.matrix.forEach(cells => cells.fill(EMPTY));
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
                const canReset = blockPositions.every(b => this.matrix[b.y][b.x] !== EMPTY);

                if (canReset) {
                    blockPositions.forEach(b => this.matrix[b.y][b.x] = EMPTY);
                    return true;
                }
            } else {
                const canMove = blockPositions.every(b => this.matrix[b.y][b.x] === EMPTY);

                if (canMove) {
                    blockPositions.forEach(b => this.matrix[b.y][b.x] = b.color);
                    return true;
                }
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
        const hasMovedDown = this.moveTetro({ direction: BOTTOM });

        if (!hasMovedDown) {
            const linesRemoved = this.checkFullLines();

            if (linesRemoved) {
                console.log("Number of Lines removed:", linesRemoved);
            }
        }

        return hasMovedDown;
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
        if (this.isGameOver) {
            this.resetMatrix();
            this.updateUiComponent();
            this.isGameOver = false;
        }

        if (!this.tetro) {
            this.addTetro();
        }

        this.dropping();
    }

    stop () {
        cancelAnimationFrame(this.timerKey);
    }

    checkFullLines () {
        let numOfFullLines = 0;
        let row = this.numOfRow - 1;

        while (row >= 0) {
            const isFullLine = this.matrix[row].every(cell => cell !== EMPTY);

            if (isFullLine) {
                this.removeFullLine(row);
                numOfFullLines++;
            } else {
                row--;
            }
        }

        return numOfFullLines;
    }

    removeFullLine (index) {
        const { numOfCol } = this;

        for (let row = index; row > 0; row--) {
            if (row === 0) {
                this.matrix[row].fill(EMPTY);
            } else {
                for (let cell = 0; cell < numOfCol; cell++) {
                    this.matrix[row][cell] = this.matrix[row - 1][cell];
                }
            }
        }

        this.updateUiComponent();
    }

    dropping (timestamp) {
        if (timestamp - this.timestamp > this.intervall) {
            this.timestamp = timestamp;
            if (!this.moveDown()) {
              if (this.addTetro()) {
                  // Reset timer
                  cancelAnimationFrame(this.timerKey);
              } else {
                  this.gameOver();
                  return;
              }
            }
        }

        this.timerKey = requestAnimationFrame((t) => this.dropping(t));
    }

    gameOver () {
        this.timestamp = DEFAULT_TIMESTAMP;
        this.isGameOver = true;
        this.stop();
        if (this.uiControl && typeof this.uiControl.stopUI === "function") {
            this.uiControl.stopUI();
        }
    }
}

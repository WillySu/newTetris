import I from "./I";
import J from "./J";
import L from "./L";
import O from "./O";
import S from "./S";
import T from "./T";
import Z from "./Z";

export const EMPTY = "";

export const TETROS = [
    new I(),
    new J(),
    new L(),
    new O(),
    new S(),
    new T(),
    new Z()
];

export default class Grid {
    constructor ({ numOfCol = 10, numOfRow = 20, defaultTetroX, defaultTetroY, uiComponent } = {}) {
        this.numOfCol = numOfCol;
        this.numOfRow = numOfRow;
        this.defaultTetroX = defaultTetroX || 0;
        this.defaultTetroY = defaultTetroY || 0;
        this.tetro = null;
        this.tetroX;
        this.tetroY;
        this.uiComponent = uiComponent;
        const matrix = [];

        for (let r = 0; r < numOfRow; r++) {
            matrix.push(new Array(numOfCol).fill(EMPTY));
        }

        this.matrix = matrix;

        if (this.uiComponent && typeof this.uiComponent.setMatrix === "function") {
            this.uiComponent.setMatrix(this.matrix);
        }
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

    updateUiComponent () {
        if (this.uiComponent && typeof this.uiComponent.update === "function") {
            this.uiComponent.update();
        }
    }
}

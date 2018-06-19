export const LEFT = "left";
export const RIGHT = "right";
export const BOTTOM = "bottom";

import Grid, { EMPTY } from "./Grid";

const DEFAULT_TIMESTAMP = 3000;

const SPEED_UP_RATIO = 0.66;

export default class TetrisGrid extends Grid {
    constructor (params) {
        super(params);

        this.isGameOver = false;
        this.isStarted = false;
        this.intervall = DEFAULT_TIMESTAMP; // 3 sec.
        this.timerKey = null;
        this.timestamp = DEFAULT_TIMESTAMP;
        this.uiControl = null; // set by setControl after initialization
        this.uiScorePanel = null; // set by setScorePanel after initialization
    }

    setControl (control) {
        this.uiControl = control;
    }

    setScorePanel (scorePanel) {
        this.uiScorePanel = scorePanel;
    }

    // direction = [left, right, down]
    moveTetro ({ direction } = {}) {
        if (!this.isStarted) {
            return false;
        }

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
                if (this.uiScorePanel && typeof this.uiScorePanel.addLines === "function") {
                    this.uiScorePanel.addLines(linesRemoved);
                }
            }
        }

        return hasMovedDown;
    }

    drop () {
        if (!this.isStarted) {
            return false;
        }

        while (this.moveDown()) {
            // keep looping until unable to go down
        }
    }

    // direction = [left, right]
    rotateTetro ({ direction } = {}) {
        if (!this.isStarted) {
            return false;
        }

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

    start () {
        this.isStarted = true;

        if (this.isGameOver) {
            this.resetMatrix();
            this.updateUiComponent();
            this.isGameOver = false;
            this.intervall = DEFAULT_TIMESTAMP;
        }

        if (!this.tetro) {
            this.addTetro();
        }

        this.dropping();
    }

    stop () {
        this.isStarted = false;
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

    speedUp () {
        this.intervall = Math.round(this.intervall * SPEED_UP_RATIO);
    }

    addTetro (params) {
        const added = super.addTetro(params);

        if (added) {
            if (this.uiScorePanel && typeof this.uiScorePanel.addTetro === "function") {
                this.uiScorePanel.addTetro(this.tetro.name);
            }
        }

        return added;
    }
}

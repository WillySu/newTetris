export default class Table {
    constructor ({ numOfCol = 10, numOfRow = 20, parentNode, matrix, className = "grid-2d" } = {}) {
        this.numOfCol = numOfCol;
        this.numOfRow = numOfRow;
        this.parentNode = parentNode; // Parent DOM Element
        this.table = document.createElement("table");
        this.table.className = className;
        this.matrix = matrix;

        this.init();
        this.appendToRoot();
    }

    appendToRoot () {
        const { parentNode, table } = this;

        if (parentNode && typeof parentNode.appendChild === "function") {
            if (table.parentNode !== parentNode) {
                parentNode.appendChild(table);
            }
        }
    }

    init () {
        const { numOfCol, numOfRow, table } = this;
        const tBody = document.createElement("tbody");

        for (let r = 0; r < numOfRow; r++) {
            const tr = document.createElement("tr");

            for (let c = 0; c < numOfCol; c++) {
                const td = document.createElement("td");
                tr.appendChild(td);
            }

            tBody.appendChild(tr);
        }

        table.appendChild(tBody);
    }

    setMatrix (matrix) {
        this.matrix = matrix;
    }

    update () {
        const matrix = this.matrix;

        for (let row = 0; row < matrix.length; row++) {
            for (let cel = 0; cel < matrix[row].length; cel++) {
                const bgColor = matrix[row][cel];
                if (bgColor) {
                  this.table.rows[row].cells[cel].style.backgroundColor = bgColor;
                } else {
                  this.table.rows[row].cells[cel].removeAttribute('style');
                }
            }
        }
    }
}

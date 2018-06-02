export default class Grid {
    constructor ({ numOfCol = 10, numOfRow = 20, root } = {}) {
        this.numOfCol = numOfCol;
        this.numOfRow = numOfRow;
        this.root = root; // Parent DOM Element
        this.table = document.createElement("table");
        this.table.className = "grid-2d"

        this.draw();
        this.appendToRoot();
    }

    appendToRoot () {
        const { root, table } = this;

        if (root && typeof root.appendChild === "function") {
            if (table.parentNode !== root) {
                root.appendChild(table);
            }
        }
    }

    draw () {
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
}
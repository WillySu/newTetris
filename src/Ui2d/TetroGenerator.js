import Table from "./Table";
import Grid from "../Tetris/Grid";

import I from "../Tetris/I";
import J from "../Tetris/J";
import L from "../Tetris/L";
import O from "../Tetris/O";
import S from "../Tetris/S";
import T from "../Tetris/T";
import Z from "../Tetris/Z";

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

export function getTetroGeneratorFactory({ grid, parentNode }) {
    const generator = new TetroGenerator({
        parentNode
    });

    grid.setTetroGenerator(generator);

    return generator;
}

const NUM_OF_COMING_TETROS = 6;

function getRandTetro () {
    const rand = Math.floor(Math.random() * TETROS.length);
    return TETROS[rand];
}

export default class TetroGenerator {
    constructor ({ parentNode } = {}) {
        const numOfCol = 4;
        const numOfRow = 4;

        this.parentNode = parentNode;
        this.tetroList = (new Array(NUM_OF_COMING_TETROS)).fill(0).map(() => getRandTetro());
        this.tableList = this.tetroList.map((tetro) => {
            return new Table({
                numOfCol,
                numOfRow,
                className: 'transparent-table'
            });
        });
        this.gridList = this.tableList.map((table) => {
            return new Grid({
                numOfCol,
                numOfRow,
                uiComponent: table
            });
        });

        this.render();
        this.update();
    }

    getComingTetro () {
        this.tetroList.push(getRandTetro());

        const comingTetro = this.tetroList.shift();

        this.update();

        return comingTetro;
    }

    update () {
        this.tetroList.forEach((tetro, i) => {
            const grid = this.gridList[i];
            grid.resetMatrix();
            grid.addTetro({ tetro });
        });
    }

    render () {
        const ul = document.createElement("ul");
        ul.className = "tetro-list";

        this.tableList.forEach((table) => {
            const li = document.createElement("li");
            li.appendChild(table.table);
            ul.appendChild(li);
        });

        this.parentNode.appendChild(ul);
    }
}

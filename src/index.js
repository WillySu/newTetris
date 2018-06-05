import I from "./Tetris/I";
import J from "./Tetris/J";
import L from "./Tetris/L";
import O from "./Tetris/O";
import S from "./Tetris/S";
import T from "./Tetris/T";
import Z from "./Tetris/Z";
import Grid, { LEFT, RIGHT, DOWN } from "./Tetris/Grid";
import Table from "./Ui2d/Table";
import Control from "./Ui2d/Control";
import './styles/layout.scss'
import './styles/ui2d.scss'

function init () {
    const root = document.getElementById("root");
    const tetros = [
        new I(),
        new J(),
        new L(),
        new O(),
        new S(),
        new T(),
        new Z()
    ];
    const table = new Table({ numOfCol: 10, numOfRow: 20, parentNode: root });
    const grid = new Grid({ numOfCol: 10, numOfRow: 20, uiComponent: table });

    function addTetro () {
        const len = tetros.length;
        const rand = Math.floor(Math.random() * len);

        grid.addTetro({ tetro: tetros[rand], x: 3, y: 0 });
    }

    const control = new Control({
        onAdd: function () {
            addTetro();
        },
        onDrop: function () {
            grid.drop();
            addTetro();
        },
        onMoveLeft: function () {
            grid.moveLeft();
        },
        onMoveRight: function () {
            grid.moveRight();
        },
        onMoveDown: function () {
            grid.moveDown();
        },
        onRotateLeft: function () {
            grid.rotateLeft();
        },
        onRotateRight: function () {
            grid.rotateRight();
        },
        parentNode: root
    });

    addTetro();
}

window.addEventListener("DOMContentLoaded", init);

import Tetromino from "./Tetris/Tetromino";
import Grid, { LEFT, RIGHT, DOWN } from "./Tetris/Grid";
import Table from "./Ui2d/Table";
import Control from "./Ui2d/Control";
import './styles/layout.scss'
import './styles/ui2d.scss'

function init () {
    const root = document.getElementById("root");
    const tetroL = new Tetromino();
    const table = new Table({ numOfCol: 10, numOfRow: 20, parentNode: root });
    const grid = new Grid({ numOfCol: 10, numOfRow: 20, uiComponent: table });

    function addTetro () {
        grid.addTetro({ tetro: tetroL, x: 2, y: 0 });
    }

    const control = new Control({
        onMoveLeft: function () {
            grid.moveLeft();
        },
        onMoveRight: function () {
            grid.moveRight();
        },
        onMoveDown: function () {
            grid.moveDown();
        },
        onAdd: function () {
            addTetro();
        },
        parentNode: root
    });

    addTetro();
}

window.addEventListener("DOMContentLoaded", init);

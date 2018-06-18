import TetrisGrid from "./Tetris/TetrisGrid";
import Table from "./Ui2d/Table";
import { getControlFactory } from "./Ui2d/Control";
import { getScorePanelFactory } from "./Ui2d/ScorePanel";
import { getTetroGeneratorFactory } from "./Ui2d/TetroGenerator";
import './styles/layout.scss'
import './styles/ui2d.scss'

function init () {
    const numOfCol = 10;
    const numOfRow = 20;
    const tetris = document.getElementById("tetris");
    const table = new Table({ numOfCol, numOfRow, parentNode: tetris, className: 'tetris-table' });
    const grid = new TetrisGrid({
        numOfCol,
        numOfRow,
        defaultTetroX: 3,
        defaultTetroY: 0,
        uiComponent: table
    });

    const controlPanel = document.getElementById("controlPanel");
    const control = getControlFactory({ grid, parentNode: controlPanel });
    control.addKeyListeners();

    const scorePanel = document.getElementById("scorePanel");
    const score = getScorePanelFactory({ grid, parentNode: scorePanel });

    const comingTetroPanel = document.getElementById("comingTetroPanel");
    const tetroGenerator = getTetroGeneratorFactory({ grid, parentNode: comingTetroPanel });
}

window.addEventListener("DOMContentLoaded", init);

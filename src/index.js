import Grid from "./Tetris/Grid";
import Table from "./Ui2d/Table";
import { getControlFactory } from "./Ui2d/Control";
import { getScorePanelFactory } from "./Ui2d/ScorePanel";
import './styles/layout.scss'
import './styles/ui2d.scss'

function init () {
    const tetris = document.getElementById("tetris");
    const table = new Table({ numOfCol: 10, numOfRow: 20, parentNode: tetris });
    const grid = new Grid({
        numOfCol: 10,
        numOfRow: 20,
        defaultTetroX: 3,
        defaultTetroY: 0,
        uiComponent: table
    });

    const controlPanel = document.getElementById("controlPanel");
    const control = getControlFactory({ grid, parentNode: controlPanel });
    control.addKeyListeners();

    const scorePanel = document.getElementById("scorePanel");
    const score = getScorePanelFactory({ grid, parentNode: scorePanel });
}

window.addEventListener("DOMContentLoaded", init);

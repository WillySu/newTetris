import Grid from "./Tetris/Grid";
import Table from "./Ui2d/Table";
import { getControlFactory } from "./Ui2d/Control";
import './styles/layout.scss'
import './styles/ui2d.scss'

function init () {
    const root = document.getElementById("root");
    const table = new Table({ numOfCol: 10, numOfRow: 20, parentNode: root });
    const grid = new Grid({
        numOfCol: 10,
        numOfRow: 20,
        defaultTetroX: 3,
        defaultTetroY: 0,
        uiComponent: table
    });
    const control = getControlFactory({ grid, parentNode: root });
}

window.addEventListener("DOMContentLoaded", init);

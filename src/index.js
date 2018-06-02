// import Tetromino from "./Tetris/Tetromino";
import Grid2d from "./Ui2d/Grid";
import './styles/ui2d.scss'

function init () {
    const root = document.getElementById("root");
    // const tetroL = new Tetromino();
    const grid = new Grid2d({ numOfCol: 6, numOfRow: 6, root });
}

window.addEventListener("DOMContentLoaded", init);

import TetrisGrid from "./Tetris/TetrisGrid";
// import Table2D from "./Ui2d/Table";
import Table3D from "./Ui3d/Table";
import { getControlFactory } from "./Ui2d/Control";
import { getScorePanelFactory } from "./Ui2d/ScorePanel";
import { getTetroGeneratorFactory } from "./Ui2d/TetroGenerator";
import './styles/layout.scss'
import './styles/ui2d.scss'

const AUDIO_FILE_MAP = {
    standard: "/newTetris/assets/zapsplat_impacts_wood_panel_loose_hit_vibrate_002_20658.mp3",
    drop: "/newTetris/assets/zapsplat_impacts_metal_pole_hit_vibrate_001_20655.mp3"
};

function loadAudio () {
    const audioMap = Object.keys(AUDIO_FILE_MAP).reduce((map, path) => {
        map[path] = document.createElement("audio");
        map[path].src = AUDIO_FILE_MAP[path];
        return map;
    }, {});

    return audioMap;
}

function init () {
    const numOfCol = 10;
    const numOfRow = 20;
    const tetris = document.getElementById("tetris");
    // const table2d = new Table2D({ numOfCol, numOfRow, parentNode: tetris, className: 'tetris-table' });
    const table3d = new Table3D({ numOfCol, numOfRow, parentNode: tetris });
    const grid = new TetrisGrid({
        numOfCol,
        numOfRow,
        defaultTetroX: 3,
        defaultTetroY: 0,
        uiComponent: table3d,
        soundMap: loadAudio()
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

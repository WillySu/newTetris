import Table from "./Table";
import Grid from "../Tetris/Grid";
import { TETROS } from "./TetroGenerator";

const SCORE_BY_LINES = [
    100,
    300,
    900,
    2700
];

const NUM_OF_LINES_NEEDED_TO_LEVEL_UP = 20;

export function getScorePanelFactory({ grid, parentNode }) {
    const scorePanel = new ScorePanel({
        parentNode,
        onLevelUp: () => grid.speedUp()
    });

    grid.setScorePanel(scorePanel);

    return scorePanel;
}

export default class ScorePanel {
    constructor ({ parentNode, onLevelUp } = {}) {
        this.parentNode = parentNode;
        this.level = 1;
        this.score = 0;
        this.lines = 0;
        this.levelDiv = null;
        this.scoreDiv = null;
        this.linesDiv = null;
        this.onLevelUp = onLevelUp;
        this.tetroCounterMap = TETROS.reduce((map, t) => {
            map[t.name] = 0;
            return map;
        }, {});
        this.counterHolderMap = {};

        this.render();
    }

    levelUp () {
        this.level++;
        this.levelDiv.innerText = this.level;
        this.onLevelUp();
    }

    updateScore (score) {
        this.score = this.score + score;
        this.scoreDiv.innerText = this.score;
    }

    addLines (lines) {
        this.lines = this.lines + lines;
        this.linesDiv.innerText = this.lines;

        this.updateScore(SCORE_BY_LINES[lines - 1]);

        const newLevel = Math.floor(this.lines / NUM_OF_LINES_NEEDED_TO_LEVEL_UP) + 1;

        if (newLevel > this.level) {
            this.levelUp();
        }
    }

    addTetro(tetroName) {
        this.tetroCounterMap[tetroName] = this.tetroCounterMap[tetroName] + 1;
        this.counterHolderMap[tetroName].innerText = this.tetroCounterMap[tetroName];
    }

    getStatics () {
        const numOfCol = 4;
        const numOfRow = 4;

        const ul = document.createElement("ul");
        ul.className = "statics-list";

        TETROS.forEach((tetro) =>{
            const table = new Table({
                numOfCol,
                numOfRow,
                className: 'transparent-table'
            });

            const grid = new Grid({
                numOfCol,
                numOfRow,
                uiComponent: table
            });

            grid.addTetro({ tetro });

            const li = document.createElement("li");
            li.appendChild(table.table);

            const tetroName = tetro.name;
            const span = this.counterHolderMap[tetroName] = document.createElement("span");
            span.innerText = this.tetroCounterMap[tetroName];

            li.appendChild(table.table);
            li.appendChild(span);

            ul.appendChild(li);
        });

        return ul;
    }

    render () {
        const holder = document.createElement("div");
        holder.className = "score-panel";

        const levelHeading = document.createElement("strong");
        levelHeading.appendChild(document.createTextNode("Level:"));
        this.levelDiv = document.createElement("div");
        this.levelDiv.innerText = this.level;

        const scoreHeading = document.createElement("strong");
        scoreHeading.appendChild(document.createTextNode("Score:"));
        this.scoreDiv = document.createElement("div");
        this.scoreDiv.innerText = this.score;

        const linesHeading = document.createElement("strong");
        linesHeading.appendChild(document.createTextNode("Lines:"));
        this.linesDiv = document.createElement("div");
        this.linesDiv.innerText = this.lines;

        const statisticsHeading = document.createElement("strong");
        statisticsHeading.appendChild(document.createTextNode("Statistics:"));

        holder.appendChild(levelHeading);
        holder.appendChild(this.levelDiv);
        holder.appendChild(scoreHeading);
        holder.appendChild(this.scoreDiv);
        holder.appendChild(linesHeading);
        holder.appendChild(this.linesDiv);
        holder.appendChild(statisticsHeading);
        holder.appendChild(this.getStatics());

        this.parentNode.appendChild(holder);
    }
}

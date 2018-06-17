const SCORE_BY_LINES = [
    100,
    300,
    900,
    2700
];

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

    updateLines (lines) {
        this.lines = this.lines + lines;
        this.linesDiv.innerText = this.lines;
    }

    update (lines) {
        this.updateLines(lines);
        this.updateScore(SCORE_BY_LINES[lines - 1]);

        const newLevel = Math.floor(this.lines / 10) + 1;

        if (newLevel > this.level) {
            this.levelUp();
        }
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

        holder.appendChild(levelHeading);
        holder.appendChild(this.levelDiv);
        holder.appendChild(scoreHeading);
        holder.appendChild(this.scoreDiv);
        holder.appendChild(linesHeading);
        holder.appendChild(this.linesDiv);

        this.parentNode.appendChild(holder);
    }
}

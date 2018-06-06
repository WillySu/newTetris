export function getControlFactory({ grid, parentNode }) {
    const control = new Control({
        onMoveLeft: () => grid.moveLeft(),
        onMoveRight: () => grid.moveRight(),
        onRotateLeft: () => grid.rotateLeft(),
        onRotateRight: () => grid.rotateRight(),
        onStart: () => grid.start(),
        onDrop: () => {
            grid.drop();
            grid.addTetro();
        },
        parentNode
    });

    return control;
}

export default class Control {
    constructor ({ onMoveLeft, onMoveRight, onRotateLeft, onRotateRight, onStart, onDrop, parentNode } = {}) {
        this.onStart = onStart;
        this.onDrop = onDrop;
        this.onMoveLeft = onMoveLeft;
        this.onMoveRight = onMoveRight;
        this.onRotateLeft = onRotateLeft;
        this.onRotateRight = onRotateRight;
        this.parentNode = parentNode;

        this.render();
    }

    createButton ({ label, name, onClick }) {
        const button = document.createElement("button");

        button.setAttribute("name", name);
        button.setAttribute("type", "button");
        button.innerText = label;
        if (typeof onClick === "function") {
            button.addEventListener("click", onClick);
        }

        return button;
    }

    render () {
        const holder = document.createElement("form");
        holder.name = "controlForm";
        holder.className = "controlForm";

        const rotateLeftBtn = this.createButton ({
            label: "Rotate Left",
            name: "rotateLeft",
            onClick: this.onRotateLeft
        });
        const rotateRightBtn = this.createButton ({
            label: "Rotate Right",
            name: "rotateRight",
            onClick: this.onRotateRight
        });
        const moveLeftBtn = this.createButton ({
            label: "Move Left",
            name: "moveLeft",
            onClick: this.onMoveLeft
        });
        const moveRightBtn = this.createButton ({
            label: "Move Right",
            name: "moveRight",
            onClick: this.onMoveRight
        });
        const startBtn = this.createButton ({
            label: "Start",
            name: "start",
            onClick: this.onStart
        });
        const dropBtn = this.createButton ({
            label: "Drop Tetro",
            name: "dropTetro",
            onClick: this.onDrop
        });

        const row1 = document.createElement("div");
        row1.appendChild(startBtn);
        row1.appendChild(dropBtn);

        const row2 = document.createElement("div");
        row2.appendChild(rotateLeftBtn);
        row2.appendChild(rotateRightBtn);

        const row3 = document.createElement("div");
        row3.appendChild(moveLeftBtn);
        row3.appendChild(moveRightBtn);

        holder.appendChild(row1);
        holder.appendChild(row2);
        holder.appendChild(row3);

        this.parentNode.appendChild(holder);
    }
}
export function getControlFactory({ grid, parentNode }) {
    const control = new Control({
        onMoveLeft: () => grid.moveLeft(),
        onMoveRight: () => grid.moveRight(),
        onRotateLeft: () => grid.rotateLeft(),
        onRotateRight: () => grid.rotateRight(),
        onStart: () => grid.start(),
        onStop: () => grid.stop(),
        onDrop: () => {
            grid.drop();
            grid.addTetro();
        },
        parentNode
    });

    grid.setControl(control);

    return control;
}

export default class Control {
    constructor ({ onMoveLeft, onMoveRight, onRotateLeft, onRotateRight, onStart, onStop, onDrop, parentNode } = {}) {
        this.onStart = onStart;
        this.onStop = onStop;
        this.onDrop = onDrop;
        this.onMoveLeft = onMoveLeft;
        this.onMoveRight = onMoveRight;
        this.onRotateLeft = onRotateLeft;
        this.onRotateRight = onRotateRight;
        this.parentNode = parentNode;

        this.render();
    }

    createButton ({ label, name, onClick, disabled }) {
        const button = document.createElement("button");

        button.setAttribute("name", name);
        button.setAttribute("type", "button");
        button.innerText = label;

        if (typeof onClick === "function") {
            button.addEventListener("click", onClick);
        }

        if (disabled) {
            button.setAttribute("disabled", true);
        }

        return button;
    }

    loopButtons ({ name, disabled }) {
        const elements = document.controlForm.elements;
        for (let i = 0, l = elements.length; i < l; i++) {
            const el = elements[i];
            if (el.name === name) {
                if (disabled) {
                    el.setAttribute("disabled", true);
                } else {
                    el.removeAttribute("disabled");
                }
            } else {
                if (disabled) {
                    el.removeAttribute("disabled");
                } else {
                    el.setAttribute("disabled", true);
                }
            }
        }
    }

    startUI () {
        this.loopButtons({ name: "start", disabled: true });
    }

    stopUI () {
        this.loopButtons({ name: "start", disabled: false });
    }

    render () {
        const holder = document.createElement("form");
        holder.name = "controlForm";
        holder.className = "controlForm";

        const rotateLeftBtn = this.createButton ({
            label: "Rotate Left",
            name: "rotateLeft",
            onClick: this.onRotateLeft,
            disabled: true
        });
        const rotateRightBtn = this.createButton ({
            label: "Rotate Right",
            name: "rotateRight",
            onClick: this.onRotateRight,
            disabled: true
        });
        const moveLeftBtn = this.createButton ({
            label: "Move Left",
            name: "moveLeft",
            onClick: this.onMoveLeft,
            disabled: true
        });
        const moveRightBtn = this.createButton ({
            label: "Move Right",
            name: "moveRight",
            onClick: this.onMoveRight,
            disabled: true
        });
        const startBtn = this.createButton ({
            label: "Start",
            name: "start",
            onClick: (() => {
                this.onStart();
                this.startUI();
            }).bind(this)
        });
        const stopBtn = this.createButton ({
            label: "Stop",
            name: "stop",
            onClick: (() => {
                this.onStop();
                this.stopUI();
            }).bind(this),
            disabled: true
        });
        const dropBtn = this.createButton ({
            label: "Drop Tetro",
            name: "dropTetro",
            onClick: this.onDrop,
            disabled: true
        });

        const row1 = document.createElement("div");
        row1.appendChild(startBtn);
        row1.appendChild(stopBtn);

        const row2 = document.createElement("div");
        row2.appendChild(rotateLeftBtn);
        row2.appendChild(rotateRightBtn);

        const row3 = document.createElement("div");
        row3.appendChild(moveLeftBtn);
        row3.appendChild(dropBtn);
        row3.appendChild(moveRightBtn);

        holder.appendChild(row1);
        holder.appendChild(row2);
        holder.appendChild(row3);

        this.parentNode.appendChild(holder);
    }
}
export function getControlFactory({ grid, parentNode }) {
    const control = new Control({
        onMoveLeft: () => grid.moveLeft(),
        onMoveRight: () => grid.moveRight(),
        onMoveDown: () => grid.moveDown(),
        onRotateLeft: () => grid.rotateLeft(),
        onRotateRight: () => grid.rotateRight(),
        onStart: () => grid.start(),
        onStop: () => grid.stop(),
        onDrop: () => {
            if (grid.drop()) {
                grid.addTetro();
            }
        },
        parentNode
    });

    grid.setControl(control);

    return control;
}

export default class Control {
    constructor ({ onMoveLeft, onMoveRight, onMoveDown, onRotateLeft, onRotateRight, onStart, onStop, onDrop, parentNode } = {}) {
        this.onStart = onStart;
        this.onStop = onStop;
        this.onDrop = onDrop;
        this.onMoveLeft = onMoveLeft;
        this.onMoveRight = onMoveRight;
        this.onMoveDown = onMoveDown;
        this.onRotateLeft = onRotateLeft;
        this.onRotateRight = onRotateRight;
        this.parentNode = parentNode;

        this.render();
    }

    createButton ({ label, name, onClick, disabled, title }) {
        const button = document.createElement("button");

        button.setAttribute("name", name);
        button.setAttribute("type", "button");
        button.setAttribute("title", title);
        button.appendChild(document.createTextNode(label));

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
        holder.className = "control-form";

        const rotateLeftBtn = this.createButton ({
            label: "Rotate Left",
            name: "rotateLeft",
            title: "Press Q or 7",
            onClick: this.onRotateLeft,
            disabled: true
        });
        const rotateRightBtn = this.createButton ({
            label: "Rotate Right",
            name: "rotateRight",
            title: "Press E or 9",
            onClick: this.onRotateRight,
            disabled: true
        });
        const moveLeftBtn = this.createButton ({
            label: "Move Left",
            name: "moveLeft",
            title: "Press A, Left Arrow or 4",
            onClick: this.onMoveLeft,
            disabled: true
        });
        const moveRightBtn = this.createButton ({
            label: "Move Right",
            name: "moveRight",
            title: "Press D, Right Arrow or 6",
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
            title: "Press W, Top Arrow or 8",
            onClick: this.onDrop,
            disabled: true
        });
        const moveDownBtn = this.createButton ({
            label: "Move Down",
            name: "moveDown",
            title: "Press S, Bottom Arrow or 5",
            onClick: this.onMoveDown,
            disabled: true
        });

        const row1 = document.createElement("div");
        row1.appendChild(startBtn);
        row1.appendChild(stopBtn);

        const row2 = document.createElement("div");
        row2.appendChild(rotateLeftBtn);
        row2.appendChild(dropBtn);
        row2.appendChild(rotateRightBtn);

        const row3 = document.createElement("div");
        row3.appendChild(moveLeftBtn);
        row3.appendChild(moveDownBtn);
        row3.appendChild(moveRightBtn);

        holder.appendChild(row1);
        holder.appendChild(row2);
        holder.appendChild(row3);

        this.parentNode.appendChild(holder);
    }

    checkKey(ev) {
        switch (event.code) {
            case "ArrowLeft":
            case "Numpad4":
            case "KeyA":
                this.onMoveLeft();
                break;
            case "ArrowRight":
            case "Numpad6":
            case "KeyD":
                this.onMoveRight();
                break;
            case "ArrowUp":
            case "Numpad8":
            case "KeyW":
                this.onDrop();
                break;
            case "ArrowDown":
            case "Numpad2":
            case "Numpad5":
            case "KeyS":
                this.onMoveDown();
                break;
            case "Numpad7":
            case "KeyQ":
                this.onRotateLeft();
                break;
            case "Numpad9":
            case "KeyE":
                this.onRotateRight();
                break;
        }
    }

    addKeyListeners () {
        document.body.addEventListener("keyup", (ev) => this.checkKey(ev));
    }
}

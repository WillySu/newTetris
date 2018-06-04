export default class Control {
    constructor ({ onMoveLeft, onMoveRight, onMoveDown, onRotateLeft, onRotateRight, onAdd, parentNode } = {}) {
        this.onAdd = onAdd;
        this.onMoveLeft = onMoveLeft;
        this.onMoveRight = onMoveRight;
        this.onMoveDown = onMoveDown;
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
        const moveDownBtn = this.createButton ({
            label: "Move Down",
            name: "moveDown",
            onClick: this.onMoveDown
        });
        const addBtn = this.createButton ({
            label: "Add New Tetro",
            name: "addNew",
            onClick: this.onAdd
        });

        const row1 = document.createElement("div");
        row1.appendChild(rotateLeftBtn);
        row1.appendChild(addBtn);
        row1.appendChild(rotateRightBtn);

        const row2 = document.createElement("div");
        row2.appendChild(moveLeftBtn);
        row2.appendChild(moveDownBtn);
        row2.appendChild(moveRightBtn);

        holder.appendChild(row1);
        holder.appendChild(row2);

        this.parentNode.appendChild(holder);
    }
}
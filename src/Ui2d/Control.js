export default class Control {
    constructor ({ onMoveLeft, onMoveRight, onMoveDown, onAdd, parentNode } = {}) {
        this.onMoveLeft = onMoveLeft;
        this.onMoveRight = onMoveRight;
        this.onMoveDown = onMoveDown;
        this.onAdd = onAdd;
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

        const leftBtn = this.createButton ({
            label: "Move Left",
            name: "moveLeft",
            onClick: this.onMoveLeft
        });
        const rightBtn = this.createButton ({
            label: "Move Right",
            name: "moveRight",
            onClick: this.onMoveRight
        });
        const downBtn = this.createButton ({
            label: "Move Down",
            name: "moveDown",
            onClick: this.onMoveDown
        });
        const addBtn = this.createButton ({
            label: "Add New Tetro",
            name: "addNew",
            onClick: this.onAdd
        });

        holder.appendChild(leftBtn);
        holder.appendChild(downBtn);
        holder.appendChild(rightBtn);
        holder.appendChild(addBtn);

        this.parentNode.appendChild(holder);
    }
}
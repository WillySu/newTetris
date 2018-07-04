export default class BackImage {
    constructor ({ height = 32, width = 32, color = "grey", root } = {}) {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.color = color;
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;

        this.render();

        if (root) {
            root.appendChild(this.canvas);
        }
    }

    render () {
        const { height, width } = this;

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, width, height);

        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, width, height);
    }

    getImage () {
      const dataURL = this.canvas.toDataURL();
      const image = document.createElement("img");

      image.src = dataURL;

      return image;
    }
}

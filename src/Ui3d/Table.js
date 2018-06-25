import * as THREE from 'three';

export default class Table {
    constructor ({ numOfCol = 10, numOfRow = 20, parentNode, matrix } = {}) {
        this.numOfCol = numOfCol;
        this.numOfRow = numOfRow;
        this.parentNode = parentNode; // Parent DOM Element
        this.matrix = matrix;

        // set in init()
        this.canvas = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;

        // set in setMatrix(...)
        this.cubeMatrix = [];

        this.init();
        this.appendToRoot();
    }

    appendToRoot () {
        const { parentNode, canvas } = this;

        if (parentNode && typeof parentNode.appendChild === "function") {
            if (canvas.parentNode !== parentNode) {
                parentNode.appendChild(canvas);
            }
        }
    }

    init () {
        const { numOfCol, numOfRow } = this;
        const sizeMultiplier = 30;
        const width = numOfCol * sizeMultiplier;
        const height = numOfRow * sizeMultiplier;

        this.scene = new THREE.Scene();

        /* const geometry = new THREE.PlaneGeometry(numOfCol, numOfRow);
        const material = new THREE.MeshBasicMaterial({color: "#aaa", opacity:0.5});
        const plane = new THREE.Mesh(geometry, material);
        this.scene.add(plane); */

        this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        this.camera.position.z = 14;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);

        this.canvas = this.renderer.domElement;
    }

    setMatrix (matrix) {
        const { numOfCol, numOfRow } = this;
        const celInit = -(numOfCol / 2) + 0.5;
        const rowInit = numOfRow / 2 - 0.5;

        this.matrix = matrix;

        for (let row = 0; row < matrix.length; row++) {
            this.cubeMatrix[row] = [];

            for (let cel = 0; cel < matrix[row].length; cel++) {
                const geometry = new THREE.CubeGeometry(1, 1, 1);
                const cube = new THREE.Mesh(geometry);

                cube.position.x = celInit + cel;
                cube.position.y = rowInit - row;

                this.cubeMatrix[row][cel] = cube;
                this.scene.add(cube);
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    update () {
        const { cubeMatrix, matrix, scene } = this;

        for (let row = 0; row < matrix.length; row++) {
            for (let cel = 0; cel < matrix[row].length; cel++) {
                const cube = cubeMatrix[row][cel];
                const bgColor = matrix[row][cel];

                if (bgColor) {
                  const material = new THREE.MeshBasicMaterial({color: bgColor, wireframe: true});
                  cube.material = material;
                  scene.add(cube);
                } else {
                  scene.remove(cube);
                }
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}

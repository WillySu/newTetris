import * as THREE from 'three';
import BackImage from "./BackImage";

const BACK_W = 32;
const BACK_H = 32;
const COLORS = [
    "red",
    "green",
    "blue",
    "cyan",
    "magenta",
    "yellow",
    "silver"
];
const TEXTURE_MAP = COLORS.reduce((memo, c) => {
  const canvas = new BackImage({ height: BACK_H, width: BACK_W, color: c });
  const image = canvas.getImage();
  const texture = new THREE.Texture(image);

  image.onload = () => {
    texture.needsUpdate = true;
  };

  memo[c] = texture;

  return memo;
}, {});

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
        const widthAdjust = 2;
        const width = (numOfCol + widthAdjust) * sizeMultiplier;
        const height = numOfRow * sizeMultiplier;
        const zero = new THREE.Vector3(0, -1.5, 0);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        this.camera.position.y = -6;
        this.camera.position.z = 14;
        this.camera.lookAt(zero);

        /* const dirLight = new THREE.DirectionalLight("#fff", 1);
        dirLight.position.set(0, -15, 0);
        dirLight.lookAt(zero);
        dirLight.castShadow = true;
        // dirLight.position.multiplyScalar( 30 );
        this.scene.add(dirLight); */


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
                // const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                // const material = new THREE.MeshStandardMaterial({ wireframe: true });
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ wireframe: true });
                const cube = new THREE.Mesh(geometry, material);

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
                  // cube.material.color.set(bgColor);
                  // cube.material.wireframe = false;
                  // scene.add(cube);
                  cube.material.map = TEXTURE_MAP[bgColor];
                  cube.material.wireframe = false;
                } else {
                  cube.material.map = null;
                  cube.material.color.set('white');
                  cube.material.wireframe = true;
                  // scene.remove(cube);
                }

                cube.material.needsUpdate = true;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}

import Phaser from "phaser"
import ButterflyBody from "./ButterflyBody"
export default class Butterfly extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.sol;
        this.head;
        this.sor;
        this.butteryflyBody;
        this.wl;
        this.wr;
        this.init();
        this.setScale(0.55)
        scene.add.existing(this);
    }

    init() {
        let butterfly = [];
        this.sol = new ButterflyBody(this.scene, { x: 360, y: 180, textureName: 'but_bx1' }, { x: 450, y: 0, textureName: 'but_shw_sol' }, 't')
        this.head = new ButterflyBody(this.scene, { x: 780, y: 150, textureName: 'but_bx2' }, { x: 405, y: 200, textureName: 'but_shw_head' }, 'p')
        this.sor = new ButterflyBody(this.scene, { x: 1220, y: 180, textureName: 'but_bx3' }, { x: 870, y: 0, textureName: 'but_shw_sor' }, 'l')
        this.butteryflyBody = new ButterflyBody(this.scene, { x: 750, y: 1000, textureName: 'but_bx5' }, { x: 500, y: 700, textureName: 'but_shw_body' }, 'a')
        this.wl = new ButterflyBody(this.scene, { x: 150, y: 600, textureName: 'but_bx4' }, { x: 0, y: 400, textureName: 'but_shw_wl' }, 'b')
        this.wr = new ButterflyBody(this.scene, { x: 1400, y: 500, textureName: 'but_bx6' }, { x: 800, y: 400, textureName: 'but_shw_wr' }, 'r')
        butterfly.push(this.wl.children, this.wr.children, this.sol.children, this.sor.children, this.butteryflyBody.children, this.head.children);
        let arr = [].concat.apply([], butterfly);
        this.add(arr)
    }

    highlightBody(type) {
        switch (type) {
            case 't':
                this.sol.highlight();
                break;
            case 'p':
                this.head.highlight();
                break;
            case 'l':
                this.sor.highlight();
                break;
            case 'b':
                this.wl.highlight();
                break;
            case 'a':
                this.butteryflyBody.highlight();
                break;
            case 'r':
                this.wr.highlight();
                break;
        }
    }
}
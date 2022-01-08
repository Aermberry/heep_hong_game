import Phaser from "phaser"
import ButterflyBody from "./ButterflyBody"
export default class Butterfly extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.init();
        this.setScale(0.7)
        scene.add.existing(this);

    }

    init() {
        let butterfly = [];
        let sol = new ButterflyBody(this.scene, { x: 400, y: 0, textureName: 'but_bx1' }, { x: 550, y: 0, textureName: 'but_shw_sol' }, 't')
        let head = new ButterflyBody(this.scene, { x: 540, y: 150, textureName: 'but_bx2' }, { x: 665, y: 200, textureName: 'but_shw_head' }, 'p')
        let sor = new ButterflyBody(this.scene, { x: 900, y: 0, textureName: 'but_bx3' }, { x: 760, y: 0, textureName: 'but_shw_sor' }, 'l')
        let body = new ButterflyBody(this.scene, { x: 600, y: 450, textureName: 'but_bx5' }, { x: 630, y: 300, textureName: 'but_shw_body' }, 'a')
        let wl = new ButterflyBody(this.scene, { x: 0, y: 300, textureName: 'but_bx4' }, { x: 0, y: 150, textureName: 'but_shw_wl' }, 'b')
        let wr = new ButterflyBody(this.scene, { x: 1000, y: 250, textureName: 'but_bx6' }, { x: 800, y: 150, textureName: 'but_shw_wr' }, 'r')

        butterfly.push(wl, wr, sol, head, sor, body);
        let arr = [].concat.apply([], butterfly);
        this.add(arr)
    }
}
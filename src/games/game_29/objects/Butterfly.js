import Phaser from "phaser"
import ButterflyBody from "./ButterflyBody"
import Animals from "./Animals"
export default class Butterfly extends Phaser.GameObjects.Container {
    constructor(scene, x, y, typeArr = []) {
        super(scene, x, y)
        this.sol;
        this.head;
        this.sor;
        this.typeArr = typeArr;
        this.butteryflyBody;
        this.wl;
        this.wr;
        this.init();
        this.setScale(0.55)
        scene.add.existing(this);
    }

    init() {
        if (this.typeArr.length > 0) {
            let arr = [];
            this.typeArr.forEach((key, i) => {
                let textureName = key == 'l' ? 'cha1' : key == 't' ? 'cha2' : key == 'r' ? 'cha3' : key == 'a' ? 'cha4' : key == 'p' ? 'cha5' : 'cha6';
                let x, y = 0;
                if(i == 0) {
                    x = -150;
                } else if(i==1) {
                    x = -550;
                    y = 600;
                } else {
                    x = 200;
                    y = 600;
                }
                arr.push(new Animals(this.scene, { x: this.x + x, y: this.y + y, textureName: textureName }, key))
            })
            this.add(arr)
        } else {
            let butterfly = [];
            this.sol = new ButterflyBody(this.scene, { x: 360, y: 180, textureName: 'but_bx1' }, { x: 450, y: 0, textureName: 'but_shw_sol' }, 't')
            this.head = new ButterflyBody(this.scene, { x: 780, y: 150, textureName: 'but_bx2' }, { x: 605, y: 200, textureName: 'but_shw_head' }, 'p')
            this.sor = new ButterflyBody(this.scene, { x: 1220, y: 180, textureName: 'but_bx3' }, { x: 870, y: 0, textureName: 'but_shw_sor' }, 'l')
            this.butteryflyBody = new ButterflyBody(this.scene, { x: 750, y: 1000, textureName: 'but_bx5' }, { x: 380, y: 400, textureName: 'but_shw_body' }, 'a')
            this.wl = new ButterflyBody(this.scene, { x: 150, y: 600, textureName: 'but_bx4' }, { x: 0, y: 400, textureName: 'but_shw_wl' }, 'b')
            this.wr = new ButterflyBody(this.scene, { x: 1400, y: 500, textureName: 'but_bx6' }, { x: 800, y: 400, textureName: 'but_shw_wr' }, 'r')
            butterfly.push(this.wl.children, this.wr.children, this.sol.children, this.sor.children, this.butteryflyBody.children, this.head.children);
            let arr = [].concat.apply([], butterfly);
            this.add(arr)
        }

    }

    highlightBody(type) {
        if(this.typeArr.length > 0) {
            this.list.forEach(son => {
                if(son.type == type) {
                    son.highlight();
                }
            });
        }else{
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
}
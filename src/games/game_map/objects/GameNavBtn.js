import BasicBtn from './BasicBtn'
import Phaser from 'phaser'

export default class GameNavBtn extends BasicBtn {
    constructor(scene,x,y,imageName, gamePath){
        super(scene, x, y,[]);

        this.gamePath = gamePath
        let sprite =  scene.add.sprite(0, 0, imageName)
        this.create(sprite,this.onClick.bind(this))

    }

    create(sprite, handler) {
        super.create(sprite, handler)
        this.onBtnMount()
    }

    onClick(){
        if(typeof this.gamePath == 'string') {
            window.location.href = this.gamePath;
        }
    }

    onBtnMount() {
        this.setY(this.y - 100)
        this.scene.tweens.add({
            targets: this,
            y: '+=100',
            duration: 700,
            ease: Phaser.Math.Easing.Bounce.Out
        })
    }

}
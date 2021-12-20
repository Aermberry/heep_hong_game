import BasicBtn from './BasicBtn'
import Phaser from 'phaser'

export default class GameNavBtn extends BasicBtn {
    constructor(scene,x,y,imageName, gamePath){
        super(scene, x, y,[]);

        this.dataModal = this.scene.sys.game.globals.model;
        this.gamePath = gamePath
        let sprite =  scene.add.sprite(0, 0, imageName)
        this.create(sprite,this.onClick.bind(this))

    }

    create(sprite, handler) {
        super.create(sprite, handler)
        this.onBtnMount()
    }

    async onClick(){
        if(typeof this.gamePath == 'string') {
            const navigationResult = await this.dataModal.vueRouter.push(this.gamePath)
            if(navigationResult) {
                setTimeout(
                    ()=> {
                        document.querySelector('#game-container canvas').requestFullscreen()
                    },
                    500
                )

            }
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
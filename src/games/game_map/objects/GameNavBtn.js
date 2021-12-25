import BasicBtn from './BasicBtn'
import Phaser from 'phaser'

export default class GameNavBtn extends BasicBtn {
    constructor(scene,x,y,imageName, gamePath){
        super(scene, x, y,[]);

        this.dataModal = this.scene.sys.game.globals.model;
        this.gamePath = gamePath
        let sprite =  scene.add.sprite(0, 0, imageName)
        this.create(sprite,this.onClick.bind(this))
        sprite.on('pointerup', this.onPointerUp.bind(this))

    }

    create(sprite, handler) {
        super.create(sprite, handler)
        this.onBtnMount()
    }
    
    async onPointerUp() {
        if(typeof this.gamePath == 'string') {
            await this.dataModal.vueRouter.push(this.gamePath)

            const fullscreenConfig = { navigationUI: 'hide' }
            setTimeout(
                ()=> {
                    const elem = document.querySelector('#game-container canvas');
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen(fullscreenConfig);
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen(fullscreenConfig);
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen(fullscreenConfig);
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen(fullscreenConfig);
                    }
                },
                500
            )
        }

    }

    async onClick(){

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
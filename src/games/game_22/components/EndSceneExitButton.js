import BasicButton from './BasicButton'

export default class EndSceneExitBtn extends BasicButton {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        let sprite =  scene.add.sprite(0, 0, 'gameEndExitBtn')
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        this.sound.play('buttonEffectSound');
        window.history.back();
    }

}
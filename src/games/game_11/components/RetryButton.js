import BasicButton from './BasicButton'

export default class RetryBtn extends BasicButton {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        let sprite =  scene.add.sprite(0, 0, 'rplBtn')
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        this.scene.scene.start('Tutor')
    }

    down(clickEvent) {
        this.origSprite.setFrame(1)
        super.down(clickEvent)
      }
}
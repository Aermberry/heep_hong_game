import BasicBtn from './BasicBtn'

export default class RetryBtn extends BasicBtn {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        let sprite =  scene.add.sprite(0, 0, 'rplBtn')
        sprite.setDisplaySize(368, 160);
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        this.scene.sound.stopAll();
        this.scene.scene.start('Preloader');
    }

}
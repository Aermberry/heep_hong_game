import BasicBtn from './BasicBtn'

export default class RetryBtn extends BasicBtn {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        let sprite =  scene.add.sprite(0, 0, 'rplBtn')
        sprite.setDisplaySize(270, 100);
        this.End_pic = scene.sound.add('End_pic')
        this.End_pic.setLoop(false)
        this.End_pic.play()
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        this.scene.scene.start('Tutor');
        this.End_pic.stop();
        console.log(this.scene);
    }

}
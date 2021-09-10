import BasicBtn from './BasicBtn'

export default class EndSceneExitBtn extends BasicBtn {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        let sprite =  scene.add.sprite(0, 0, 'gameEndExitBtn')
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        window.history.back();
    }

}
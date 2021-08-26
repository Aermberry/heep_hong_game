import BasicBtn from './BasicBtn'

export default class ExistBigBtn extends BasicBtn {

    constructor(scene, x, y, children) {
        super(scene, x, y, children)

        let sprite =  scene.add.sprite(0, 0, 'extBtn')
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        window.history.back();
    }

}
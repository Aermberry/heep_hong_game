import BasicBtn from './BasicBtn'

export default class BackBtn extends BasicBtn {

    constructor(scene,x,y){
        super(scene, x, y,[]);

        let sprite =  scene.add.sprite(0, 0, 'backBtn')
        sprite.setScale(0.8)
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){

        window.history.pushState({},"", '/game/world');
        this.scene.scene.start('Preloader')
        
    }

}
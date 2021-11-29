import BasicBtn from './BasicBtn'

export default class BackBtn extends BasicBtn {

    constructor(scene,x,y){
        super(scene, x, y,[]);

        let sprite =  scene.add.sprite(0, 0, 'backBtn')
        this.create(sprite,this.onClick.bind(this))
    
    }

    onClick(){
        
        this.scene.scene.start('Preloader')
        
    }

}
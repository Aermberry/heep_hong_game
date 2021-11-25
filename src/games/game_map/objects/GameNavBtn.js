import BasicBtn from './BasicBtn'

export default class GameNavBtn extends BasicBtn {
    constructor(scene,x,y,imageName, gamePath){
        super(scene, x, y,[]);

        this.gamePath = gamePath
        let sprite =  scene.add.sprite(0, 0, imageName)
        this.create(sprite,this.onClick.bind(this))
    
      }
    
      onClick(){
        if(typeof this.gamePath == 'string') {
            window.location.href = this.gamePath;
        }
      }
}
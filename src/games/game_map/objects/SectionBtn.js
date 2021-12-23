import BasicBtn from './BasicBtn'

export default class SectionBtn extends BasicBtn {
    constructor(scene, x, y, imageName, sectionKey){
        super(scene, x, y,[]);
    
        this.sectionKey = sectionKey
        let sprite =  scene.add.sprite(0, 0, imageName)
        this.create(sprite,this.onClick.bind(this))
    
      }
    
      onClick(){


          // document.getElementById("content").innerHTML = response.html;
          // document.title = response.pageTitle;
          window.history.pushState({},"", '/game/world/' + this.sectionKey[this.sectionKey.length-1]);
          this.scene.scene.start(this.sectionKey)
      }
}
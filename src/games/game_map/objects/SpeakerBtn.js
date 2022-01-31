import BasicBtn from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene,x,y){
    super(scene, x, y,[]);

    this.scene = scene
    if(this.scene.dataModel.bgMusicPlaying){
      this.scene.gameMusic.play()
    }
    let sprite =  scene.add.sprite(0, 0, 'offSpeakerBtn')
    this.create(sprite,this.onClick.bind(this))


  }

  onClick(){
    if(this.scene.dataModel.bgMusicPlaying){
      this.scene.gameMusic.mute = true
      this.scene.dataModel.bgMusicPlaying = false
    }else{
      this.scene.gameMusic.mute = false
      this.scene.dataModel.bgMusicPlaying = true
    }
  }

}

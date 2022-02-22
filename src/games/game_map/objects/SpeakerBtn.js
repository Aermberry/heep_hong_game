import BasicBtn from './BasicBtn';

export default class SpeakerBtn extends BasicBtn {
  constructor(scene,x,y){
    super(scene, x, y,[]);

    this.scene = scene
    if(this.scene.dataModel.bgMusicPlaying){
      this.scene.gameMusic.play()
    }
    this.sprite =  scene.add.sprite(0, 0, this.scene.dataModel.bgMusicPlaying ? 'speakerBtn' : 'offSpeakerBtn')
    this.sprite.setScale(0.8)
    this.create(this.sprite,this.onClick.bind(this))

  }

  onClick(){

    if(this.scene.dataModel.bgMusicPlaying){
      this.scene.gameMusic.stop()
      this.scene.dataModel.bgMusicPlaying = false
    }else{
      this.scene.gameMusic.play()
      this.scene.dataModel.bgMusicPlaying = true
    }
    this.sprite.setTexture(this.scene.dataModel.bgMusicPlaying ? 'speakerBtn' : 'offSpeakerBtn')

  }

}

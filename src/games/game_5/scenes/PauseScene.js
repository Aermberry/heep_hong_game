import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Pause');
  }

  preload () {

    //Bg image need to replace with a universalize image
    this.load.image('bg_title', require('../assets/Title.png'))

  }

  create () {    

    //已經連續遊玩超過15分鐘了
    //Begin time
    //update on landing gaming page, 
    //if last update is not exist or last update is 15 minute before current time, 
    //on press resume
    //update implement in vue



    //Last update time
    //Update on every 30 seconds, update implement in vue
    


    //if last update time is 15 minutes larger than begin time, scene.pause
    //Popup ask user to rest for 5minutes, or press resume to continue play



  }
}

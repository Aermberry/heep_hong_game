import BasicBtn from './BasicBtn'

export default class SectionBtn extends BasicBtn {
    constructor(scene, x, y, imageName, sectionKey){
        super(scene, x, y,[]);

        this.sectionKey = sectionKey
        let sprite =  scene.add.sprite(0, 0, imageName)
        this.create(sprite,this.onClick.bind(this))
        this.clickSound = this.scene.sound.add('zoom', {volume: 4})

      }

      onClick(){

        const fullscreenConfig = { navigationUI: 'hide' }

        const elem = document.querySelector('#game-container canvas');
        if (elem.requestFullscreen) {
            elem.requestFullscreen(fullscreenConfig);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(fullscreenConfig);
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(fullscreenConfig);
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(fullscreenConfig);
        }

        // document.getElementById("content").innerHTML = response.html;
        // document.title = response.pageTitle;
        window.history.pushState({},"", '/game/world/' + this.sectionKey[this.sectionKey.length-1]);
        this.clickSound.play()
        this.scene.scene.start(this.sectionKey)
      }
}
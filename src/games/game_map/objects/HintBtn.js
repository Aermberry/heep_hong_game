import BasicBtn from './BasicBtn'

export default class HintBtn extends BasicBtn {
    // constructor(scene,x,y, hintImageName, logoImageName = null){
    constructor(scene,x,y, gameBtns = [], logoImageName = null){
        super(scene, x, y,[]);

        // this.hintImageName = hintImageName
        let sprite =  scene.add.sprite(0, 0, typeof logoImageName === 'string'? logoImageName : 'hintBtn')
        this.create(sprite,this.onClick.bind(this))
        this.gameBtns = gameBtns

        this.clickSound = this.scene.sound.add('info')
    
    }

    onClick(){
        
        this.createHintSceeen()
        this.origSprite.setFrame(0)
        this.clickSound.play()
        
    }

    createHintSceeen() {

        // this.hintScreen = this.scene.add.image(this.scene.getColWidth(6), this.scene.getRowHeight(6), this.hintImageName)
        // this.scene.bringToTop(this.hintSprite)
        
        this.screenCover = this.scene.add.renderTexture(0, 0, this.scene.getColWidth(12), this.scene.getRowHeight(12))
        this.screenCover.fill('0x000000', 0.3)

        this.gameBtns.forEach((gameBtn)=> {
            if(typeof gameBtn.showHint === 'function') gameBtn.showHint();
        })

        this.screenCover.setInteractive()
        .on('pointerdown', this.down.bind(this, ()=> {
            this.origSprite.setFrame(0)
            this.gameBtns.forEach((gameBtn)=> {
                if(typeof gameBtn.hideHint === 'function') gameBtn.hideHint();
            })
            // this.hintScreen.destroy()
            this.screenCover.destroy()
        }));

    }
}
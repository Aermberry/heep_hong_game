import BasicBtn from './BasicBtn'

export default class HintBtn extends BasicBtn {
    // constructor(scene,x,y, hintImageName, logoImageName = null){
    constructor(scene,x,y, gameBtns = [], logoImageName = null){
        super(scene, x, y,[]);

        let sprite =  scene.add.sprite(0, 0, typeof logoImageName === 'string'? logoImageName : 'hintBtn')
        this.create(sprite,this.onClick.bind(this))
        this.gameBtns = gameBtns

        this.clickSound = this.scene.sound.add('info')

        this.isOpen = false
    
    }

    onClick(){
        
        if(this.isOpen === true) return;

        this.isOpen = true

        this.createHintSceeen()
        this.origSprite.setFrame(0)
        this.clickSound.play()
        
    }

    createHintSceeen() {

        this.screenCover = this.scene.add.renderTexture(0, 0, this.scene.getColWidth(12), this.scene.getRowHeight(12))
        this.screenCover.fill('0x000000', 0.01)
        this.screenCover.setDepth(10)

        this.backDrop = this.scene.add.renderTexture(0, 0, this.scene.getColWidth(12), this.scene.getRowHeight(12))
        this.backDrop.fill('0x000000', 0.3)
        this.backDrop.setDepth(7)

        this.setDepth(9)

        this.gameBtns.forEach((gameBtn)=> {
            if(typeof gameBtn.showHint === 'function') gameBtn.showHint();
            gameBtn.setDepth(9)
        })

        this.screenCover.setInteractive()
        .on('pointerdown', this.down.bind(this, ()=> {
            this.origSprite.setFrame(0)
            this.gameBtns.forEach((gameBtn)=> {
                if(typeof gameBtn.hideHint === 'function') gameBtn.hideHint();
                gameBtn.setDepth(6)
            })
            this.setDepth(6)
            this.backDrop.destroy()
            this.screenCover.destroy()
            this.isOpen = false
        }));

    }
}
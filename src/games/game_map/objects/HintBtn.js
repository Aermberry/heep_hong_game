import BasicBtn from './BasicBtn'

export default class HintBtn extends BasicBtn {
    constructor(scene,x,y, hintImageName, logoImageName = null){
        super(scene, x, y,[]);

        this.hintImageName = hintImageName
        let sprite =  scene.add.sprite(0, 0, typeof logoImageName === 'string'? logoImageName : 'hintBtn')
        this.create(sprite,this.onClick.bind(this))

        this.clickSound = this.scene.sound.add('info')
    
    }

    onClick(){
        
        this.createHintSceeen()
        this.origSprite.setFrame(0)
        this.clickSound.play()
        
    }

    createHintSceeen() {
        this.hintScreen = this.scene.add.image(this.scene.getColWidth(6), this.scene.getRowHeight(6), this.hintImageName)
        // this.scene.bringToTop(this.hintSprite)
        
        this.hintScreen.setInteractive()
        .on('pointerdown', this.down.bind(this, ()=> {
            this.origSprite.setFrame(0)
            this.hintScreen.destroy()
        }));
    }
}
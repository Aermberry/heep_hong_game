import Phaser from 'phaser'
import ConfirmButton from './ConfirmButton';
import ResetButton from './ResetButton';

export default class AnswerPanel extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'backgroundLabelAnswer').setScale(0.5);

        // console.log("texture: %o", this.texture.displayWidth);
        this.confirmButton = new ConfirmButton(scene, 800, 15);
        this.resetButton = new ResetButton(scene, 650, 0);
        this.labelText = this.scene.make.text({
            x: -this.texture.displayWidth/2,
            y: -10,
            text: '大手大脚啊升级换代看撒娇卡上',
            style:  {
                fontSize: '55px',
                fontFamily: 'Arial',
                // backgroundColor:'#fb022b',
                align: 'justify',
                color: '#fff',
                padding: {
                    left: 50,
                    right: 50,
                    top: 20,
                    bottom: 10,
                }
    
            }
        }).setOrigin(0,0.5);

        this.setSize(this.texture.width, this.texture.height);

        this.add([this.texture, this.labelText, this.confirmButton, this.resetButton]);

    }
}
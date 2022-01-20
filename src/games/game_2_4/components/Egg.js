import Phaser from 'phaser'
import { EggStatus } from './EggStatus';

export default class Egg extends Phaser.GameObjects.Container {

    constructor(scene, point, texture, objectTexture) {

        super(scene, point.x, point.y);

        this.image = texture;
        this.objectTexture = objectTexture;
        this.eggStatus = EggStatus.Normal;

        this.originPoint = { x: point.x, y: point.y }

        this.setName("Egg");

        scene.add.existing(this);

    }

    create() {
        this.background = this.scene.add.sprite(0, 0, this.image, 0).setScale(0.5).setName("background");

        const objectTexture = this.scene.add.image(0, 0, this.objectTexture).setScale(0.48).setName("texture");

        Phaser.Display.Align.In.Center(objectTexture, this.background, -10);

        this.setSize(this.background.displayWidth / 2, this.background.displayHeight / 2);


        this.scene.physics.add.existing(this);

        console.log(this);

        this.add(
            [this.background, objectTexture]
        )



        this.setInteractive({ useHandCursor: true });
        
    }

    setEnableDraggable() {
        this.scene.input.setDraggable(this, true);

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            gameObject.x = dragX;
            gameObject.y = dragY;

            console.log("dragX:%o;dragY:%o", dragX, dragY);
        });
    }
    setDisEnableDraggable() {
        this.scene.input.setDraggable(this, false);
        this.scene.input.removeListener('drag');

    }

    showErrorStatue(callback) {
        this.eggStatus = EggStatus.Failed;
        this.background.setFrame(2);

        if(callback!=null){
            callback();
        }
    }

    showSuccessStatus() {
        this.eggStatus = EggStatus.Success;
        this.background.setFrame(1);
    }

    resetStatue() {
        this.eggStatus = EggStatus.Normal;
        this.background.setFrame(0);
    }
}
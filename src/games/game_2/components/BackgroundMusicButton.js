import Phaser from 'phaser'

export default class BackgroundMusicButton extends Phaser.GameObjects.Container {

    /**
     * 
     * @type {Phaser.Sound.BaseSound} backgroundMusic 
     */
    backgroundMusic

    /**
     *
     * @param { Phaser.Sound.BaseSound} backgroundMusic
     */
    constructor(scene, x, y, backgroundMusic) {

        super(scene, x, y);
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'backgroundMusicButtonOnPlay').setScale(0.8);

        this.backgroundMusic = backgroundMusic;

        this.setSize(this.texture.width, this.texture.height);

        this.add([this.texture]);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

                this.texture.setFrame(1);

                this.onDownClicked();
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.texture.setFrame(0);
                    this.onUpClicked();
                }
            )

        this.backgroundMusic.addListener('pause', () => {
            this.texture.setTexture('backgroundMusicButtonOnPause'); 
        });

        this.backgroundMusic.addListener('resume', () => {
            this.texture.setTexture('backgroundMusicButtonOnPlay'); 
        })
    }

    onDownClicked() {
        this.scene.sound.play('buttonEffectSound');
    }

    onUpClicked() {
        this.backgroundMusic.isPlaying ? this.backgroundMusic.pause() : this.backgroundMusic.resume();
    }

}
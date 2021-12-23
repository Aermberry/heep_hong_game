import Phaser from 'phaser'
import config from '../../game_26/config/index';
import GameColors from '../../game_26/styles/Colors';

export default class LoadProgress extends Phaser.GameObjects.Container {


    constructor(scene) {

        super(scene, 0, 0);

        this.progressBgRect = undefined;
        this.progressRect = undefined;
        this.loadingBar = undefined;
        this.loadingText = undefined;
        this.scene = scene;
        scene.add.existing(this);
    }

    create() {

        const main = this.scene.cameras.main

        /* 进度条的底部背景 */
        this.progressBgRect = new Phaser.Geom.Rectangle(0, 0, 0.5 * main.width, 40);

        Phaser.Geom.Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.95 * main.height)

        /* 进度条的表面层 */
        this.progressRect = Phaser.Geom.Rectangle.Clone(this.progressBgRect);

        this.loadingText = this.scene.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#000'
            }
        });

        this.loadingBar = this.scene.add.graphics();
    }


    onLoadProgress(progress) {

        this.progressRect.width = progress * this.progressBgRect.width;

        this.loadingBar
            .clear()
            .fillStyle(GameColors.darkGray)
            .fillRoundedRect(this.progressBgRect.x, this.progressBgRect.y - 5, this.progressBgRect.width, this.progressBgRect.height)
            .fillStyle(GameColors.green, 1)
            .fillRoundedRect(this.progressBgRect.x, this.progressBgRect.y - 5, this.progressRect.width, this.progressBgRect.height);

        if (progress == 1) {
            this.loadingText.setText('連接完成');
        }

    }


    onLoadComplete(loader, totalComplete, totalFailed, scene,sceneName) {

        if (totalFailed == 0) {
            scene.time.addEvent({
                delay: 500,
                callback: () => {
                    scene.scene.start(sceneName)
                }
            })
        }
    }
}
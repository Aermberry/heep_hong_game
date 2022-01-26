import Phaser from 'phaser'
import config from '../config/index';
import GameColors from '../styles/Colors';

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
        this.progressBgRect = new Phaser.Geom.Rectangle(0, 0, 0.53 * main.width, 10);

        Phaser.Geom.Rectangle.CenterOn(this.progressBgRect, 0.51 * main.width, 0.90 * main.height)

        /* 进度条的表面层 */
        this.progressRect = Phaser.Geom.Rectangle.Clone(this.progressBgRect);

        this.loadingText = this.scene.make.text({
            x: config.width / 2 - 60,
            y: config.height * 0.81,
            text: '連接中',
            style: {
                font: '50px monospace',
                fill: '#000',
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                },
            }
        });

        this.loadingBar = this.scene.add.graphics();

        this.loadingBar.setDefaultStyles({
            fillStyle: {
                color: GameColors.darkGray,
            },
        })
    }


    onLoadProgress(progress) {

        this.progressRect.width = progress * this.progressBgRect.width;

        this.loadingBar
            .clear()
            .fillStyle(GameColors.darkGray)
            .fillRect(this.progressBgRect.x, this.progressBgRect.y - 5, this.progressBgRect.width, this.progressBgRect.height)
            .fillStyle(GameColors.pink, 1)
            .fillRect(this.progressBgRect.x, this.progressBgRect.y - 5, this.progressRect.width, this.progressBgRect.height);

        if (progress == 1) {
            this.loadingText.setText('連接完成');
        }

    }


    onLoadComplete(loader, totalComplete, totalFailed, scene, sceneName) {

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
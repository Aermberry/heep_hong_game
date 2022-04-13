import Phaser from 'phaser'
import config from '../config/index';
import GameColors from '../styles/Colors';

export default class LoadProgress extends Phaser.GameObjects.Container {


    constructor(scene, onCompletedCallback) {

        super(scene, 0, 0);

        this.progressBgRect = undefined;
        this.progressRect = undefined;
        this.loadingBar = undefined;
        this.loadingText = undefined;

        scene.add.existing(this);

        this.init(scene, onCompletedCallback);
    }



    init(scene, onCompletedCallback) {
        const main = scene.cameras.main

        /* 进度条的底部背景 */
        this.progressBgRect = new Phaser.Geom.Rectangle(0, 0, main.width * 0.778, 10);

        Phaser.Geom.Rectangle.CenterOn(this.progressBgRect, main.width / 2, main.height * 0.92 + 5);

        /* 进度条的表面层 */
        this.progressRect = Phaser.Geom.Rectangle.Clone(this.progressBgRect);

        this.loadingText = scene.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff',
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                },
            }
        }).setOrigin(0.5, 0.5);

        this.loadingBar = scene.add.graphics();
        this.loadingBar.setDefaultStyles({
            fillStyle: {
                color: GameColors.darkGray,
            },
        });

        scene.load.on('progress', (params) => {
            this.onLoadProgressCallback(params);
        }
        );

        scene.load.on('complete', (loader, totalComplete, totalFailed) => {
            console.log('执行加载进度条')
            this.onLoadComplete(loader, totalComplete, totalFailed, scene, onCompletedCallback);
        });
    }


    onLoadProgressCallback(progress) {
        this.progressRect.width = progress * this.progressBgRect.width;

        this.loadingBar
            .clear()
            .fillStyle(GameColors.darkGray)
            .fillRect(this.progressBgRect.x, this.progressBgRect.y, this.progressBgRect.width, this.progressBgRect.height)
            .fillStyle(GameColors.pink, 1)
            .fillRect(this.progressBgRect.x, this.progressBgRect.y, this.progressRect.width, this.progressBgRect.height);
    }


    onLoadComplete(loader, totalComplete, totalFailed, scene, callback) {
        console.log({ loader })

        if (loader.totalToLoad == totalComplete) {
            this.loadingText.setText('連接完成');
            scene.time.addEvent({
                delay: 500,
                callback: () => {

                    if (callback != null) {
                        callback();
                    }
                }
            })
        } else {
            this.loadingText.setText('加載失敗');
            console.log({ totalFailed });
        }
    }
}
import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import LeftMoveBtn from '../objects/LeftMoveBtn'
import RightMoveBtn from '../objects/RightMoveBtn'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

        this.exitBtn = undefined
        this.leftMoveBtn = undefined
        this.rightMoveBtn = undefined
        this.stageSlaver = undefined
        this.backgroundLayer = undefined
        this.buttonLayer = undefined
        this.playLayer = undefined


    }

    init() {

        this.dataModal = this.sys.game.globals.model;
        console.log("dataModal:")
        console.log(this.dataModal.gameItems);

    }

    preload() {

        this.buildBg('bgTutor')

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        let music = this.sound.add('drums')
        music.setLoop(true)
        music.play()

        const imageFiles = {
            'itemBam': require('../assets/images/item_bam.png'),
            'itemBamBad': require('../assets/images/item_bam_bad.png'),
            'bg_rock': require('../assets/images/bg_rock.png'),
            'an1': require('../assets/images/an1.png'),
            'an2': require('../assets/images/an2.png'),
            'slash': require('../assets/images/slash.png'),
            'leafLeft': require('../assets/images/swipe_leaf1.png'),
            'leafRight': require('../assets/images/swipe_leaf2.png'),
        };

        const atlasFiles = {
            'headband': { img: require('../assets/anims/headband.png'), data: require('../assets/anims/headband.json') },
            'cat_back': { img: require('../assets/anims/cat_back.png'), data: require('../assets/anims/cat_back.json') },
            'cat_win': { img: require('../assets/anims/cat_win.png'), data: require('../assets/anims/cat_win.json') },
            'cat_sad': { img: require('../assets/anims/cat_sad.png'), data: require('../assets/anims/cat_sad.json') }
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();

    }

    create() {

        super.create();




        const items = this.dataModal.gameItems

        let itemInd = Math.floor(Math.random() * items.length)

        this.item = items[itemInd]

        this.answers = [];

        this.allAnswers = this.dataModal.gameAnswers

        this.allAnswers.some((answer, ind) => {

            if (answer.index === this.item.answer) {

                this.answers.push(this.allAnswers.splice(ind, 1)[0])

                return true;

            }

        })

        this.answers.push(this.allAnswers[Math.floor(this.allAnswers.length * Math.random())])

        this.paintGameScene();

    }

    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
    */
    paintGameScene() {

        this.playLayer = this.add.layer().setDepth(1);
        this.buttonLayer = this.add.layer().setDepth(2);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.exitButton = new ExitBtn(this, 120, 135);
        this.leftMoveButton = new LeftMoveBtn(this, this.getColWidth(10), this.getRowHeight(11));
        this.rightMoveButton = new RightMoveBtn(this, this.getColWidth(11), this.getRowHeight(11));
        this.stageSlaverSprite = this.add.image(this.getColWidth(9), this.getRowHeight(2.5), 'stageSalver').setScale(0.5)

        this.backgroundLayer.add(this.buildBg('bgProgressGame'));
        this.buttonLayer.add([this.exitButton, this.rightMoveButton, this.leftMoveButton])
        this.playLayer.add([this.stageSlaverSprite])
    }


}
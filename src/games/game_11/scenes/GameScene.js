import BasicScene from "./BasicScene"
import CatBack from "../objects/CatBack"
import ItemBam from '../objects/ItemBam'
import CatHand from "../objects/CatHand"
import WinCat from '../objects/Cat'
import LeafGroup from '../objects/LeafGroup'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

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

        this.disableInput = false;

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


        this.buildBg('bg_base');

        this.catBack = new CatBack(this, this.getColWidth(10), this.getRowHeight(9))

        this.catBack.setDepth(7)

        this.catHandWhite = new CatHand(this, this.getColWidth(1.5), this.getRowHeight(7), 'white', this.answerSelected.bind(this), this.answers.splice(Math.floor(Math.random() * this.answers.length), 1)[0])
        this.catHandBlack = new CatHand(this, this.getColWidth(1.5), this.getRowHeight(9.5), 'black', this.answerSelected.bind(this), this.answers.splice(Math.floor(Math.random() * this.answers.length), 1)[0])

        this.bam = new ItemBam(this, this.getColWidth(5), this.getRowHeight(6), this.item)
        this.bam.setDepth(5)

        this.add.existing(this.catHandWhite)
        this.add.existing(this.catHandBlack)
        this.add.existing(this.bam)
        this.add.existing(this.catBack)

        this.bam.moveIn().on('complete', () => {
            this.catHandWhite.moveIn().then((itemSelf) => itemSelf.setDepth(7));
            this.catHandBlack.moveIn().then((itemSelf) => itemSelf.setDepth(7));
        });
        this.catBack.moveIn()
            .then(() => {

                this.leafGroup = new LeafGroup(this, 3, true);

                this.leafGroup.setDepth(8)

                this.add.existing(this.leafGroup)

            });

    }

    answerSelected(catHand) {

        //Need to make sure the catHand is collide with text broad

        if (!this.bam.isInside({ x: catHand.x, y: catHand.y }) || this.disableInput == true) return;

        this.disableInput = true;

        this.leafLeft = this.add.image(this.getColWidth(-9), this.getRowHeight(6), 'leafLeft')
        this.leafRight = this.add.image(this.getColWidth(21), this.getRowHeight(6), 'leafRight')
        this.leafLeft.setDepth(11)
        this.leafRight.setDepth(11)

        //Cat anime, strike anime, remove hand anime.
        this.catBack.strike().on('animationcomplete', () => {

            this.bam.getStrike();

            this.catHandBlack.moveOut();
            this.catHandWhite.moveOut();

            setTimeout(() => {


                let music = this.sound.add('lightBattle')
                music.setLoop(true)
                music.play()

                this.add.tween({
                    targets: this.leafLeft,
                    x: this.getColWidth(21),
                    y: this.getRowHeight(6),
                    duration: 1000,
                    ease: 'Power2'
                });

                this.add.tween({
                    targets: this.leafRight,
                    x: this.getColWidth(-9),
                    y: this.getRowHeight(6),
                    duration: 1000,
                    ease: 'Power2'
                })

                this.bam.customMoveTo(this.getColWidth(9), this.getRowHeight(6), 1500)
                this.catBack.moveTo(this.getColWidth(3), this.getRowHeight(7.5), 1200).then(() => {
                    this.catBack.moveTo(this.getColWidth(-5), this.getRowHeight(7.5), 600).then(() => {
                        let cat = new WinCat(this, this.getColWidth(8), this.getRowHeight(7));
                        cat.setDepth(4)
                        this.add.existing(cat);
                        setTimeout(this.bam.moveOut.bind(this.bam), 200)
                        cat.moveIn().then(() => {

                            setTimeout(() => {
                                //Game win or lose anime
                                if (catHand.getAnswer() == this.item.answer) {

                                    this.bam.breakUp()
                                    cat.gameWin()

                                } else {

                                    this.bam.failedToBreak()
                                    cat.gameFail()

                                }

                                setTimeout(() => {
                                    this.scene.start('End')

                                }, 3000)

                            }, 1000)


                        })


                    })
                })

            }, 800)


        });

    }


}
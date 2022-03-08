import BasicScene from "./BasicScene"
import CatBack from "../objects/CatBack"
import ItemBam from '../objects/ItemBam'
import CatHand from "../objects/CatHand"
import WinCat from '../objects/Cat'
import BackBtn from '../objects/ExitBtn'
import SpeakerBtn from '../objects/SpeakerBtn';
// import Leaf from '../objects/Leaf'
import LeafGroup from '../objects/LeafGroup'
// import Cat from "../objects/Cat"
import Untils from '../../common/Untils'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

    }

    init() {

        this.dataModel = this.sys.game.globals.model;
        this.handInBroad = false;
        this.catHandWhite = null
        this.catHandBlack = null
        this.bam = null
        this.catBack = null
        this.items = []
        this.answers = []
        this.curItem = null
        this.cat = null
        this.introPlayed = false
        this.gameMusic = null

    }

    preload() {

        this.buildBg('bg_tutor')

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        this.gameMusic = this.sound.add('drums', { volume: 0.5, loop: true })
        this.gameMusic.setLoop(true)
        this.dataModel.bgMusicPlaying = true

        let afterMatchMusic = this.sound.add('lightBattle')
        afterMatchMusic.setLoop(true)


        const itemImgList = {
            5: {
                item: require('../assets/images/item_bam.png'),
                itemBad: require('../assets/images/item_bam_bad.png')
            },
            6: {
                item: require('../assets/images/item_board.png'),
                itemBad: require('../assets/images/item_board_bad.png')
            },
            7: {
                item: require('../assets/images/item_brick.png'),
                itemBad: require('../assets/images/item_brick_bad.png')
            },
            8: {
                item: require('../assets/images/item_log.png'),
                itemBad: require('../assets/images/item_log_bad.png')
            },
            9: {
                item: require('../assets/images/item_rock.png'),
                itemBad: require('../assets/images/item_rock_bad.png')
            },
            21: {
                item: require('../assets/images/item_tile.png'),
                itemBad: require('../assets/images/item_tile_bad.png')
            }
        }


        const imageFiles = {
            'itemBam': itemImgList[this.dataModel.gameStage].item,
            'itemBamBad': itemImgList[this.dataModel.gameStage].itemBad,
            'bg_rock': require('../assets/images/bg_rock.png'),
            'an1': require('../assets/images/an1.png'),
            'an2': require('../assets/images/an2.png'),
            'slash': require('../assets/images/slash.png'),
            'leafLeft': require('../assets/images/swipe_leaf1.png'),
            'leafRight': require('../assets/images/swipe_leaf2.png'),
            'fail_smoke': require('../assets/images/fail_smoke.png'),
            'fail_smoke_line': require('../assets/images/fail_smoke_line.png'),
            'fail_smoke_line_small': require('../assets/images/fail_smoke_line_small.png'),
            'fx_hover': require('../assets/images/fx_hover.png'),
            'bamLine': require('../assets/images/line.png')
        }

        const atlasFiles = {
            'cat_back': { img: require('../assets/anims/cat_back.png'), data: require('../assets/anims/cat_back.json') },
            'headband': { img: require('../assets/anims/headband.png'), data: require('../assets/anims/headband.json') },
            'cat_win': {img: require('../assets/anims/cat_win.png'), data: require('../assets/anims/cat_win.json')},
            'cat_sad': {img: require('../assets/anims/cat_sad.png'), data: require('../assets/anims/cat_sad.json')}
        }

        const soundFiles = {
            'jump': require('../assets/audio/jump_and_run-tropics.mp3'),
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles,
            sound: soundFiles
        });

        this.createProgressBar();

    }

    /**
    *   Clear and mutate this.items and this.answers to re-initial game data
    *
    */
    handleGameData(itemLimit) {

        // let allItems = this.dataModel.gameItems
        this.items = this.dataModel.gameItems

        this.items = Untils.shuffle(this.items)

        this.items = this.items.splice(0,itemLimit)

        // this.item = allItems.splice(Math.floor(Math.random() * allItems.length), 1)[0]

        let allAnswers = this.dataModel.gameAnswers

        this.items.forEach((item)=> {

            let answers = [...allAnswers]

            let temp = []

            answers.some((answer, ind) => {

                if (answer.index === item.answer) {

                    temp.push(answers.splice(ind, 1)[0])

                    return true

                }

            })

            temp.push(answers[Math.floor(answers.length * Math.random())])

            this.answers.push(temp)

        })

    }

    initGameRender(item, answers) {

        this.curItem = item

        //Remove and rendering for catHand,catBack,bamItem,

        if(this.catBack != null && typeof this.catBack.destroy === 'function') this.catBack.destroy()
        if(this.catHandWhite != null && typeof this.catHandWhite.destroy === 'function') this.catHandWhite.destroy()
        if(this.catHandBlack != null && typeof this.catHandBlack.destroy === 'function') this.catHandBlack.destroy()
        if(this.bam != null && typeof this.bam.destroy === 'function') this.bam.destroy()
        if(this.cat != null && typeof this.cat.destroy === 'function') this.cat.destroy()

        this.sound.stopAll()
        if (this.dataModel.bgMusicPlaying){
            //this.sound.play('drums')
            this.gameMusic.play()
        }

        if(this.dataModel.gameStage == 21 && !this.introPlayed) {

            this.introPlayed = true
            let introSound = this.sound.add('intro_voice')
            introSound.play()
        }

        this.catBack = new CatBack(this, this.getColWidth(10), this.getRowHeight(9))

        this.catBack.setDepth(7)

        this.catHandWhite = new CatHand(
            this,
            this.getColWidth(1.5),
            this.getRowHeight(7),
            'white',
            this.answerSelected.bind(this),
            this.onSelectingAnswer.bind(this),
            answers.splice(Math.floor(Math.random() * answers.length), 1)[0]
        )
        this.catHandBlack = new CatHand(
            this,
            this.getColWidth(1.5),
            this.getRowHeight(9.5),
            'black',
            this.answerSelected.bind(this),
            this.onSelectingAnswer.bind(this),
            answers.splice(Math.floor(Math.random() * answers.length), 1)[0]
        )

        this.bam = new ItemBam(this, this.getColWidth(5), this.getRowHeight(6), item)
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
        this.disableInput = false

    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.dataModel.gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start'})

        this.disableInput = false;
        this.items = []
        this.answers = []

        this.handleGameData(5)

        this.buildBg('bg_base');

        this.backBtn = new BackBtn(this, 100, 120);

        this.speakerBtn = new SpeakerBtn(this, 1820, 120,this.musicPause.bind(this));

        this.initGameRender(this.items.pop(), this.answers.pop())

        this.leafGroup = new LeafGroup(this, 3, true);

        this.leafGroup.setDepth(8)

        this.add.existing(this.backBtn)
        this.add.existing(this.leafGroup)
        this.add.existing(this.speakerBtn);


    }

    onSelectingAnswer(catHand, pointer , gameObject) {

        if (this.disableInput == true) return;

        if(this.bam.isInside({ x: gameObject.x, y: gameObject.y}) && this.handInBroad == false) {
            this.handInBroad = true;
            this.bam.onHover();

        }

        if(!this.bam.isInside({ x: gameObject.x, y: gameObject.y}) && this.handInBroad == true) {
            this.handInBroad = false;
            this.bam.onLeave();

        }

    }

    answerSelected(catHand) {

        const speedFactory = 0.5

        //Need to make sure the catHand is collide with text broad

        if (!this.bam.isInside({ x: catHand.x, y: catHand.y }) || this.disableInput == true) {

            catHand.toOriginPosTween(500);

            return;
        }

        this.disableInput = true;

        this.leafLeft = this.add.image(this.getColWidth(-9), this.getRowHeight(6), 'leafLeft')
        this.leafRight = this.add.image(this.getColWidth(21), this.getRowHeight(6), 'leafRight')
        this.leafLeft.setDepth(11)
        this.leafRight.setDepth(11)


        this.catHandWhite.disappear();
        this.catHandBlack.disappear();
        // catHand.disappear();

        //Cat anime, strike anime, remove hand anime.
        this.catBack.strike().on('animationcomplete', () => {

            this.bam.getStrike()

            // this.catHandBlack.moveOut();
            // this.catHandWhite.moveOut();

            setTimeout(() => {


                this.sound.stopAll()
                this.sound.play('lightBattle')


                this.add.tween({
                    targets: this.leafLeft,
                    x: this.getColWidth(21),
                    y: this.getRowHeight(6),
                    duration: 1000 * speedFactory,
                    ease: 'Power2'
                });

                this.add.tween({
                    targets: this.leafRight,
                    x: this.getColWidth(-9),
                    y: this.getRowHeight(6),
                    duration: 1000 * speedFactory,
                    ease: 'Power2'
                });

                setTimeout(()=> {

                    this.bam.customMoveTo(this.getColWidth(17), this.getRowHeight(6), 1500 * speedFactory)
                    this.catBack.moveTo(this.getColWidth(3), this.getRowHeight(7.5), 1200 * speedFactory).then(() => {
                        this.catBack.moveTo(this.getColWidth(-5), this.getRowHeight(7.5), 600 * speedFactory).then(() => {
                            this.cat = new WinCat(this, this.getColWidth(8.5), this.getRowHeight(7));
                            this.cat.setDepth(4)
                            this.add.existing(this.cat);
                            setTimeout(this.bam.moveOut.bind(this.bam), 200)
                            this.cat.moveIn().then(() => {

                                setTimeout(() => {
                                    //Game win or lose anime
                                    if (catHand.getAnswer() == this.curItem.answer) {

                                        this.bam.breakUp()
                                        this.cat.gameWin()

                                    } else {

                                        this.bam.failedToBreak()
                                        this.cat.gameFail()

                                    }

                                    setTimeout(()=> {

                                        //Re-initial game stage or end game
                                        if(typeof this.items.length != 'undefined' && this.items.length > 0) {

                                            this.initGameRender(this.items.pop(), this.answers.pop())

                                        }else {
                                            this.scene.start('End')
                                        }


                                        // endPromise()
                                        // this.scene.start('End')

                                    }, 3000 * speedFactory)

                                }, 1000 * speedFactory)

                            })

                        })
                    })
                }, 400 * speedFactory)


            }, 2000 * speedFactory)


        });

    }

    musicPause() {
        if (this.dataModel.bgMusicPlaying){
            this.dataModel.bgMusicPlaying = false
            //this.sound.stopByKey('drums')
            this.gameMusic.pause()
        } else {
            this.dataModel.bgMusicPlaying = true
            //this.sound.play('drums')
            this.gameMusic.resume()
        }

    }


}
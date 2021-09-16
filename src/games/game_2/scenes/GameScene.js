import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
import QuestionBox from '../objects/QuestionBox'
import AnswerBox from '../objects/AnswerBox'
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

    }

    init() {

        this.dataModal = this.sys.game.globals.model;
        console.log(this.dataModal);
        
    }

    preload() {
        this.anims.create({
            key: 'bearJob',
            delay: 200,
            frames: this.anims.generateFrameNames('bear_job', { prefix: 'bear1', start: 0, end: 33, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'wrong',
            delay: 200,
            frames: this.anims.generateFrameNames('wrong', { prefix: 'wrong', start: 0, end: 24, zeroPad: 4}),
            repeat: 1
        });
        this.anims.create({
            key: 'yes',
            delay: 200,
            frames: this.anims.generateFrameNames('yes', { prefix: 'yes', start: 0, end: 24, zeroPad: 4}),
            repeat: 1
        });
    }

    create() {
        super.create();
        this.currentIndex = 0;
        const items = this.dataModal.gameAnswers;
        console.log(items[this.currentIndex]);

        this.buildBg('bg')

        this.disableInput = false;

        let exitBtn = new ExitBtn(this, 120, 135);
        let speakerBtn = new SpeakerBtn(this, this.getColWidth(11), 100);
        let tutq = this.add.sprite(this.getColWidth(8.7), this.getRowHeight(5.8), 'bear_job');
        tutq.play('bearJob');
        this.add.image(this.getColWidth(3.8), this.getRowHeight(8.5),'home');
        this.zhuyuQuestionBox = new QuestionBox(this,this.getColWidth(7.8), this.getRowHeight(6),'yellow',this.answerSelected.bind(this));
        this.weiyuQuestionBox = new QuestionBox(this,this.getColWidth(7.8), this.getRowHeight(8.2),'green',this.answerSelected.bind(this));
        this.zhuyu = new AnswerBox(this,this.getColWidth(2.6), this.getRowHeight(7.7));
        this.weiyu = new AnswerBox(this,this.getColWidth(5.1), this.getRowHeight(7.7))
        this.add.existing(this.zhuyuQuestionBox).setDepth(5)
        this.add.existing(this.weiyuQuestionBox).setDepth(5)
        this.add.existing(this.zhuyu);
        this.add.existing(this.weiyu);
        this.add.existing(exitBtn);
        this.add.existing(speakerBtn);
       
    }

    answerSelected(question) {
        console.log(question)
        if(!this.zhuyu.isInside({ x: question.x, y: question.y })) {
            this.zhuyu.selectAnswer()
        } else if(this.weiyu.isInside({ x: question.x, y: question.y})) {
            this.weiyu.selectAnswer()
        } else {
            question.toOriginPosTween(500);
        }

        // if(this.zhuyu.isInside({ x: question.x, y: question.y })) { 
        //     if(question.getIfTween() == 'home_y') {
        //         console.log(question)
        //         this.zhuyu.selectAnswer(question)
        //     } else if(question.getIfTween() == 'home_g') {
        //         this.weiyu.selectAnswer(question);
        //     }
        // }

        // this.zhuyuQuestionBox.toOriginPosTween(500);
        // this.weiyuQuestionBox.toOriginPosTween(500);

        // if(this.weiyu.isInside({ x: question.x, y: question.y })) {
        //     if(question.getIfTween() == 'home_y') {
        //         this.zhuyu.selectAnswer(question);
        //     } else if(question.getIfTween() == 'home_g') {
        //         this.weiyu.selectAnswer(question);
        //     }   
        // }
        // this.create();
    }

    // weiyuAnswerSelected(question) {
    //     console.log('谓语答案选择');
    //     this.weiyuQuestionBox.toOriginPosTween(500)
    //     if(this.zhuyu.isInside({ x: question.x, y: question.y })) {
    //         this.zhuyu.selectAnswer(question);
    //     }

    //     if(this.weiyu.isInside({ x: question.x, y: question.y })) {
    //         this.weiyu.selectAnswer(question);
    //     }

    // }

}
import GoBtnParent  from "./GoBtnParent";
export default class GoBtn extends GoBtnParent {

    constructor(scene, x, y) {
        super(scene, x, y)
        this.flag = false;
        this.sprite = scene.add.sprite(0, 0, 'goBtn').setScale(1.2)
        this.setDepth(99)
        this.create(this.sprite, this.onClick.bind(this))
        this.isEnable(false);
    }

    setStatus(flag) {
        this.flag = flag;
        this.isEnable(flag)
        if (flag) {
            this.sprite.setFrame(1)
        } else {
            this.sprite.setFrame(0)
        }
    }

    onClick() {        
        if(this.flag) {
            this.scene.question.onGoButtonClcik();
        }
    }
}


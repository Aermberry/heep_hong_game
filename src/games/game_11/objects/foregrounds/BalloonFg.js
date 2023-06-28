import BasicFg from './BasicFg'

export default class BalloonFg extends BasicFg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.setDepth(2)

        this._init()

    }

    _init() {

    }
    
    static getAssetArray() {

        return {
            img: {

            },
            atlas: {

            },
            sound: {
                
            }
        }

    }

}
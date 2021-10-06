import BasicPlayer from './BasicPlayer'

export default class Balloon extends BasicPlayer {

    constructor(scene, x, y, title= 'title') {
        super(scene, x, y)


    }

    toLeftAnimate() {

        return new Promise((resolve)=> {

                resolve()

        })

    }

    toRightAnimate() {
        return new Promise((resolve)=> {

                resolve()

        })

    }

    wrongAnimate() {

    }

    getMovementDuration() {
        return 1000
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
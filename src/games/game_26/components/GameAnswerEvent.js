export default class GameAnswerEvent {

    constructor() {

    }

    addListener(callback) {
        this.on("gameAnswerEvent", (value)=>{
            callback(value);
        })
    }

    PublishEvent(value) {
        this.emit('gameAnswerEvent', value);
    }


}
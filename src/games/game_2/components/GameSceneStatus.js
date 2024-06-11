class GameSceneStatus{

    constructor(status){
        this.status=status;
    }

    getStatus(){
        return this.status;
    }
}

GameSceneStatus.NormalStatus=new GameSceneStatus("NormalStatus");
GameSceneStatus.RetryStatus=new GameSceneStatus("RetryStatus");

Object.freeze(GameSceneStatus);

export {GameSceneStatus};
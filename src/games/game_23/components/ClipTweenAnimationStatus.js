
class ClipTweenAnimationStatus{

    constructor(status){
        this.status=status;
    }

    getStatus(){
        return this.status;
    }
}

ClipTweenAnimationStatus.FallingTweenAnimationStatus=new ClipTweenAnimationStatus("FallingTweenAnimation");
ClipTweenAnimationStatus.MovingTweenAnimationStatus=new ClipTweenAnimationStatus("MovingTweenAnimation");
ClipTweenAnimationStatus.IdleAnimationStatus=new ClipTweenAnimationStatus("IdleAnimation");

Object.freeze(ClipTweenAnimationStatus);

export {ClipTweenAnimationStatus};
export default class BlankRoad { 
    constructor(scene, x, y) { 
        this.container = scene.add.container(x, y);
        this.container.setSize(1220, 99);
    }

    isInside({x, y}) {

        let topLeft = this.container.getTopLeft()

        let bottomRight = this.container.getBottomRight()

        console.log(topLeft, bottomRight)

        let worldBody = {
            "topLeft": {
                x: this.inPosition.x + topLeft.x,
                y: this.inPosition.y + topLeft.y
            },
            "bottomRight": {
                x: this.inPosition.x + bottomRight.x,
                y: this.inPosition.y + bottomRight.y
            }
                        
        }

        return x >= worldBody.topLeft.x && x <= worldBody.bottomRight.x && y >= worldBody.topLeft.y && y <= worldBody.bottomRight.y;
    }

}
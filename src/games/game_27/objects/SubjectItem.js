import Phaser from "phaser";
import SelectCar from "./SelectCar";
export default class SubjectItem extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children)
        scene.add.existing(this);
    }
    add(gameObject) {
        if (!this.list.includes(gameObject)) {
            super.add(gameObject);
        }
        this.reRender();
    }
    remove(gameObject) {
        console.log('remove')
        if (this.list.includes(gameObject)) {
            super.remove(gameObject);
        }
        this.reRender();
    }
    reRender() {
        console.log('render')
        this.list.sort(this.compare('x'))
        this.list.forEach((item, i) => {
            item.x = i == 0 ? 0 : this.list[i - 1].x + this.list[i - 1].width - 20
            if (item instanceof SelectCar) {
                item.y = 230;
            } else {
                item.y = 0;
            }
        })
    }

    compare(p) {
        return function (m, n) {
            var a = m[p];
            var b = n[p];
            return a - b; //升序
        }
    }
}


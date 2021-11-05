
export default class Bsk {
    constructor(scene, x, y) {
        this.status = false;
        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, 'bsk');
    }

    toggleStatus(flag) {
        this.status = flag;
        if (!this.status) {
            let {x,y} = this.sprite
            this.sprite.destroy()
            this.sprite = this.scene.add.sprite(x, y, 'bsk');
        }else {
            let {x,y} = this.sprite
            this.sprite.destroy()
            
            this.sprite =  this.scene.add.sprite(x, y, 'bsk_on');
            this.sprite.setInteractive({
                useHandCursor: true
            });
            this.listen()
        }
    }

    listen() {
        let self = this;
        this.sprite.on('pointerdown', function(){
            let flag = true;
            this.scene.question.forEach((item)=> {
                if(!this.scene.Answers.playerSelectAnswers.includes(item)) {
                    flag = false;
                    return;
                }
            });
            if(flag) {
                self.winner()
            } else {
                self.loser();
            }
        })
    }

    winner() {
        let self = this;
        this.sprite.setDepth(100)
        this.toggleStatus(false);
        this.move(this.sprite, this.sprite.x+1100,this.sprite.y-340,1000).then(()=> {
            self.scene.Answers.playerSelectAnswers.forEach(name => {
                self.scene.Answers.answersView.forEach(o=>{
                    if(o.answera.name == name) {
                        self.move(o.answera, self.sprite.x, self.sprite.y,400)
                        return;
                    }
                })
            })
        })

        setTimeout(function() {
            let win = self.scene.add.sprite(self.sprite.x -200, self.sprite.y - 200, 'correct');
            win.play('correct');
            win.on('onComplete', () => {
                console.log('动画结束')
            })
        }, 1500)

    }

    loser() {
        let self = this;
        this.sprite.setDepth(100)
        this.toggleStatus(false);
        this.move(this.sprite, this.sprite.x+1100,this.sprite.y-340,500).then(()=> {
            self.scene.Answers.playerSelectAnswers.forEach(name => {
                self.scene.Answers.answersView.forEach(o=>{
                    if(o.answera.name == name) {
                        self.move(o.answera, self.sprite.x, self.sprite.y,400)
                        return;
                    }
                })
            })
        })

        setTimeout(function() {
            console.log(self.sprite.x, self.sprite.y)
            let win = self.scene.add.sprite(self.sprite.x, self.sprite.y , 'wrong').setDepth(1000);
            win.play('wrong');
            // win.on('onComplete', () => {
            //     console.log('动画结束')
            // })
        }, 1500)

    }

    move(o, x, y, d = 200) {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: o,
                x: x,
                y: y,
                duration: d,
                ease: 'Power2'
            }).on('complete', () => {
                resolve();
            });
        });
    }

}
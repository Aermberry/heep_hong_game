import Bb from "./BB";

export default class Bsk {
    constructor(scene, x, y) {
        this.status = false;
        this.scene = scene;
        this.bsk = scene.currentLevel == 1 ? 'bsk' : scene.currentLevel == 2 ? 'bag' : 'bkp'
        this.sprite = scene.add.sprite(x, y, this.bsk);
        this.erroNum = 0;
        this.bb = new Bb(this.scene, this.scene.getColWidth(9.2), this.scene.getRowHeight(3));
    }

    refreshZone() {
        this.sprite.setInteractive();
        this.sprite.input.dropZone = true;
    }


    toggleStatus(flag) {
        this.status = flag;
        if (!this.status) {
            let { x, y } = this.sprite
            this.sprite.destroy()
            this.sprite = this.scene.add.sprite(x, y, this.bsk);
            this.sprite.setInteractive();
            this.sprite.input.dropZone = true;
            this.bb.destroy();
        } else {
            let { x, y } = this.sprite
            this.sprite.destroy()
            this.sprite = this.scene.add.sprite(x, y, `${this.bsk}_on`);
            // this.sprite.input.dropZone = true;
            this.bb.play();
            this.sprite.setInteractive({
                useHandCursor: true
            });
            this.listen()
        }
    }

    listen() {
        let self = this;
        this.sprite.on('pointerdown', function () {
            let flag = true;
            this.scene.question.forEach((item) => {
                if (!this.scene.Answers.playerSelectAnswers.includes(item)) {
                    flag = false;
                    return;
                }
            });
            if (flag) {
                self.winner()
            } else {
                self.loser();
            }
        })
    }


    playNextLevelAni() {
        let self = this;
        return new Promise((resolve) => {
            let music = self.scene.sound.add('level_up_bgm');
            music.play();
            let rectangle = self.scene.add.rectangle(self.scene.getColWidth(6), self.scene.getRowHeight(6), 1920, 1080, 0x000000, 0.4);
            rectangle.setDepth(999);
            let pack_bg_1 = self.scene.add.sprite(self.scene.getColWidth(6), self.scene.getRowHeight(8), self.scene.currentLevel == 1 ?
                'pack_bg_1' : self.scene.currentLevel == 2 ? 'pack_bg_2' : 'pack_bg_3').setScale(1);
            pack_bg_1.setDepth(1000)
            let pack_dog = self.scene.add.sprite(self.scene.getColWidth(8), self.scene.getRowHeight(6), 'pack_dog').setDepth(1001);
            pack_dog.play('pack_dog');
            let pack_market = self.scene.add.sprite(self.scene.getColWidth(4), self.scene.getRowHeight(6), self.scene.currentLevel == 1 ?
                'pack_market' : self.scene.currentLevel == 2 ? 'pack_travel' : 'pack_class').setDepth(1001);
            pack_market.play(self.scene.currentLevel == 1 ?
                'pack_market' : self.scene.currentLevel == 2 ? 'pack_travel' : 'pack_class');
            let pack_star = self.scene.add.sprite(self.scene.getColWidth(4), self.scene.getRowHeight(6), 'pack_star').setDepth(1001).setScale(2);
            pack_star.play('pack_star');
            pack_dog.on('animationcomplete', () => {
                music.stop();
                resolve();
            });
        });
    }


    winner() {
        let self = this;
        this.toggleStatus(false);
        this.closeDrop();
        this.move(this.sprite, this.sprite.x + 1100, this.sprite.y - 340, 500, 9999).then(() => {
            self.scene.question.forEach(name => {
                self.scene.Answers.answersView.forEach(o => {
                    if (o.answera.name == name) {
                        self.move(o.answera, self.sprite.x, self.sprite.y, 400)
                        return;
                    }
                })
            })
        })

        setTimeout(function () {
            self.scene.question.forEach(name => {
                self.scene.Answers.answersView.forEach(o => {
                    if (o.answera.name == name) {
                        o.answera.destroy();
                    }
                })
            })
            let { x, y } = self.sprite;
            self.sprite.destroy();
            let win = self.scene.add.sprite(self.sprite.x, self.sprite.y, 'game_correct').setDepth(10000).setScale(3);
            let music = self.scene.sound.add('correct');
            music.play();
            win.play('game_correct');
            win.on('animationcomplete', () => {
                win.destroy();
                let pack = self.scene.add.sprite(x, y, self.scene.currentLevel == 1 ? `pack_market` : self.scene.currentLevel == 2 ? 'pack_travel' : 'pack_class').setDepth(1000).setScale(0.5);
                pack.play(self.scene.currentLevel == 1 ? `pack_market` : self.scene.currentLevel == 2 ? 'pack_travel' : 'pack_class');
                let music = self.scene.sound.add('level_up');
                music.play();
                pack.on('animationcomplete', () => {
                    self.move(pack, 300, -200, 1000, 1000).then(() => {
                        music.stop();
                        //播放一段过场动画 然后切换到第二关
                        pack.destroy();
                        self.playNextLevelAni().then(() => {
                            if (self.scene.currentLevel == 3) {
                                self.scene.scene.start('End')
                            } else {
                                self.scene.scene.start('Game', {
                                    level: self.scene.currentLevel + 1,
                                })
                            }
                        })
                    })
                });
            })
        }, 1500)

    }


    openDrop() {
        this.scene.Answers.answersView.forEach(o => {
            this.scene.input.setDraggable(o.answera, true);
        })
    }

    closeDrop() {
        this.scene.Answers.answersView.forEach(o => {
            this.scene.input.setDraggable(o.answera, false);
        })
    }

    loser() {
        let self = this;
        this.toggleStatus(false);
        this.inPositionX = this.sprite.x
        this.inPositionY = this.sprite.y
        this.closeDrop();
        this.move(this.sprite, this.sprite.x + 1100, this.sprite.y - 340, 500, 9999).then(() => {
            self.scene.Answers.playerSelectAnswers.forEach(name => {
                self.scene.Answers.answersView.forEach(o => {
                    if (o.answera.name == name) {
                        self.move(o.answera, self.sprite.x, self.sprite.y, 400)
                    }
                })
            })
        })
        setTimeout(function () {
            let playerSelectAnswers = self.scene.Answers.playerSelectAnswers;
            self.move(self.sprite, self.sprite.x + 20, self.sprite.y, 200, 9999).then(() => {
                self.move(self.sprite, self.sprite.x - 40, self.sprite.y, 200, 9999).then(() => {
                    self.move(self.sprite, self.sprite.x + 60, self.sprite.y, 200, 9999).then(() => {
                        self.move(self.sprite, self.sprite.x - 40, self.sprite.y, 200, 9999).then(() => {
                            self.move(self.sprite, self.sprite.x + 20, self.sprite.y, 200, 9999).then(() => {
                                self.move(self.sprite, self.sprite.x - 20, self.sprite.y, 200, 9999).then(() => {
                                    self.move(self.sprite, self.inPositionX, self.inPositionY, 400, 9999)
                                    playerSelectAnswers.forEach(name => {
                                        self.scene.Answers.answersView.forEach(o => {
                                            if (o.answera.name == name) {
                                                self.move(o.answera, o.inPosition.x, o.inPosition.y, 400)
                                                return;
                                            }
                                        })
                                    })
                                });
                            });
                        });
                    });
                });
            });
            let win = self.scene.add.sprite(self.sprite.x, self.sprite.y, 'game_wrong').setDepth(10000).setScale(3);
            let music = self.scene.sound.add('wrong');
            music.play();
            win.play('game_wrong');
            win.on('animationcomplete', () => {
                self.scene.Answers.playerSelectAnswers = [];
                win.destroy();
                self.erroNum++;
                if (self.erroNum >= 2) {
                    self.closeDrop();
                    setTimeout(() => {
                        self.demonstrateAnswers();
                    }, 1500);
                } else {
                    self.openDrop();
                }
            });
        }, 1500)
    }

    demonstrateAnswers() {
        let self = this;
        self.scene.question.forEach((name, i) => {
            self.scene.Answers.answersView.forEach(o => {
                if (o.answera.name == name) {
                    self.move(o.answera, 600 + i * 200, 950, 1000)
                    return;
                }
            })
        })
        setTimeout(() => {
            self.winner();
        }, 5000);
    }



    move(o, x, y, d = 200, zIndex = 1000) {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: o,
                x: x,
                y: y,
                duration: d,
                depth: zIndex,
                ease: 'Power2'
            }).on('complete', () => {
                resolve();
            });
        });
    }

}
import Choice from './Choice';

export default class Answers {
    constructor(scene, x, y) {
        let gameData = require('../assets/json/choice.json');
        gameData = gameData[`level${scene.currentLevel}`];
        this.currentLevel = scene.currentLevel;
        this.myCartLength = scene.currentLevel == 1 ? 4 : scene.currentLevel == 2 ? 5 : 6
        this.scene = scene;
        this.answers = [];
        scene.question.forEach(item => {
            this.answers.push(item)
        });


        while (this.answers.length < 12) {
            let random = Math.floor(Math.random() * gameData.length);
            if (!this.answers.includes(gameData[random].name)) {
                this.answers.push(gameData[random].name);
                // gameData.splice(random, 1);
            }
        }

        this.answers = shuffle(this.answers)
        this.answersView = [];
        this.playerSelectAnswers = [];

        this.answers.forEach((item, index) => {
            if (index <= 3) {
                this.answersView.push(new Choice(scene, x + (index * 180), y, item));
            } else if (index <= 7) {
                this.answersView.push(new Choice(scene, x + ((index - 4) * 180), y + 250, item));
            } else {
                this.answersView.push(new Choice(scene, x + ((index - 8) * 180), y + 500, item));
            }
        })

        this.listener();
    }


    listener() {
        let self = this;
        this.scene.input.on('drop', function (pointer, gameObject, dropZone) {
            let shelf = this.scene.shelf.shelfZone;
            if (shelf == dropZone) {
                if (self.playerSelectAnswers.includes(gameObject.name)) {
                    self.playerSelectAnswers.splice(self.playerSelectAnswers.indexOf(gameObject.name), 1);
                    self.scene.bag.toggleStatus(false);
                    self.playerSelectAnswers.forEach((name, i) => {
                        self.answersView.forEach(o => {
                            if (o.answera.name == name) {
                                o.answera.x = 600 + i * 200;
                                o.answera.y = 950;
                                return;
                            }
                        });
                    })
                }
                gameObject.x = gameObject.inPosition.x;
                gameObject.y = gameObject.inPosition.y;
            } else {
                self.scene.bag.toggleStatus(false);
                if (self.playerSelectAnswers.includes(gameObject.name)) {
                    self.playerSelectAnswers.splice(self.playerSelectAnswers.indexOf(gameObject.name), 1);
                    self.scene.bag.toggleStatus(false);
                    self.answersView.forEach(o => {
                        if (o.answera.name == gameObject.name) {
                            o.answera.x = o.inPosition.x
                            o.answera.y = o.inPosition.y;
                            return;
                        }
                    });
                    self.playerSelectAnswers.forEach((name, i) => {
                        self.answersView.forEach(o => {
                            if (o.answera.name == name) {
                                o.answera.x = 600 + i * 200;
                                o.answera.y = 950;
                                return;
                            }
                        });
                    })
                } else {
                    if (self.playerSelectAnswers.length == self.myCartLength) {
                        gameObject.x = gameObject.inPosition.x;
                        gameObject.y = gameObject.inPosition.y;
                    } else {
                        self.playerSelectAnswers.push(gameObject.name);
                        gameObject.x = 400 + self.playerSelectAnswers.length * 200;
                        gameObject.y = 950;
                        if (self.playerSelectAnswers.length == self.myCartLength) {
                            self.scene.bag.toggleStatus(true);
                        }
                    }
                }

            }
        });
    }


}

function shuffle(arr) {
    let m = arr.length;
    while (m > 1) {
        let index = Math.floor(Math.random() * m--);
        [arr[m], arr[index]] = [arr[index], arr[m]]
    }
    return arr;
}

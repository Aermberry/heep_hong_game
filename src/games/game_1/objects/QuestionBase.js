import Phaser from 'phaser';
import _ from 'lodash';
import ChoiceBtn from './ChoiceBtn';
import OrderBtn from './OrderBtn';

export default class QuestionBase extends Phaser.GameObjects.Container {

  constructor(scene, x, y, callback) {
    super(scene,x,y);
    this.scene = scene;
    this.callback = callback;
  }


  init(choice, level, limit){
    let self = this;
    self.level = level;
    self.choice = choice;
    self.items = [];
    self.selectItems = [];
    self.selectItemsLimit = limit;
    self.movedIn = false;
    self.gameDisabled = false;
    self.create();
  }

  create() {
    let self = this;

    self.background = self.scene.add.image(0, 0, 'pnlBg');
    if(self.level < 2){
      self.levelBg = self.scene.add.image(100, -145, 'ph1Bg');
    }else{
      self.levelBg = self.scene.add.image(100, -145, 'ph2Bg');
    }
    self.orderBtn = new OrderBtn(self.scene, 135, 355,self.handleOrderClick.bind(this));
    self.orderBtn.init();

    self.itemRow = 0;
    self.itemRowTemp = 0;
    self.itemColumn = 0;

    _.forEach(self.choice, function(item) {

      if(self.level == 1){
        self.itemRow = item.type-1
        if(self.itemRowTemp != self.itemRow){
          self.itemRowTemp = self.itemRow;
          self.itemColumn = 0;
        }
      }

      if(self.level > 1){
        if(self.itemColumn % 4 == 0){
          if(self.itemColumn > 3){
            self.itemRow++;
          }
          self.itemColumn = 0;
        }
      }

      let choiceBtn = new ChoiceBtn(self.scene, -195 + (self.itemColumn * 200), -370 + (self.itemRow * 230), item, self.handleChoiceClick.bind(this), self.handleChoiceEnable.bind(this), self.isGameNoFreeze.bind(this));
      self.items.push(choiceBtn);

      self.itemColumn++;

    }.bind(this));

    self.add(self.background);
    self.add(self.levelBg);
    self.add(self.orderBtn);
    self.add(self.items);
  }


  handleChoiceClick(choice){
    let self = this; 

    if(self.gameDisabled) return;

    if(choice.selected){
      if(self.handleChoiceEnable()){

        self.selectItems.push(choice.item);

        if(self.level == 1){
          let choiceFind = _.find(self.selectItems, {'type':choice.item.type})
          let choiceBtnFind = _.find(self.items, {'item':choiceFind})
          if(choiceBtnFind.item != choice.item){
            choiceBtnFind.down();
          }
        }

      }
    }else{
      _.pull(self.selectItems, choice.item);
    }

    if(self.handleChoiceEnable()){
      self.orderBtn.setDisable();
    }else{
      self.orderBtn.setEnable();
    }

  }

  handleChoiceEnable(){
    let self = this;
    return self.selectItems.length < self.selectItemsLimit;
  }

  isGameNoFreeze() {
    let self = this;
    return self.gameDisabled;
  }

  handleOrderClick(){
    let self = this;
    if(self.gameDisabled) return;
    self.callback(self.selectItems);
  }

  setBroadDisable(disable) {
    let self = this;
    return self.gameDisabled = disable;
  }

  broadMoveIn() {

    if(this.movedIn) return;
    this.movedIn = true;

    this.scene.tweens.add({
      targets: this,
      x: 585,
      ease: 'Power0',
      duration: 500
    })
  }

}
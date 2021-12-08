import BasicScene from './BasicScene'
import config from '../config/index'
import Choice from '../assets/json/choice.json'

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {

        this.buildBg('bg_title');

        const imageFiles = {
          'bg': require('../assets/img/bg.png'),
          'bag_on': require('../assets/img/bag_on.png'),
          'bag': require('../assets/img/bag.png'),
          'bkp_on': require('../assets/img/bkp_on.png'),
          'bkp': require('../assets/img/bkp.png'),
          'bsk_on': require('../assets/img//bsk_on.png'),
          'bsk': require('../assets/img/bsk.png'),
          'end_box': require('../assets/img/end_box.png'),
          'holder': require('../assets/img/holder.png'),
          'list': require('../assets/img/list.png'),
          'pbag': require('../assets/img/pbag.png'),
          'reg_class': require('../assets/img/reg_class.png'),
          'reg_market': require('../assets/img/reg_market.png'),
          'reg_travel': require('../assets/img/reg_travel.png'),
          's1_shelf': require('../assets/img/s1_shelf.png'),
          's1_sign': require('../assets/img/s1_sign.png'),
          's2_shelf': require('../assets/img/s2_shelf.png'),
          's2_sign': require('../assets/img/s2_sign.png'),
          's3_shelf': require('../assets/img/s3_shelf.png'),
          's3_sign': require('../assets/img/s3_sign.png'),
          'pack_bg_1': require('../assets/img/pack_bg_1.svg'),
          'pack_bg_2': require('../assets/img/pack_bg_2.svg'),
          'pack_bg_3': require('../assets/img/pack_bg_3.svg'),
          'cover_bg': require('../assets/img/cover_bg.png'),
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/tutor1_2.png'), data: require('../assets/img/tutor1_2.json') },
            'tut3': { img: require('../assets/img/tutor3.png'), data: require('../assets/img/tutor3.json') },
            'correct':  { img: require('../assets/img/correct.png'), data: require('../assets/img/correct.json') },
            'end_pic':  { img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json') },
            'entrance_dog': { img: require('../assets/img/entrance_dog.png'), data: require('../assets/img/entrance_dog.json') },
            'entrance_owl':  { img: require('../assets/img/entrance_owl.png'), data: require('../assets/img/entrance_owl.json') },
            'owl_swing':  { img: require('../assets/img/owl_swing.png'), data: require('../assets/img/owl_swing.json') },
            'pack_class':  { img: require('../assets/img/pack_class.png'), data: require('../assets/img/pack_class.json') },
            'pack_dog':  { img: require('../assets/img/pack_dog.png'), data: require('../assets/img/pack_dog.json') },
            'pack_market':  { img: require('../assets/img/pack_market.png'), data: require('../assets/img/pack_market.json') },
            'pack_star':  { img: require('../assets/img/pack_star.png'), data: require('../assets/img/pack_star.json') },
            'pack_travel':  { img: require('../assets/img/pack_travel.png'), data: require('../assets/img/pack_travel.json') },
            'wrong': { img: require('../assets/img/wrong.png'), data: require('../assets/img/wrong.json') },     
            'bb': { img: require('../assets/img/bb.png'), data: require('../assets/img/bb.json') },     

        }

        const soundFiles = {
          'loading': require('../assets/audio/Lonely Witch_short.mp3'),
          'dog_walk_in': require('../assets/audio/Shop Door Bell PE802601.mp3'),
          'stage_items': require('../assets/audio/Magic Bells 03.mp3'),
          'bgm': require('../assets/audio/Bone Yard Waltz - Loopable.mp3'),
          'bubble_hints': require('../assets/audio/owl_1.mp3'),
          'confirm_counting': require('../assets/audio/double_pop.mp3'),
          'wrong': require('../assets/audio/Magic experiment explosion.mp3'),
          'correct': require('../assets/audio/Magic Game Potion Pop Off 4 Cork.mp3'),
          'level_up': require('../assets/audio/Magic.mp3'),
          'level_up_bgm': require('../assets/audio/levelup.mp3'),
          'end_pic': require('../assets/audio/which_brand_of_mustard_shall_i_buy.mp3')
        }

        
        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        let self = this;

        Choice.level1.forEach((item) => {
          self.load.image(item.name, require('../assets/img/LV1/'+item.logo));
          self.load.image(`${item.name} shadow`, require('../assets/img/LV1/'+item.shadow));
        })
    
        Choice.level2.forEach((item) => {
          self.load.image(item.name, require('../assets/img/LV2/'+item.logo));
          self.load.image(`${item.name} shadow`, require('../assets/img/LV2/'+item.shadow));
        })

        Choice.level3.forEach((item) => {
          self.load.image(item.name, require('../assets/img/LV3/'+item.logo));
          self.load.image(`${item.name} shadow`, require('../assets/img/LV3/'+item.shadow));
        })

        self.progressBar = self.add.graphics();
        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff' 
            }
        }); 
        self.loadingText.setOrigin(0.5, 0.5);
    

   
        self.load.on('progress', function (value) {
          self.progressBar.clear();
          self.progressBar.fillStyle(0xFC8EFA, 1);
          self.progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
        });
    
        self.load.on('complete', function () {
          self.loadingText.setText('連接完成');
          self.ready();
        }.bind(self));
    
      }
    
      ready () {
        let self = this
        self.scene.start('Tutor');
        // self.scene.start('Game');
      }

}

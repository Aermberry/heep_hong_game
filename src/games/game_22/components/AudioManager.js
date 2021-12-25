export default class AudioManager {
    constructor() {

        this.questionNumberList = [];

        if (!AudioManager.instance) {
            AudioManager.instance = this;
        }

        return AudioManager.instance;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AudioManager();
        }

        return this.instance;
    }

    playBackgroundMusic(scene, backgroundSound, { startSound }) {

        const clipDollTableEffectSound = scene.sound.add('');

        const backgroundMusic = scene.sound.add(backgroundSound, {
            volume: 0.2,
            loop: true
        });

        if (startSound == null) {
            backgroundSound.play();
        }


        clipDollTableEffectSound.on('complete', () => {
            backgroundMusic.play();
        })

        clipDollTableEffectSound.play();
    }

    
}
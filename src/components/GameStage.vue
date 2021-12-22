<template>
  <div :class="'game-wrapper ' + gameOrientation">
    <div class="outer">
      <div class="inner">
        <div id="game-container" v-if="downloaded" />
        <div class="placeholder" v-else>Downloading ...</div>
      </div>
    </div>
  </div>
</template>

<style>
  @font-face {
    font-family: "STKaitiTC-Black";
    /* src: local("STKaitiTC-Black"), */
    src:url(../games/game_18/assets/font/game_18.ttf) format("truetype");
  }
  @font-face {
    font-family: "Custom-Han-Serif";
    src: url(../games/game_5/assets/font/game_5.ttf) format("truetype");
  }
</style>

<script>
export default {
  name: "Game",
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      ww: 0,
      wh: 0,
    };
  },
  computed: {
    gameID: function () {
      let self = this;
      return self.$route.params.id;
    },
    gameOrientation: function () {
      let self = this;
      return self.wh > self.ww && self.ww < 768 ? "portrait" : "landscape";
    },
  },
  async mounted() {
    let self = this

    const gameFileMapping = {
      5: 5,
      6: 5,
      7: 5,
      8: 5,
      9: 5,
      21: 5,
      11: 11,
      12: 11,
      13: 11,
      14: 11,
      15: 11
    };

    let gameId = self.gameID;

    if(typeof gameFileMapping[self.gameID] != 'undefined') {

      gameId = gameFileMapping[self.gameID];

      console.log(gameId)

    }

    try{
      console.log('game load')

      let gameFile = require('@/games/game_'+gameId+'/index')
      if(gameFile){
        const game = await import('@/games/game_'+gameId+'/index')
        self.downloaded = true
        self.$nextTick(() => {
          self.gameInstance = game.launch(self.$route.params);
        });
      }
    } catch (e) {
      console.log("Game Not Exit");
    }

    self.windowSizeHandler();

    window.addEventListener("resize", function () {
      self.windowSizeHandler();
    });
  },
  destroyed() {
    this.gameInstance.destroy(false);
  },
  methods: {
    windowSizeHandler: function () {
      let self = this;
      self.ww = window.innerWidth;
      self.wh = window.innerHeight;
    },
  },
};
</script>

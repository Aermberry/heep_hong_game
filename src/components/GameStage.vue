<template>
  <div :class="`game-wrapper ${gameOrientation} game-${gameID}`">
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
    src: url(../games/game_18/assets/font/game_18.ttf) format("truetype");
  }
  @font-face {
    font-family: "Custom-STKaitiTC";
    src: url(../games/common/fonts/Custom-STKaitiTC.ttf) format("truetype");
  }
  .game-11 {
    font-family: "Custom-STKaitiTC";
  }
  .game-5 {
    font-family: "Custom-STKaitiTC";
  }
  .game-18 {
    font-family: "Custom-STKaitiTC";
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
      gameFileMapping: {
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
      }
    };
  },
  computed: {
    gameID: function () {
      let self = this;

      let currentGameId = self.$route.params.id
        
      if(typeof self.gameFileMapping[currentGameId] != 'undefined') {

        currentGameId = self.gameFileMapping[currentGameId];

      }
      return currentGameId;
    },
    gameOrientation: function () {
      let self = this;
      return self.wh > self.ww && self.ww < 768 ? "portrait" : "landscape";
    },
  },
  async mounted() {
    let self = this

    let gameId = self.gameID;

    if(typeof self.gameFileMapping[self.gameID] != 'undefined') {

      gameId = self.gameFileMapping[self.gameID];

    }

    try{

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

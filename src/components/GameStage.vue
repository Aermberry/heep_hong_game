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
    font-family: "Custom-STKaitiTC";
    src: url(../games/common/fonts/Custom-STKaitiTC.ttf) format("truetype");
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
      },
      setCookieTimer: null
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

    self.initGameTrackTimer()


  },
  destroyed() {
    this.gameInstance.destroy(false);
    clearInterval(this.setCookieTimer);
  },
  methods: {
    windowSizeHandler: function () {
      let self = this;
      self.ww = window.innerWidth;
      self.wh = window.innerHeight;
    },
    initGameTrackTimer() {
      if(this.setCookieTimer != null) clearInterval(this.setCookieTimer)

      let now = new Date()

      let existingStartTimestamp = localStorage.getItem('game_begin_timestamp')
      let existingLastUpdateTimestamp = localStorage.getItem('game_last_update_timestamp')

      if(!existingStartTimestamp || 
        (existingLastUpdateTimestamp && existingLastUpdateTimestamp > (existingStartTimestamp + 15 * 60 * 1000))) 
      {
        localStorage.setItem('game_begin_timestamp', now.getTime())
        localStorage.setItem('game_last_update_timestamp', now.getTime())
      }

      this.setCookieTimer = setInterval(()=> {
        
        let date = new Date()
        let nowTimestamp = date.getTime()

        localStorage.setItem('game_last_update_timestamp', nowTimestamp)

      }, 30000)
    }
  },
};
</script>

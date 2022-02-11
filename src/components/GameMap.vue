<template lang="">
    <div :class="gameOrientation">
        <div class="outer">
            <div class="inner">
                <div id="game-container" v-if="downloaded" />
                <div class="placeholder" v-else>
                Downloading ...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'GameMap',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      ww:0,
      wh:0
    }
  },
  computed: {
    gameOrientation: function(){
      let self = this
      return (self.wh > self.ww) && self.ww < 768 ? 'portrait' : 'landscape'
    }
  },
  async mounted() {
    let self = this

    try{

      let gameFile = require('@/games/game_map/index')
      if(gameFile){
        const game = await import('@/games/game_map/index')
        self.downloaded = true
        self.$nextTick(() => {
          self.gameInstance = game.launch(self.$route.params, this.$router)
          self.$gamePause.initService(self.gameInstance, 15, 5)
          self.$gamePause.initGameTrackTimer()
        })
      }
    }catch (e){
      console.log('Game Not Exit')
    }

    self.windowSizeHandler()

    window.addEventListener('resize', function() {
      self.windowSizeHandler()
    })


  },
  destroyed() {
    this.gameInstance.destroy(false)
    this.$gamePause.clearTimer()
  },
  methods:{
    windowSizeHandler: function(){
      let self = this
      self.ww = window.innerWidth
      self.wh = window.innerHeight
    }
  }
}
</script>
<style lang="">

</style>
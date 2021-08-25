<template>
  <div :class="'game-wrapper ' + gameOrientation">
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
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      ww:0,
      wh:0
    }
  },
  computed: {
    gameID: function(){
      let self = this
      return self.$route.params.id
    },
    gameOrientation: function(){
      let self = this
      return (self.wh > self.ww) && self.ww < 768 ? 'portrait' : 'landscape'
    }
  },
  async mounted() {
    let self = this
    try{
      console.log('game load')
      let gameFile = require('@/games/game_'+self.gameID+'/index')
      if(gameFile){
        const game = await import('@/games/game_'+self.gameID+'/index')
        self.downloaded = true
        self.$nextTick(() => {
          self.gameInstance = game.launch(self.$route.params)
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

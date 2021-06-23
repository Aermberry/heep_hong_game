<template>
  <div class="game-wrapper">
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
    }
  },
  computed: {
    gameID: function(){
      let self = this
      return self.$route.params.id
    }
  },
  async mounted() {
    let self = this
    try{
      let gameFile = require('@/games/game_'+self.gameID+'/index')
      if(gameFile){
        const game = await import('@/games/game_'+self.gameID+'/index')
        self.downloaded = true
        self.$nextTick(() => {
          self.gameInstance = game.launch()
        })
      }
    }catch (e){
      console.log('Game Not Exit')
    }
  },
  destroyed() {
    this.gameInstance.destroy(false)
  }
}
</script>

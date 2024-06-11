<template>
    <Game />
</template>

<script>
// @ is an alias to /src
import Game from '@/components/GameStage.vue'

export default {
  name: 'About',
  components: {
    Game
  },
  mounted: function() {
    this.$gtag.event('view_item', { 'event_category': 'js_games', 'event_label': 'Game Landing Page 2' })

  },
}
</script>
<template>
  <div class="wrapper">
    <Header />
    <main>
      <div class="container">
        <!-- <div class="content-space"></div> -->
        <div class="content-wrapper game-intro">
          <!-- <div class="game-intro-header">
            <img src="@/assets/images/world notext.svg" alt="">
          </div>

            <a href="/game/world/1" class="link-entry-outline"><span class="inner">進入遊戲1</span></a>
            <a href="/game/world/2" class="link-entry-outline"><span class="inner">進入遊戲2</span></a>
            <a href="/game/world/3" class="link-entry-outline"><span class="inner">進入遊戲3</span></a>
            <a href="/game/world/4" class="link-entry-outline"><span class="inner">進入遊戲4</span></a>
            <a href="/game/world/5" class="link-entry-outline"><span class="inner">進入遊戲5</span></a>
            <a href="/game/world/6" class="link-entry-outline"><span class="inner">進入遊戲6</span></a> -->

            <game-map />

        </div>
        <!-- <div class="content-space"></div> -->
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GameMap from '../components/GameMap.vue'


export default {
  name: 'GameWorld',
  components: {
    Header,
    Footer,
    GameMap
  }
}
</script>
<template>
  <div class="wrapper h-100">
    <Header />
    <ShareBar />
    <main>
      <div class="container">
        <!-- <div class="content-space"></div> -->
        <div class="content-wrapper landing">
          <img src="@/assets/images/img_title.svg" alt="">
          <router-link to="/world" @click.native="onClickHandler" class="link-entry" ><span class="inner">進入遊戲</span></router-link>
          <!-- <a href="/game/world" class="link-entry"><span class="inner">進入遊戲</span></a> -->
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
import ShareBar from '@/components/ShareBar.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    ShareBar
  },
  methods: {
    onClickHandler() {
      setTimeout(
        ()=> {
          document.querySelector('#game-container>canvas').requestFullscreen()
        },
        1000
      )
    }
  },
}
</script>

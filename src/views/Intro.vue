<template>
  <div class="wrapper">
    <Header />
    <ShareBar />
    <main>
      <div class="container">
        <div class="content-space"></div>
        <div class="content-wrapper d-flex">

          <div class="">
            <img src="@/assets/images/img_char_title.svg" alt="">
          </div>
          <div class="">
            <div class="sub-title">本遊戲平台</div>
            <div class="title">簡介</div>
            <div class="lead">協康會賽馬會「吾讀吾識」專業團隊為K2至小三有潛在讀寫困難的兒童量身訂造了三十個網上小遊戲，兒童能在樂園的六大園區暢遊，透過有趣的小遊戲打好語文基礎，提升讀寫能力。本計劃由協康會主辦，「香港賽馬會慈善信托基金」贊助。</div>
            <a href="" class="link-more">按此了解更多</a>
          </div>

        </div>
        <div class="content-space"></div>
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
  }
}
</script>
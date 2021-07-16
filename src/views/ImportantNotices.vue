<template>
  <div class="wrapper">
    <Header />
    <ShareBar />
    <main>
      <div class="container">
        <div class="content-space"></div>
        <div class="content-wrapper normal">
          <div class="content">
            <div class="title">重要告示</div>

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
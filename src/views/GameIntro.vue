<template>
  <div class="wrapper">
    <Header />
    <ShareBar />
    <main>
      <div class="container">
        <div class="content-space"></div>
        <div class="content-wrapper game-intro">
          <div class="game-intro-header">
            <img src="@/assets/images/world notext.svg" alt="">
            <a href="" class="link-entry"><span class="inner">進入遊戲</span></a>
          </div>

          <div class="game-intro-card">
            <div class="cover">
              <img src="@/assets/images/img_space@2x.png" alt="">
            </div>
            <div class="description">
              <div class="inner">
                <div class="sub-title">聽與說</div>
                <div class="title">太空世界</div>
                <div class="lead">訓練學生的語音記憶及提升學生對語素的認識。</div>
                <a href="/game/world/1" class="link-entry-outline"><span class="inner">進入遊戲</span></a>
              </div>
            </div>
          </div>
          <div class="game-intro-card">
            <div class="cover">
              <img src="@/assets/images/img_forest@2x.png" alt="">
            </div>
            <div class="description">
              <div class="inner">
                <div class="sub-title">字形結構</div>
                <div class="title">功夫森林</div>
                <div class="lead">透過切分漢字結構，加強學生對漢字結構及形旁部首的認識。</div>
                <a href="/game/world/2" class="link-entry-outline"><span class="inner">進入遊戲</span></a>
              </div>
            </div>
          </div>
          <div class="game-intro-card">
            <div class="cover">
              <img src="@/assets/images/img_dynamic@2x.png" alt="">
            </div>
            <div class="description">
              <div class="inner">
                <div class="sub-title">語法知識</div>
                <div class="title">動感世界</div>
                <div class="lead">讓學生認識不同種類的詞性、辨析結構助詞、運用不同的標點符號及語法知識。</div>
                <a href="/game/world/3" class="link-entry-outline"><span class="inner">進入遊戲</span></a>
              </div>
            </div>
          </div>
          <div class="game-intro-card">
            <div class="cover">
              <img src="@/assets/images/img_career@2x.png" alt="">
            </div>
            <div class="description">
              <div class="inner">
                <div class="sub-title">閱讀理解</div>
                <div class="title">職業體驗館</div>
                <div class="lead">讓學生認識重組句子、句子理解及段落理解。</div>
                <a href="/game/world/4" class="link-entry-outline"><span class="inner">進入遊戲</span></a>
              </div>
            </div>
          </div>
          <div class="game-intro-card">
            <div class="cover">
              <img src="@/assets/images/img_doodle@2x.png" alt="">
            </div>
            <div class="description">
              <div class="inner">
                <div class="sub-title">寫</div>
                <div class="title">塗鴉天地</div>
                <div class="lead">透過多感官的練習，讓學生認識中文字的正確筆順及組字過程。</div>
                <a href="/game/world/5" class="link-entry-outline"><span class="inner">進入遊戲</span></a>
              </div>
            </div>
          </div>
          <div class="game-intro-card">
            <div class="cover">
              <img src="@/assets/images/img_magic@2x.png" alt="">
            </div>
            <div class="description">
              <div class="inner">
                <div class="sub-title">技巧策略</div>
                <div class="title">魔法街</div>
                <div class="lead">讓學生能透過清單，學習有系統地收拾自己的物品，提升自我管理能力。</div>
                <a href="/game/world/6" class="link-entry-outline"><span class="inner">進入遊戲</span></a>
              </div>
            </div>
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
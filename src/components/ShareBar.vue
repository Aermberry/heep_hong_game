<template>
  <nav id="share-bar">
    <button class="share-media__btn share-facebook" @click.stop="shareMedia('facebook')">
      <span class="at-icon-wrapper svg-container">
        <svg class="svg-icon svg-share icon-facebook" viewBox="0 0 9 17" width="9" height="17">
          <path fill="#fff" fill-rule="evenodd" d="M7.2 2.9H9V.1c-.3 0-.6 0-.9-.1H6.5c-.9 0-1.7.2-2.3.7-.8.6-1.3 1.4-1.4 2.3-.1.4-.1.8-.1 1.2v2.1H0v3.1h2.6v7.8h3.2V9.5h2.6c.1-1 .3-2.1.4-3.1H5.7V4.2c.2-1 .7-1.3 1.5-1.3" clip-rule="evenodd"></path>
        </svg>
      </span>
      <span class="btn-text">Facebook</span>
    </button>
    <button class="share-media__btn share-whatsapp" @click.stop="shareMedia('whatsapp')">
      <span class="at-icon-wrapper svg-container">
        <svg class="svg-icon svg-share icon-whatsapp" viewBox="34.5 34.5 21 21" width="21" height="21">
          <path fill="#fff" d="M55.5 44.7c0 5.7-4.6 10.2-10.3 10.2-1.8 0-3.5-.5-5-1.3l-5.7 1.8 1.9-5.5c-.9-1.5-1.5-3.3-1.5-5.3 0-5.6 4.6-10.2 10.3-10.2 5.7.1 10.3 4.7 10.3 10.3zm-10.3-8.6c-4.8 0-8.7 3.9-8.7 8.6 0 1.9.6 3.6 1.7 5L37.1 53l3.3-1.1c1.4.9 3 1.4 4.8 1.4 4.8 0 8.7-3.9 8.7-8.6 0-4.7-3.9-8.6-8.7-8.6zm5.2 11c-.1-.1-.2-.2-.5-.3s-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.73 6.73 0 0 1-3.4-2.9c-.1-.3 0-.4.1-.5l.4-.4c.1-.1.2-.3.3-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.7 2.8 4.3 3.8 2.6 1 2.6.7 3 .6s1.5-.6 1.7-1.2c.3-.8.3-1.3.2-1.4z"></path>
        </svg>
      </span>
      <span class="btn-text">WhatsApp</span>
    </button>
    <button class="share-media__btn share-wechat" @click.stop="shareMedia('wechat')">
      <span class="at-icon-wrapper svg-container">
        <svg class="svg-icon svg-share icon-wechat" viewBox="0.5 2.7 23 19" width="23" height="19">
          <path fill="#fff" d="M21.1 19.2c1.5-1.1 2.4-2.6 2.4-4.4 0-3.2-3.1-5.8-6.9-5.8-3.8 0-6.9 2.6-6.9 5.8 0 3.2 3.1 5.8 6.9 5.8.8 0 1.6-.1 2.3-.3h.2c.1 0 .3 0 .4.1l1.5.9h.1c.1 0 .2-.1.2-.2v-.2l-.3-1.2v-.1c-.1-.2 0-.3.1-.4zM8.8 2.7C4.2 2.7.5 5.8.5 9.6c0 2.1 1.1 4 2.9 5.2.1.1.2.3.2.5v.2l-.4 1.4v.2c0 .2.1.3.3.3l.2-.1 1.8-1.1c.1-.1.3-.1.4-.1h.2c.8.2 1.8.4 2.7.4h.5c-.2-.5-.3-1.1-.3-1.7 0-3.5 3.4-6.3 7.6-6.3h.5c-.7-3.3-4.1-5.8-8.3-5.8zm5.5 11.2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm4.6 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM6 8.5c-.6 0-1.1-.5-1.1-1.1S5.4 6.3 6 6.3s1.1.5 1.1 1.1S6.7 8.5 6 8.5zm5.6 0c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"></path>
        </svg>
      </span>
      <span class="btn-text">微信</span>
    </button>
    <button class="share-media__btn share-copylink" @click.stop="shareMedia('copylink')">
      <span class="at-icon-wrapper svg-container">
        <svg class="svg-icon svg-share icon-copy" viewBox="-0.9 -3.4 16 17" width="16" height="17">
          <path fill="#fff" d="M12.8 9.6c1.3 0 2.4-1.1 2.4-2.4V-1c0-1.3-1.1-2.4-2.4-2.4H5.1C3.8-3.4 2.7-2.3 2.7-1h1.5c0-.5.4-.8.8-.8h7.7c.5 0 .8.4.8.8v8.2c0 .5-.4.8-.8.8v1.6zM1.2.8C.1.8-.9 2-.9 3.1v8.3c0 1.2.9 2.1 2.1 2.1h7.9c1.2 0 2.1-.9 2.1-2.1V2.9c0-1.2-.9-2.1-2.1-2.1H1.2z"></path>
        </svg>
      </span>
      <span class="btn-text">複製連結</span>
    </button>
  </nav>
</template>


<script>
export default {
  name: 'ShareBar',
  methods: {
    shareMedia (type) {
      switch (type){
        case 'facebook':
          this.popupCenter('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjc-ireadilearn.heephong.org%2F', 'iReadilearn', 520, 350)
          break
        case 'whatsapp':
          window.open('https://api.whatsapp.com/send?text=iReadilearn%0Ahttps%3A%2F%2Fjc-ireadilearn.heephong.org%2F%3Futm_source%3Dwhatsapp%26utm_medium%3Dwebsitesharing%26utm_campaign%3Dwhatsappsharing')
          break
        case 'wechat':
          window.open('https://www.addthis.com/bookmark.php?v=300&winname=addthis&pub=ra-5b9736b2f9e2d52b&source=men-300&lng=zh-hk&s=wechat&url=https%3A%2F%2Fjc-ireadilearn.heephong.org%2F&title=iReadilearn&ate=AT-ra-5b9736b2f9e2d52b/-/-/620da6c938326634/2&frommenu=1&uid=61c183befad01cf0&ct=1&tt=0&captcha_provider=recaptcha2&pro=0')
          break
        case 'copylink':
          this.copyToClipboard('https://jc-ireadilearn.heephong.org/game/').then(function () {
            const x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = "已復製到剪貼板";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
          })
          break
      }
    },
    popupCenter (url, title, w, h) {
      const left = (screen.width / 2) - (w / 2)
      const top = (screen.height / 2) - (h / 2)
      return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
    },
    copyToClipboard(textToCopy) {
      if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(textToCopy)
      } else {
        let textArea = document.createElement("textarea")
        textArea.value = textToCopy
        textArea.style.position = "absolute"
        textArea.style.opacity = 0
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej()
            textArea.remove()
        })
      }
    }
  }
}
</script>
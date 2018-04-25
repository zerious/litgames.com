<template lang="pug">
  div
    header: section
      img.logo(src="/lighter.svg")
      h1 Lit Games
    nav: section
      a.nav(href="/pewpew") Pew Pew
    main: section
      p Welcome my tiny collection of WebVR gaming experiments.
    footer: section
      b &copy; 2018 Lit Games
</template>

<script>
import Mic from '~/assets/mic.js'

export default {
  mounted () {
    const mic = new Mic(() => {}, {})
    console.log(mic)
  }
}
</script>

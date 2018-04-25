<template lang="pug">
  div
    header: section
      img.logo(src="/lighter.svg")
      h1 Lit Games
    nav: section
      a.nav(href="/test") Test
      a.nav(href="/pewpew") Pew Pew
    main: section
      p Welcome to the land of WebVR!
    footer: section
      b &copy; 2018 Lit Games

</template>

<script>
export default {
  mounted () {

  }
}
</script>

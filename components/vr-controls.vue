<template lang="pug">
svg(class="refresh" @click="refresh")
  path(fill="#fff" viewBox="0 0 64 64" d="M52 16l7-7v20h-20l7-7a16 16 0 1 0 0 18l9 4a26 26 0 1 1-1-27z")
</template>

<style>
pre {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
}
div.a-enter-vr,
svg.refresh {
  position: absolute;
  display: block;
  top: 8px;
  height: 64px;
  z-index: 99;
  background: #666;
  border-radius: 8px;
}
svg.refresh {
  right: 108px;
  width: 64px;
}
div.a-enter-vr {
  right: 8px;
  width: 88px;
}
button.a-enter-vr-button {
  width: 88px;
  height: 64px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 64"><path fill="#fff" d="M8 19q0-4.5 4-5l48-6q6-.6 6 5v38q0 5.8-6 5l-16-2l-4-9q-4-9-8-2l-4 9l-16-2q-4-.5-4-5zm7 13a6 9 0 1 0 0-.1zm29 0a7.2 10.8 0 1 0 0-.1zm21-24q3 1 3 4v40q0 3-3 4l10-5q4-2 4-6v-28q0-4-4-6z"/></svg>')!important;
}
</style>

<script>
export default {
  methods: {
    refresh () {
      location.reload()
    }
  }
}
</script>

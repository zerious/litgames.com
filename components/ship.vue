<template lang="pug">
  a-entity.ship(:id="id" :position="position" :rotation="rotation" scale="0.5 0.5 0.5")
    a-entity(position="0 -0.8 -2")
      a-entity(scale=".8 .2 2" position="0 .6 .2")
        a-box(color="#39f" width="1" height="1" depth="1" rotation="0 0 -45")
      a-entity(rotation="-90 0 0")
        a-cylinder(id="cannon" color="#39f" height=".6" radius=".12" position="0 0.4 0.6")
        a-cylinder(color="#39f" height=".6" radius=".12" position="-.6 -1 0.6")
        a-cylinder(color="#39f" height=".6" radius=".12" position=".6 -1 0.6")
        a-cone(color="#f90" opacity="0.7" height=".2" radius-top="0.1" radius-bottom="0" position="-.6 -1.4 0.6")
        a-cone(color="#f90" opacity="0.7" height=".2" radius-top="0.1" radius-bottom="0" position=".6 -1.4 0.6")
        a-cone(color="#ff6" height=".18" radius-top="0.06" radius-bottom="0" position="-.6 -1.4 0.6")
        a-cone(color="#ff6" height=".18" radius-top="0.06" radius-bottom="0" position=".6 -1.4 0.6")
</template>

<script>

export default {
  props: {
    id: { type: String, default: '' },
    position: { type: String, default: '0 0 0' },
    rotation: { type: String, default: '0 0 0' },
    destination: { type: String, default: '' }
  },
  data () {
    return {
      vector: new window.THREE.Vector3(0, 0, 0)
    }
  },
  mounted () {
  }
}
</script>

<template lang="pug">
//- Turn off server-side rendering.
no-ssr
  //- Allow the desktop version to fire the cannon by clicking.
  a-scene(@click="fire")

    //- Show icons for
    vr-controls

    //- Show the Milky Way in the background.
    a-sky(id="stars" src="/milky-way.jpg" :position="position")

    //- Checkerboard grid (currently disabled).
    a-entity(key="grid" v-if="false")
      a-entity(v-for="x in gridSize" :key="x" :position="`${(x - gridSize / 2 - 0.5) * gridSpacing} 0 0`")
        a-plane(v-for="z in gridSize" :key="z" :position="`0 0 ${(z - gridSize / 2 - 0.5) * gridSpacing}`" :width="gridSpacing" :height="gridSpacing" rotation="-90 0 0" :color="`${(x + z) % 2 ? '#222': '#444'}`")

    //- Show your own ship.
    a-entity
      a-camera(id="camera" look-controls)
      ship(id="ship")

    //- Show other ships.
    ship(v-for="ship in ships" :id="ship.id" :key="ship.id" :position="ship.position" :rotation="ship.rotation" :destination="ship.destination" :duration="shipDuration")

    //- Show blaster beams.
    a-cylinder(v-for="blast in blasts" :key="blast.id" color="#0c0" radius=".08" :rotation="`${blast.rotation}`")
      a-animation(attribute="position" :from="`${blast.start}`" :to="`${blast.end}`" :duration="blastDuration")
      a-animation(attribute="height" :from="1" :to="1000" :duration="blastDuration")
</template>

<script>
import controls from '~/components/vr-controls'
import Vue from 'vue'
import ship from '~/components/ship'
import socket from '~/plugins/io/client'
import Mic from '~/assets/mic'

// Ship speeds.
const FORWARD_SPEED = 0.05
const TURN_SPEED = 0.02

// Timings for movement and socket.io positional reporting.
const ANIMATION_INTERVAL = 10
const BROADCAST_INTERVAL = 100

// Blaster beam configuration.
const BLAST_DURATION = 100
const BLAST_LENGTH = 1000

// Radians-to-degrees multiplier.
const DEGREES = 180 / Math.PI

// Incrementer for blast IDs.
let blastId = 0

// Pew Pew Game.
export default {
  components: {
    ship,
    'vr-controls': controls
  },

  // Initial state.
  data () {
    return {
      camera: null,
      position: '0 0 0',
      rotation: '0 0 0',
      velocity: '0 0 0',
      gridSize: 10,
      gridSpacing: 1000,
      blastDuration: BLAST_DURATION,
      shipDuration: BROADCAST_INTERVAL,
      ships: {},
      blasts: {}
    }
  },

  // Give A-Frame a moment to do its thing.
  mounted () {
    setTimeout(() => this.init())
  },

  methods: {
    // Set up the game.
    init () {
      // Add the camera to the state so we can reference it when firing.
      const scene = window.AFRAME.scenes[0]
      const camera = this.camera = scene.camera
      const view = camera.parent
      camera.rotation.reorder('YXZ')

      // Get a reference to the ship, and add it to the camera view.
      const ship = document.getElementById('ship').object3D
      ship.rotation.reorder('YXZ')
      view.add(ship)

      // Animate.
      setInterval(() => {
        this.position = camera.getWorldPosition()
        const rotation = this.rotation = camera.getWorldRotation()
        const velocity = this.velocity = camera.getWorldDirection().multiplyScalar(FORWARD_SPEED)
        const parent = view.parent
        if (!parent) return
        parent.position.add(velocity)
        if (parent.position.y < 0) {
          parent.position.setY(0)
        }
        const roll = rotation._z
        parent.rotateY(roll * TURN_SPEED)
        for (const el of document.querySelectorAll('.ship')) {
          const data = this.ships[el.id]
          if (!data) continue
          const ship = el.object3D
          ship.position.add(data.velocity)
        }
      }, ANIMATION_INTERVAL)

      // Report position.
      setInterval(() => {
        socket.emit('ship', {
          position: coords(this.position),
          rotation: coords(this.rotation),
          velocity: this.velocity
        })
      }, BROADCAST_INTERVAL)

      // Receive other ship's positions.
      socket.on('ship', ship => {
        Vue.set(this.ships, ship.id, ship)
      })

      // Show other ship's blast beams.
      socket.on('blast', data => {
        this.blast(data)
      })

      // Remove ships when they disconnect.
      socket.on('kill', id => {
        Vue.delete(this.ships, id)
      })

      // Listen for "pew" commands.
      const mic = new Mic(() => {
        this.fire()
      }, {})
      mic.listening = true
    },

    // TODO: Make a ship explode when it's taken too much damage.
    explode () {
      xyz('0 0 0')
    },

    // Fire a blast beam.
    fire () {
      const cannon = document.getElementById('cannon').object3D
      cannon.rotation.reorder('YXZ')
      const id = `blast${blastId++}`
      const rotation = coords(cannon.getWorldRotation())
      const vector = this.camera.getWorldDirection()
      const position = cannon.getWorldPosition()
      const start = coords(position)
      const end = coords(position.add(vector.multiplyScalar(BLAST_LENGTH)))
      const data = { id, rotation, start, end }
      this.blast(data)
      socket.emit('blast', data)
    },

    // Show a blast beam from any ship.
    blast (data) {
      Vue.set(this.blasts, data.id, data)
      setTimeout(() => {
        Vue.delete(this.blasts, data.id)
      }, 1e3)
    }
  }
}

function coords (o) {
  return o._order
    ? `${o._x * DEGREES} ${o._y * DEGREES} ${o._z * DEGREES}`
    : `${o.x} ${o.y} ${o.z}`
}

function xyz (s) {
  const a = s.split(' ')
  return new window.THREE.Vector3(a)
}
</script>

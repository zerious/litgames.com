class Mic {
  constructor (fn, options) {
    options.threshold = options.threshold || 0.1
    options.debounce = options.debounce || 1e3
    let listening = true
    navigator.getUserMedia({
      video: false,
      audio: true
    }, stream => {
      const context = window.ctx = new (window.AudioContext || window.webkitAudioContext)()
      const script = context.createScriptProcessor(2048, 1, 1)
      script.onaudioprocess = event => {
        if (!listening) return
        const input = event.inputBuffer.getChannelData(0)
        const count = input.length
        let sum = 0
        for (let i = 0; i < count; i++) {
          sum += input[i] * input[i]
        }
        const average = Math.sqrt(sum / count)
        if (average > options.threshold) {
          fn()
          listening = false
          setTimeout(() => {
            listening = true
          }, options.debounce)
        }
      }
      const mic = context.createMediaStreamSource(stream)
      mic.connect(script)
      script.connect(context.destination)
    }, console.error)
  }
}

export default Mic

export default {
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    previewImg (img) {
      uni.previewImage({
        current: img,
        urls: [img]
      })
    },
    playVideo (id, i) {
      let videoContext = uni.createVideoContext(id)
      videoContext.play()
      this.obj.content.map((item, j) => {
        if (item.type === 4) {
          if (i !== j) {
            uni.createVideoContext('myVideo' + j).pause()
          }
        }
      })
    }
  },
  onLoad (options) {
    if (options.name) {
      this.obj.title = options.name
      this.obj.content = JSON.parse(options.value)
    }
  }
}

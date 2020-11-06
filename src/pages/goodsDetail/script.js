import api from '@/api/api'
export default {
  data () {
    return {
      obj: {},
      image: '',
      showpop: false,
      salesManId: null,
      phone: '',
      postImg: '',
      showPost: false,
      params: {},
      route: {},
      activeVideo: null
    }
  },
  methods: {
    showType () {
      this.showpop = !this.showpop
    },
    previewImg (img) {
      mpvue.previewImage({
        current: img,
        urls: [img]
      })
    },
    playVideo (id, i) {
      this.activeVideo = i
      let videoContext = mpvue.createVideoContext(id)
      // videoContext.requestFullScreen({ direction: 0 })
      videoContext.play()
    },
    async getContent (mediaId) {
      const { data } = await api.mediaView({
        mediaId
      })
      data.createTime = this.moment(data.createTime).format('YYYY年MM月DD日')
      if (data.contentType === 1) {
        data.content = data.content === '' ? [] : JSON.parse(data.content)
      }
      this.obj = data
      mpvue.setNavigationBarTitle({
        title: data.title
      })
    },
    // posterRouer () {
    //   this.showpop = false
    //   this.$router.push({
    //     path: '/pages/packageMedia/pyqPoster/main',
    //     query: { imgUrl: this.image, title: this.obj.title }
    //   })
    // },
    // 个人获取获取业务员信息
    async getSalesManInfo () {
      const { data } = await api.getSalesManInfo({
        salesmanId: this.salesManId
      })
      this.params = Object.assign(this.params, data)
    },
    postCancle () {
      this.showPost = false
    },
    async getPost (acode) {
      const { code, data, msg } = await api.getMediaPoster({
        headImg: this.params.photo,
        image: this.route.image,
        acode,
        title: this.obj.title,
        companyName: this.params.companyName,
        address: '地址:' + this.params.address,
        phone: '电话:' + this.phone
      })
      if (code === 200) {
        this.showpop = false
        this.showPost = true
        this.postImg = data
      } else {
        mpvue.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      }
    },
    async posterRouer () {
      let shareUserId = mpvue.getStorageSync('userId')
      let param = {
        mediaId: this.route.id,
        id: this.route.id,
        route: 'newsDetail',
        seriesId: this.route.seriesId,
        category: this.route.category,
        image: this.route.image,
        type: 2,
        shareUserId
      }
      const { code, data, msg } = await api.acodeShare({
        salesmanId: this.salesManId,
        param: JSON.stringify(param),
        type: 1,
        page: 'pages/loading/main'
      })
      if (code === 200) {
        this.getPost(data)
      } else {
        mpvue.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      }
    },
    downImg (callback) {
      mpvue.downloadFile({
        url: this.postImg,
        success: res => {
          callback(res.tempFilePath)
        }
      })
    },
    saveToImg (filePath) {
      mpvue.saveImageToPhotosAlbum({
        filePath,
        complete: () => {
          this.showPost = false
        },
        success: () => {
          mpvue.showModal({
            title: '保存图片成功',
            content: '海报已经保存到相册，您可以手动分享到朋友圈！',
            showCancel: false
          })
        },
        fail: res => {
          if (res.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
            mpvue.showModal({
              title: '保存图片失败',
              content: '您已取消保存图片到相册！',
              showCancel: false
            })
          } else {
            mpvue.showModal({
              title: '提示',
              content:
                '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
              complete: res => {
                if (res.confirm) {
                  mpvue.openSetting({}) // 打开小程序设置页面，可以设置权限
                } else {
                  mpvue.showModal({
                    title: '保存图片失败',
                    content: '您已取消保存图片到相册！',
                    showCancel: false
                  })
                }
              }
            })
          }
        }
      })
    },
    callPhone () {
      mpvue.makePhoneCall({
        phoneNumber: this.phone,
        success: () => {
          this.insertOpera('拨打了电话', 5)
        }
      })
    },
    // 插入雷达
    insertOpera (info, recordType) {
      api.OperationInsert({
        info,
        recordType,
        salesmanId: this.salesManId
      })
    },
    async getIntegral () {
      const { code, msg } = await api.integralAdd()
      if (code === 200) {
      } else {
        mpvue.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  onShareAppMessage () {
    this.showpop = false
    let shareUserId = mpvue.getStorageSync('userId')
    this.getIntegral()

    return {
      title: this.obj.title,
      imageUrl: this.route.image,
      path: `/pages/loading/main?route=newsDetail&salesmanId=${this.salesManId}&image=${this.route.image}&id=${this.route.id}&seriesId=${this.route.seriesId}&category=${this.route.category}&shareUserId=${shareUserId}`
    }
  },
  // onShareTimeline () {
  //   let shareUserId = mpvue.getStorageSync('userId')
  //   return {
  //     title: this.obj.title,
  //     imageUrl: this.route.image,
  //     query: `salesmanId=${this.salesManId}&image=${this.route.image}&id=${this.route.id}&seriesId=${this.route.seriesId}&category=${this.route.category}&shareUserId=${shareUserId}`
  //   }
  // },
  onLoad () {
    // mpvue.showShareMenu({
    //   menus: ['shareAppMessage', 'shareTimeline']
    // })
    this.showPost = false
    this.showpop = false
    this.activeVideo = null
    this.route = this.$route.query
    this.getContent(this.route.id)
    this.phone = mpvue.getStorageSync('salesmanPhone')
    this.salesManId = mpvue.getStorageSync('salesmanId')
    this.getSalesManInfo()
  }
}

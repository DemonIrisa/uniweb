import api from '@/api'
import config from '@/utils/config'
import compass from '../../utils/compass'
export default {
  data () {
    return {
      richList: [],
      img: [],
      smallType: '',
      imgJ: null,
      descTxt: {
        1: '大图',
        2: '小图',
        3: '文字',
        4: '视频',
        5: '换行'
      },
      title: '',
      typeTxt: '',
      type: null,
      typeArr: [],
      show: false,
      id: null
    }
    // type 1大图 2小图 3 文字 4视频
  },
  methods: {
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
    },
    confirmType (e) {
      this.type = e[0].value
      this.typeTxt = e[0].label
    },
    chooseType () {
      this.show = true
    },
    // 获取分类
    async getType () {
      const result = await api.Type.allNoAuth()
      this.typeArr = result
    },
    returnTo () {
      this.$router.go(-1)
    },
    // 换行
    chooseWrap (type) {
      this.richList.push({ type })
    },
    // 视频
    chooseVideo (typeVideo, txt, videoI) {
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        success: async res => {
          uni.showLoading({ mask: true, title: '正在上传' })
          const token = uni.getStorageSync('token')
          let filePath = await compass(res.tempFilePath, 0.8)
          uni.uploadFile({
            url: config.url + api.Upload,
            filePath,
            name: 'files',
            header: {
              token: token
            },
            success: res => {
              let param = JSON.parse(res.data)
              if (param.code === 0) {
                console.log(config.url + param.data)
                if (txt === 'change') {
                  this.richList[videoI].video = config.url + param.data
                } else {
                  this.richList.push({
                    video: config.url + param.data,
                    type: typeVideo
                  })
                }
              }
              uni.hideLoading()
            },
            fail: res => {}
          })
        },
        fail: function () {},
        complete: function () {}
      })
    },
    // 文字
    chooseTxt (type) {
      this.richList.push({
        type: 3,
        txt: ''
      })
    },
    routeTo (path, query) {
      this.$router.push({ path, query })
    },
    // 移除
    removeIndex (arr, i) {
      arr.splice(i, 1)
    },
    // 视频
    videoTap (item, i) {
      uni.showActionSheet({
        itemList: ['播放', '替换', '删除'],
        success: res => {
          let { tapIndex } = res
          if (tapIndex === 0) {
            this.routeTo('/pages/packageA/video/main', { video: item.video })
          } else if (tapIndex === 1) {
            this.chooseVideo(1, 'change', i)
          } else if (tapIndex === 2) {
            this.removeIndex(this.richList, i)
          }
        },
        fail: res => {
          console.log(res.errMsg)
        }
      })
    },
    imgTap (item, i, j) {
      uni.showActionSheet({
        itemList: ['查看图片', '替换图片', '删除'],
        success: res => {
          let { tapIndex } = res
          if (tapIndex === 0) {
            uni.previewImage({
              current: item.img,
              urls: [item.img]
            })
          } else if (tapIndex === 1) {
            this.imgJ = j
            if (j || j === 0) {
              this.chooseImageList(2, tapIndex, i, 'add')
            } else {
              this.chooseImageList(1, tapIndex, i)
            }
          } else if (tapIndex === 2) {
            this.removeIndex(this.richList, i)
          }
        },
        fail: res => {
          console.log(res.errMsg)
        }
      })
    },
    swapArray (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    // 上移
    zIndexUp (arr, index, length) {
      if (index !== 0) {
        this.swapArray(arr, index, index - 1)
      }
    },
    // 下移
    zIndexDown (arr, index, length) {
      if (index + 1 !== length) {
        this.swapArray(arr, index, index + 1)
      }
    },
    // 置顶
    zIndexTop (arr, index, length) {
      if (index !== 0) {
        let moveNum = index - 0
        for (let i = 0; i < moveNum; i++) {
          this.swapArray(arr, index, index - 1)
          index--
        }
      }
    },
    // 发布
    async releaseAct () {
      uni.showLoading({ mask: true })
      let params = {
        name: this.title,
        value: JSON.stringify(this.richList),
        _type: this.type
      }
      if (this.id) {
        params._id = this.id
      }
      const result = await api.Goods.editoradd(params)
      if (result) {
        uni.navigateBack({
          delta: 1,
          success: res => {
            uni.showToast({
              title: '发布成功',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    },
    // 选择照片列表组
    chooseImageList (type, tapIndex, imgI, smallType) {
      if (type === 2) {
        this.img.length = 0
      }
      this.smallType = smallType
      uni.chooseImage({
        count: tapIndex === 1 ? 1 : 9, // 一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let successUp = 0 // 成功
          let failUp = 0 // 失败
          let length = res.tempFilePaths.length // 总数
          let count = 0 // 第几张
          this.uploadOneByOne(
            res.tempFilePaths,
            successUp,
            failUp,
            count,
            length,
            tapIndex,
            imgI,
            type
          )
        },
        fail: function () {},
        complete: function () {}
      })
    },
    async uploadOneByOne (
      imgPaths,
      successUp,
      failUp,
      count,
      length,
      tapIndex,
      imgI,
      type
    ) {
      if (!(tapIndex && tapIndex === 1)) {
        uni.showLoading({
          title: '正在上传第' + count + '张',
          mask: true
        })
      }
      const token = uni.getStorageSync('token')
      let filePath = await compass(imgPaths[count], 0.8)
      uni.uploadFile({
        url: config.url + api.Upload,
        filePath,
        name: 'file',
        header: {
          token: token
        },
        success: res => {
          successUp++ // 成功+1
          let param = JSON.parse(res.data)
          if (param.code === 0) {
            // 上传成功之后
            if (tapIndex && tapIndex === 1) {
              if (type === 1) {
                this.richList.splice(imgI, 1, {
                  img: config.url + param.data,
                  type
                })
              } else if (type === 2) {
                if (this.imgJ || this.imgJ === 0) {
                  this.richList[imgI].img.splice(
                    this.imgJ,
                    1,
                    config.url + param.data
                  )
                }
              }
            } else {
              if (type === 1) {
                this.richList.push({
                  img: config.url + param.data,
                  type
                })
              } else if (type === 2) {
                if (this.smallType) {
                  this.richList[imgI].img.push(config.url + param.data)
                } else {
                  this.img.push(config.url + param.data)
                }
              }
            }
          }
        },
        fail: res => {
          failUp++ // 失败+1
        },
        complete: res => {
          count++ // 下一张
          if (count === length) {
            // 上传完毕，作一下提示
            console.log('上传成功' + successUp + ',' + '失败' + failUp)
            if (type === 2 && this.smallType !== 'add') {
              this.richList.push({
                img: JSON.parse(JSON.stringify(this.img)),
                type
              })
            }
            uni.showToast({
              title: '上传成功',
              icon: 'none',
              duration: 2000
            })
          } else {
            // 递归调用，上传下一张
            this.uploadOneByOne(
              imgPaths,
              successUp,
              failUp,
              count,
              length,
              tapIndex,
              imgI,
              type
            )
            console.log('正在上传第' + count + '张')
            if (!(tapIndex && tapIndex === 1)) {
              uni.showLoading({
                title: '正在上传第' + count + '张'
              })
            }
          }
        }
      })
    }
  },
  onLoad (options) {
    this.title = ''
    this.typeTxt = ''
    this.type = null
    this.richList.length = 0
    this.id = null
    this.getType()
    if (options.id) {
      this.title = options.name
      this.richList = JSON.parse(options.value)
      this.type = options.typeId
      this.typeTxt = options.typeTxt
      this.id = options.id
    }
  }
}

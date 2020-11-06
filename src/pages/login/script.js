import api from '@/api'
import md5Libs from "uview-ui/libs/function/md5";
export default {
  data () {
    return {
      params: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    routeTo (path, query) {
      this.$router.replace({ path, query })
    },
    async loginApi () {
      uni.showLoading({ mask: true })
      this.params.password = md5Libs.md5(this.params.password)
      const result = await api.User.loginAdmin(this.params)
      uni.hideLoading()
      uni.setStorageSync('token', result.token)
      uni.setStorageSync('_id', result._id)
      this.routeTo('/pages/artMan/index')
    }
  },
  onLoad () {}
}

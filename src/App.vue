<!--
 * @Author: xgj
 * @since: 2020-11-03 17:55:12
 * @lastTime: 2020-11-03 18:20:07
 * @LastAuthor: xgj
 * @FilePath: /my-alpha-project/src/App.vue
 * @message: 
-->
<script>
import api from "./api"
export default {
  onLaunch: function () {
    uni.login({
      timeout: 5000,
      provider: 'weixin',
      success: async ({ code }) => {
        const r = await api.Weixin.getMiniOpenidDetail({ code })
        console.log(r);
        if (r) {
          uni.getUserInfo({
            provider: 'weixin',
            success: function (infoRes) {
              console.log('用户昵称为：' + infoRes.userInfo.nickName);
            }
          });
        }

      }
    })
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
</style>

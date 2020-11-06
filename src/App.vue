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
    // uni.login({
    //   timeout: 5000,
    //   provider: 'weixin',
    //   success: async ({ code }) => {
    //     const r = await api.Weixin.getMiniOpenidDetail({ code })
    //     console.log(r);
    //     if (r) {
    //       uni.getUserInfo({
    //         provider: 'weixin',
    //         success: function (infoRes) {
    //           console.log('用户昵称为：' + infoRes.userInfo.nickName);
    //         }
    //       });
    //     }

    //   }
    // })
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
page {
  height: 100%;
  width: 100%;
}
page,
view,
text,
image,
input,
textarea,
label,
image {
  box-sizing: border-box;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.flexRow {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

.flexColumn {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.ellipsis-two {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ellipsis {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.box-shadow {
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 10px 0px rgba(107, 105, 105, 0.1);
  box-sizing: border-box;
  border-radius: 8rpx;
}
.check-item {
  width: 100%;
}
.check-item .wx-checkbox-input,
.check-item .wx-radio-input {
  width: 28rpx;
  height: 28rpx;
  border-radius: 24rpx;
  border: 2rpx solid #9b9b9b;
}
.check-item .wx-checkbox-input.wx-checkbox-input-checked,
.check-item .wx-radio-input.wx-radio-input-checked {
  background: #3dc423;
  border-color: #3dc423;
  color: #fff;
}
.check-item .wx-checkbox-input.wx-checkbox-input-checked::before,
.check-item .wx-radio-input.wx-radio-input-checked::before {
  width: 18rpx;
  height: 18rpx;
  line-height: 18rpx;
  text-align: center;
  font-size: 22rpx;
  color: #fff;
  background: transparent;
  transform: translate(-60%, -50%) scale(1);
  -webkit-transform: translate(-60%, -50%) scale(1);
}
.rela-wrap {
  position: relative;
  height: 100%;
}
.center-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
}
.none-btn::after{
  display: none;
}
</style>

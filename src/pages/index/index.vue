<!--
 * @Author: xgj
 * @since: 2020-11-03 17:55:12
 * @lastTime: 2020-11-03 18:19:02
 * @LastAuthor: xgj
 * @FilePath: /my-alpha-project/src/pages/index/index.vue
 * @message: 
-->
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{title}}</text>
      <u-button>默认按钮</u-button>
      <u-button type="success">成功按钮</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello1'
    }
  },
  onLoad() {

  },
  methods: {

  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

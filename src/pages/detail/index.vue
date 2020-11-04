<!--
 * @Author: xgj
 * @since: 2020-11-04 22:07:09
 * @lastTime: 2020-11-04 22:23:25
 * @LastAuthor: xgj
 * @FilePath: /my-alpha-project/src/pages/detail/index.vue
 * @message: 2
-->
<template>
  <view class="detail">
    <img class="pic" v-for="item in imgs" :src="url+item" alt="">
  </view>
</template>

<script>
import config from "@/utils/config"
export default {
  data() {
    return {
      imgs: [],
      url: config.url
    }
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.imgs = option.imgs.split(",")
    // console.log(option.imgs); //打印出上个页面传递的参数。
    // console.log(option.name); //打印出上个页面传递的参数。
  }
}
</script>

<style lang="scss">
.detail {
  .pic {
    width: 100%;
  }
}
</style>
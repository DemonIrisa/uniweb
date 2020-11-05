<!--
 * @Author: xgj
 * @since: 2020-11-04 20:32:02
 * @lastTime: 2020-11-05 16:22:46
 * @LastAuthor: xgj
 * @FilePath: /my-alpha-project/src/pages/art/index.vue
 * @message: 
-->
<template>
  <view class="content">
    <view class="padding10">
      <u-search placeholder="日照香炉生紫烟" v-model="keyword" @search="handleSearch" @custom="handleSearch"></u-search>
    </view>
    <view class="select-cell">
      <view class="cell-left">
        <view v-for="(item,index) in typeList" @click="handleClick(index)" :key="item._id" :class="selectIndex === index?'active cell-btn': 'cell-btn' ">
          {{item.name}}
        </view>
      </view>
      <view class="cell-right" v-if="ready">
        <view v-if="goodsList.length != 0">
          <view v-for="item in goodsList" :key="item._id" class="cell" @click="handleDetailClick(item)">
            <img :src="url+item.img" alt="" class="cell-pic">
            <view class="cell-title-room">
              <p class="p1">{{item.name}}</p>
              <p class="p2"> {{item.value}} </p>
            </view>
            <view class="fixed-left">
              <u-icon name="arrow-right" color="#ccc" size="28"></u-icon>
            </view>
          </view>
        </view>
        <view v-else>
          <u-empty text="没有数据" mode="list"></u-empty>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import api from "@/api"
import config from "@/utils/config"
export default {
  data() {
    return {
      keyword: "",
      selectIndex: 0,
      typeList: [],
      goodsList: [],
      url: config.url,
      ready: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const r = await api.Type.allNoAuth()
        if (r) {
          this.typeList = r
          const result = await api.Goods.pageNoAuth({ _type: this.typeList[0]._id })
          if (result) {
            this.goodsList = result.list || []
            this.ready = true
          }
        }
      } catch (error) {
        this.ready = true
      }
    },
    async handleClick(index) {
      this.selectIndex = index
      const r = await api.Goods.pageNoAuth({ _type: this.typeList[index]._id })
      if (r) {
        this.goodsList = r.list
      }
    },
    async handleSearch() {
      const r = await api.Goods.pageNoAuth({ name: this.keyword, _type: this.typeList[this.selectIndex]._id })
      if (r) {
        this.goodsList = r.list
      }
    },
    handleDetailClick(item) {
      uni.navigateTo({
        url: `/pages/detail/index?imgs=${item.imgs}`
      });
    },
  }
}
</script>

<style lang="scss">
.content {
  /* padding: 10rpx; */
}
.padding10 {
  padding: 10rpx;
}
.select-cell {
  display: flex;
  height: calc(100vh - 84rpx);
  overflow-y: auto;
}
.cell-left {
  width: 200rpx;
  background: rgb(236, 235, 235);
}
.cell-right {
  width: calc(100vw - 210rpx);
  margin-left: 10rpx;
}
.cell-btn {
  background: rgb(236, 235, 235);
  width: 200rpx;
  padding: 20rpx;
  // border: 2rpx solid #ccc;
  text-align: center;
  position: relative;
  margin-top: -2rpx;
  &:first-child {
    margin-top: 0rpx;
  }
  &.active {
    background: white;
  }
}
.active {
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 5rpx;
    height: 100%;
    background: orange;
  }
}
.cell {
  display: flex;
  padding: 10rpx;
  border-bottom: 1rpx solid #ccc;
  position: relative;
  &:active {
    background: rgba(204, 204, 204, 0.103);
  }
}
.cell-pic {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10rpx;
}
.cell-title-room {
  margin-left: 10rpx;
  .p1 {
    margin-bottom: 6rpx;
    font-size: 32rpx;
  }
  .p2 {
    color: rgb(151, 148, 148);
    font-size: 26rpx;
    margin-right: 30rpx;
  }
}
.fixed-left {
  position: absolute;
  right: 20rpx;
  top: 60rpx;
}
</style>

<!--
 * @Author: xgj
 * @since: 2020-11-04 20:32:02
 * @lastTime: 2020-11-05 16:23:23
 * @LastAuthor: xgj
 * @FilePath: /my-alpha-project/src/pages/art/index.vue
 * @message: 
-->
<template>
  <view class="content">
    <view class="padding10">
      <u-search placeholder="请输入关键词" v-model="keyword" @search="getGoods" @custom="getGoods" @clear="getGoods"></u-search>
    </view>
    <view class="select-cell">
      <u-notice-bar mode="horizontal" :list="notice"></u-notice-bar>
      <div class="list-w">
        <view class="cell-left">
          <view v-for="(item,index) in typeList" @click="handleClick(index)" :key="item._id" :class="selectIndex === index?'active cell-btn': 'cell-btn' ">
            {{item.name}}
          </view>
        </view>
        <view class="cell-right" v-if="ready">
          <view v-if="goodsList.length != 0">
            <view v-for="item in goodsList" :key="item._id" class="cell flexRow" @click="handleDetailClick(item)">
              <img :src="item.imgList[0]" alt="" class="cell-pic">
              <p class="cell-title-room ellipsis-two">{{item.name}}</p>
              <view class="fixed-left">
                <u-icon name="arrow-right" color="#666" size="30"></u-icon>
              </view>
            </view>
          </view>
          <view v-else class="no-wrap">
            <u-empty text="没有数据" mode="list"></u-empty>
          </view>
        </view>
      </div>
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
      ready: false,
      notice: [
        '各种石材',
        '欢迎来电定制',
        '杨先生 18658610003',
        '应女士 13175392103'
      ]
    }
  },
  onLoad() {
    this.initData()
  },
  methods: {
    async getGoods() {
      const result = await api.Goods.pageNoAuth({
        name: this.keyword,
        _type: this.typeList[this.selectIndex]._id,
        pageSize: 10000
      })
      if (result) {
        this.goodsList = result.list || []
        if (this.goodsList.length > 0) {
          this.goodsList.map(item => {
            item.imgList = []
            if (item.value.indexOf('[') !== -1) {
              item.value = JSON.parse(item.value)
            } else {
              item.value = []
            }
            if (item.value.length > 0) {
              item.value.map(child => {
                if (child.type === 1) {
                  item.imgList = [...item.imgList, child.img]
                } else if (child.type === 2) {
                  item.imgList = [...item.imgList, ...child.img]
                }
              })
            }
          })
        }
        this.ready = true
      }
    },
    async initData() {
      try {
        const r = await api.Type.allNoAuth()
        if (r) {
          this.typeList = r
          this.selectIndex = 0
          this.getGoods()
        }
      } catch (error) {
        this.ready = true
      }
    },
    async handleClick(index) {
      this.selectIndex = index
      this.getGoods()
    },
    handleDetailClick(item) {
      uni.navigateTo({
        url: `/pages/detail/index?imgs=${item.imgs}`
      });
    }
  }
}
</script>

<style lang="scss">
.content {
  /* padding: 10rpx; */
  color: #4a4a4a;
  position: relative;
  .add-more {
    position: fixed;
    bottom: 100rpx;
    right: 40rpx;
  }
}
.padding10 {
  padding: 10rpx;
}
.select-cell {
  overflow-y: auto;
}
.list-w {
  display: flex;
  height: calc(100vh - 160rpx);
  flex: 1;
}
.cell-left {
  width: 200rpx;
  background: rgb(236, 235, 235);
  height: 100%;
  overflow-y: auto;
}
.cell-right {
  width: calc(100vw - 210rpx);
  margin-left: 10rpx;
  height: 100%;
  overflow-y: auto;
  .no-wrap {
    padding-top: 50rpx;
  }
}
.cell-btn {
  background: rgb(236, 235, 235);
  width: 200rpx;
  padding: 30rpx 20rpx;
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
    width: 8rpx;
    height: 100%;
    background: #ff5e4c;
  }
}
.cell {
  display: flex;
  padding: 16rpx 10rpx;
  border-bottom: 1rpx solid #eee;
  position: relative;
  &:active {
    background: rgba(204, 204, 204, 0.103);
  }
}
.cell-pic {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
}
.cell-title-room {
  margin-left: 30rpx;
  width: 330rpx;
  .p1 {
    margin-bottom: 6rpx;
    font-size: 32rpx;
  }
  .p2 {
    color: rgb(151, 148, 148);
    font-size: 26rpx;
    margin-right: 48rpx;
  }
}
.fixed-left {
  position: absolute;
  right: 20rpx;
  top: 60rpx;
}
// 弹框
.model-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1001;
}
.modal-sort {
  z-index: 3000;
  background: #fff;
  width: 620rpx;
  height: 436rpx;
  border-radius: 8rpx;
  position: fixed;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
  padding-top: 40rpx;

  .title {
    font-size: 40rpx;
    color: #4a4a4a;
    text-align: center;
    margin-bottom: 60rpx;
  }

  .sort-name {
    width: 472rpx;
    height: 100rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    margin: 0 auto 50rpx;
    padding: 0 20rpx;
    text-align: center;
    color: #9b9b9b;
    font-size: 36rpx;
  }

  .sure-btn {
    width: 472rpx;
    height: 100rpx;
    line-height: 100rpx;
    background: #ff5e4c;
    border-radius: 50rpx;
    font-size: 36rpx;
    color: #fff;
  }

  .close {
    position: absolute;
    bottom: -100rpx;
    margin-left: -32rpx;
    left: 55%;
    transform: translateX(-50%);
    width: 52rpx;
    height: 52rpx;
  }
}
</style>

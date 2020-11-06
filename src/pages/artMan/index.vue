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
      <view class="cell-left">
        <view v-for="(item,index) in typeList" @click="handleClick(index,item)" :key="item._id" :class="selectIndex === index?'active cell-btn': 'cell-btn' ">
          {{item.name}}
        </view>
        <view class="cell-btn" @click="visibleSort">
          <u-icon name="plus" color="#4a4a4a" size="28"></u-icon>
          添加
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
    </view>
    <u-icon @click="routeTo('/pages/goodsAdd/index')" class="add-more" name="plus" color="#4a4a4a" size="50"></u-icon>
    <!--添加分类-->
    <div class="model-wrap" v-show="showSort"></div>
    <div class="modal-sort" v-show="showSort">
      <p class="title">{{edit?'修改分类':'添加分类'}}</p>
      <input class="sort-name" placeholder="分类名称" v-model="sortObj.name" />
      <button class="sure-btn" @click="addSort">确认</button>
      <image @click="showSort=false" class="close" mode="widthFix" src="../../static/close-circle.png"></image>
    </div>
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
      showSort: false,
      edit: false,
      sortObj: {
        name: ''
      }
    }
  },
  onLoad() {
    this.showSort = false
  },
  onShow() {
    this.initData()
  },
  methods: {
    visibleSort() {
      this.showSort = true
      delete this.sortObj._id
    },
    // 编辑分类
    async addSort() {
      uni.showLoading({ mask: true })
      const result = await api.Type.editoradd(this.sortObj)
      if (result) {
        uni.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        this.showSort = false
        this.initData()
      }
    },
    // 删除分类
    deleteSort(_id) {
      uni.showModal({
        content: '确定删除？',
        success: async res => {
          if (res.confirm) {
            uni.showLoading({ mask: true })
            const result = await api.Type.remove({ _id })
            if (result) {
              uni.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              })
              this.getGoods()
              this.showSort = false
              this.initData()
            }
          }
        }
      })
    },
    // 删除商品
    deleteGoods(_id) {
      uni.showModal({
        content: '确定删除？',
        success: async res => {
          if (res.confirm) {
            uni.showLoading({ mask: true })
            const result = await api.Goods.remove({ _id })
            if (result) {
              uni.showToast({
                title: '操作成功',
                icon: 'none',
                duration: 2000
              })
              this.getGoods()
              this.showSort = false
              this.initData()
            }
          }
        }
      })
    },
    async getGoods() {
      const result = await api.Goods.pageNoAuth(
        {
          name: this.keyword,
          _type: this.typeList[this.selectIndex]._id,
          pageSize:10000
        })
      if (result) {
        this.goodsList = result.list || []
        if (this.goodsList.length > 0) {
          this.goodsList.map(item => {
            item.imgList = []
            let value = []
            if (item.value.indexOf('[') !== -1) {
              value = JSON.parse(item.value)
            } else {
              value = []
            }
            if (value.length > 0) {
              value.map(child => {
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
    async handleClick(index, item) {
      uni.showActionSheet({
        itemList: ['查看', '编辑', '删除'],
        success: res => {
          let { tapIndex } = res
          if (tapIndex === 0) {
            this.selectIndex = index
            this.getGoods()
          } else if (tapIndex === 1) {
            this.showSort = true
            this.sortObj._id = item._id
            this.sortObj.name = item.name
          } else if (tapIndex === 2) {
            this.deleteSort(item._id)
          }
        },
        fail: res => {
          console.log(res.errMsg)
        }
      })
    },
    handleDetailClick(item) {
      uni.showActionSheet({
        itemList: ['查看', '编辑', '删除'],
        success: res => {
          let { tapIndex } = res
          if (tapIndex === 0) {
            this.routeTo(`/pages/detail/index?value=${item.value}&name=${item.name}`)
          } else if (tapIndex === 1) {
            this.routeTo(`/pages/goodsAdd/index?value=${item.value}&name=${item.name}&id=${item._id}&typeId=${item._type._id}&typeTxt=${item._type.name}`)
          } else if (tapIndex === 2) {
            this.deleteGoods(item._id)
          }
        },
        fail: res => {
          console.log(res.errMsg)
        }
      })
    },
    routeTo(url) {
      uni.navigateTo({
        url
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
    width: 5rpx;
    height: 100%;
    background: orange;
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

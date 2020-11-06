<template>
  <div class="news-detail-wrap">
    <!-- 详情页 -->
    <h1 class="title">{{obj.title}}</h1>
    <div class="wrap-p">
      <div>
        <div v-for="(item,i) in obj.content" :key="i">
          <u-lazy-load @click="previewImg(item.img)" class="img-big" :image="item.img" v-if="item.type===1" img-mode="widthFix"></u-lazy-load>
          <div v-if="item.type===2">
            <u-lazy-load class="img-small" @click="previewImg(child)" v-for="(child,j) in item.img" :image="child" img-mode="widthFix"></u-lazy-load>
          </div>
          <!-- 文字 -->
          <text class="text-info" v-if="item.type===3">{{item.txt}}</text>
          <!-- 视频 -->
          <div v-if="item.type===4" class="video-b-b" @click="playVideo('myVideo'+i,i)">
            <video :id="'myVideo'+i" objectFit="contain" :src="item.video">
            </video>
          </div>
          <!-- 换行 -->
          <p v-if="item.type===5" class="wrap-b"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style lang="scss">
@import "index";
</style>
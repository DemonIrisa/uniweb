<template>
  <div class="news-detail-wrap" :class="[showpop ? 'id-card-scroll' : '']">
    <!-- 新闻详情页 -->
    <h1 class="title">{{obj.title}}</h1>
    <div class="date-hot flexRow">
      <span>{{obj.createTime}}</span>
      <p class="flexRow">
        <image class="hot-img" src="http://oss.skuoo.com/c_icon/hot.png" mode="aspectFill"></image>
        <span class="num">{{obj.visit}}</span>
      </p>
    </div>
    <div class="wrap-p">
      <parser v-if="obj.content&&obj.contentType===0" :html="obj.content"></parser>
      <div v-if="obj.contentType===1">
        <div v-for="(item,i) in obj.content" :key="i">
          <image @click="previewImg(item.img)" class="img-big" :src="item.img" v-if="item.type===1" mode="widthFix"></image>
          <div v-if="item.type===2">
            <image class="img-small" @click="previewImg(child.url)" v-for="(child,j) in item.imgList" :src="child.url" mode="widthFix"></image>
          </div>
          <!-- 文字 -->
          <text class="text-info" v-if="item.type===3">{{item.txt}}</text>
          <!-- 视频 -->
          <div v-if="item.type===4" class="video-b-b">
            <div v-show="activeVideo!==i" @click="playVideo('myVideo'+i,i)">
              <image class="img-big" mode="aspectFill" :src="item.video+'?x-oss-process=video/snapshot,t_10000,f_jpg,m_fast'"></image>
              <div class="model-btn">
                <div class="play-icon"></div>
              </div>
            </div>
            <video v-show="activeVideo===i" :id="'myVideo'+i" objectFit="contain" :src="item.video">
            </video>
          </div>
          <!-- 换行 -->
          <p v-if="item.type===5" class="wrap-b"></p>
        </div>
      </div>
      <!-- <wxParse :imageProp="{mode:'widthFix'}" v-if="obj.content" :content="obj.content" /> -->
    </div>
    <!-- <div class="flexRow article-wrap">
      <div class="left-art">
        <p>上一篇：</p>
        <p>科技天籁 2020款领航上市！</p>
      </div>
      <div class="right-art">
        <p>下一篇：</p>
        <p>科技天籁 2020款领航上市！</p>
      </div>
    </div> -->
    <div class="bottom-flex flexRow">
      <span class="common-btn" @click="callPhone">咨询底价</span>
      <span class="common-btn red-btn" @click="showType">分享资讯</span>
    </div>
    <div class="model-wrap" v-show="showPost"></div>
    <!--海报-->
    <div class="post-wrap-img" v-show="showPost" :style="{'padding-top':height}">
      <image :src="postImg" mode="widthFix" class="img-post"></image>
      <button class="save-to-share" @click="downImg(saveToImg)">保存图片分享</button>
      <image class="poster-cancel" @click="postCancle" src="http://oss.skuoo.com/c_icon/post_close.png" mode="widthFix"></image>
    </div>
    <!-- bottom -->
    <div class="model-wrap" v-show="showpop"></div>
    <!--分享的bar-->
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <button class="wxhy-btn" open-type="share">
            <image class="poster-icon-s" src="http://oss.skuoo.com/c_icon/wechat1.png" mode="widthFix"></image>
            <span class="font-26">微信好友</span>
          </button>
        </div>
        <div class="right" @click="posterRouer">
          <image class="poster-icon-s" src="http://oss.skuoo.com/c_icon/poster.png" mode="widthFix"></image>
          <span class="font-26">生成海报</span>
        </div>
      </div>
      <div @click="showType" class="cancel-btn">取消</div>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style lang="scss">
@import "index";
</style>
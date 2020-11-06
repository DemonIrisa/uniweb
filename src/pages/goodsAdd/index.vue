<template>
  <div class="release-act-wrap">
    <div class="name-detail">
      <div class="name-w-w">
        <input class="name" v-model="title" placeholder="名称（必填）" />
      </div>
      <div class="detail-wrap">
        <textarea :maxlength="-1" class="detail" placeholder="  " disabled v-if="richList.length===0" />
        <!-- 活动内容 -->
        <div class="type-list" v-for="(item,i) in richList" :key="i" v-if="richList.length!==0">
          <div class="flexRow top-style">
            <span>{{descTxt[item.type]}}</span>
            <p class="size0">
              <image v-if="i===0" class="icon-three" mode="widthFix" src="../../static/top-mast.png"></image>
              <image v-if="i!==0" @click="zIndexUp(richList,i,richList.length)" class="icon-three" mode="widthFix" src="../../static/top.png"></image>
              <image v-if="i===richList.length-1" class="icon-three" mode="widthFix" src="../../static/down-mast.png"></image>
              <image v-if="i!==richList.length-1" @click="zIndexDown(richList,i,richList.length)" class="icon-three" mode="widthFix" src="../../static/down.png"></image>
              <image class="icon-three" mode="widthFix" src="../../static/delete_fill.png" @click="removeIndex(richList,i)"></image>
            </p>
          </div>
          <!-- 大图 -->
          <image class="img-big" mode="aspectFill" :src="item.img" @click="imgTap(item,i)" v-if="item.type===1"></image>
          <!-- 小图 -->
          <div class="flexRow small-i-img" v-if="item.type===2">
            <image @click="imgTap(child,i,j)" v-for="(child,j) in item.img" :key="j" class="img-small" mode="aspectFill" :src="child"></image>
            <div class="add-wrap flexRow" @click="chooseImageList(2,null,i,'add')">
              <image class="icon-add" mode="widthFix" src="../../static/add-re.png"></image>
            </div>
          </div>
          <!-- 文字 -->
          <textarea :maxlength="-1" class="detail" placeholder="请输入文字内容" v-model="item.txt" v-if="item.type===3" />
          <!-- 视频 -->
          <div v-if="item.type===4" class="video-b-b">
            <!-- <image class="img-big" mode="aspectFill" :src="item.video"></image>
            <div class="model-btn">
              <div class="play-icon"></div>
            </div> -->
            <video class="img-big" objectFit="contain" :src="item.video"></video>
          </div>
          <!-- 换行 -->
          <div class="wrap-b" v-if="item.type===5"></div>
        </div>
        <div class="icon-wrap">
          <image class="type-icon" mode="widthFix" src="../../static/big-img.png" @click="chooseImageList(1)"></image>
          <image class="type-icon" mode="widthFix" src="../../static/small-img.png" @click="chooseImageList(2)"></image>
          <image class="type-icon" mode="widthFix" src="../../static/text.png" @click="chooseTxt(3)"></image>
          <image class="type-icon" mode="widthFix" src="../../static/video.png" @click="chooseVideo(4)"></image>
          <image class="type-icon" mode="widthFix" src="../../static/wrap.png" @click="chooseWrap(5)"></image>
        </div>
      </div>
    </div>
    <div>
      <p class="title-set">设置</p>
      <div class="type-wrap">
        <div class="flexRow line-wrap between-w">
          <p class="left-w">分类</p>
          <div class="flexRow right-s" @click="chooseType">
            <span>{{typeTxt}}</span>
            <u-select @confirm="confirmType" v-model="show" :list="typeArr" value-name="_id" label-name="name"></u-select>
            <image class="right-arrow" src="../../static/right-arrow.png" mode="aspectFill"></image>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-w-wrap flexRow box-shadow">
      <span class="flex-w" @click="returnTo">返回</span>
      <span class="flex-w release-green" @click="releaseAct(1)">立即发布</span>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style lang="scss">
@import "index";
</style>
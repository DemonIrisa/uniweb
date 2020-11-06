<template>
  <div class="rela-wrap">
    <div class="login-wrap center-wrap">
      <image class="logo" src="/static/logo1.png" mode="widthFix"></image>
      <div>
        <p class="flexRow wrap-input">
          <span class="left-p">用户名</span>
          <input v-model="params.name" class="uni-input" placeholder="用户名" />
        </p>
        <p class="flexRow wrap-input">
          <span class="left-p">密 码</span>
          <input v-model="params.password" class="uni-input" placeholder="密码" type="password"/>
        </p>
      </div>
      <button class="login-btn none-btn" @click="loginApi">登录</button>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style lang="scss">
@import "index";
</style>
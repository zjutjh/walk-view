<script setup lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";
import ServerConfig from "../config/server";
import { NCard, NSpace, NButton, useMessage, useLoadingBar } from "naive-ui";

const router = useRouter();
const message = useMessage();
const loadingBar = useLoadingBar();

function grantAuthorization() {
  const oauthUrl = ServerConfig.urlPrefix + ServerConfig.apiMap.oauth;
  const loginUrl = ServerConfig.urlPrefix + ServerConfig.apiMap.login;

  loadingBar.start(); // 启动进度条

  // TODO 到时候要换成真正的登陆
  axios({
    url: loginUrl,
    method: "get",
    timeout: 1500,
  })
    .then(function (resp) {
      if (resp.status !== 200) {
        loadingBar.error();
        message.error("服务器错误");
      } else {
        // 请求成功
        const dataRecive: any = resp.data;
        localStorage.setItem("jwt", <string>dataRecive.data.jwt); // 存入 jwt 数据
        loadingBar.finish();
        router.push("/loading");
      }
    })
    .catch(function (error) {
      loadingBar.error();
      message.error("服务器错误");
      console.log(error);
    });
}
</script>

<template>
  <n-card
    title="精弘毅行微信授权登陆"
    header-style="margin-bottom: 10px"
    style="margin: 20px auto; width: 90%"
  >
    <n-space :vertical="true">
      <n-space justify="center">
        <img style="width: 50px; height: 50px" src="/src/assets/wechat.png" />
      </n-space>

      <div style="font-size: 13px; text-align: left">
        <ul style="padding-left: 15px">
          <li style="margin-bottom: 15px">该网页由精弘网络开发</li>
          <li>需要你的微信授权完成后续报名操作</li>
        </ul>
      </div>
    </n-space>
  </n-card>

  <div style="text-align: center">
    <n-button @click="grantAuthorization" style="width: 90%" type="primary"
      >微信授权登陆</n-button
    >
  </div>
</template>

<style>
.icon-img {
  width: 45px;
  height: 45px;
}
</style>

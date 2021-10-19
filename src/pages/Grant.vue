<script setup lang="ts">
import {
    NCard,
    NSpace,
    NButton,
    useLoadingBar
} from 'naive-ui'

const loadingBar = useLoadingBar()
function testLoading(): void {
    loadingBar.start()
}
</script>

<template>
    <n-card
        title="精弘毅行微信授权登陆"
        header-style="margin-bottom: 10px"
        style="margin: 20px auto; width: 90%;"
    >
        <n-space :vertical="true">
            <n-space justify="center">
                <img style="width: 50px; height: 50px" src="/src/assets/wechat.png" />
            </n-space>

            <div style="font-size: 13px; text-align: left;">
                <ul style="padding-left: 15px;">
                    <li style="margin-bottom: 15px">该网页由精弘网络开发</li>
                    <li>需要你的微信授权完成后续报名操作</li>
                </ul>
            </div>
        </n-space>
    </n-card>

    <div style="text-align: center;">
        <n-button style="width: 90%" @click="testLoading" type="primary">微信授权登陆</n-button>
    </div>
</template>

<style>
.icon-img {
    width: 45px;
    height: 45px;
}
</style>
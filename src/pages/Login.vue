<script setup lang="ts">
import { NSpace, NSpin, useDialog, useMessage } from 'naive-ui';
import Server from "../config/server"
import axios, { Axios, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router';

// 变量定义
const dialog = useDialog()
const router = useRouter()
const message = useMessage()

// 函数定义
function getQueryVariable(variable: string): string {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return "";
}

// 获取微信 code
const code = getQueryVariable("code")
const loginUrl = Server.urlPrefix + Server.apiMap["basic"]["login"]

// 如果本地已经有 token 就直接跳转到加载信息页面
if (localStorage.getItem("jwt") != null) {
    router.replace("/loading")
} else {
    axios.get(loginUrl, {
        timeout: 3000,
        "params": {
            "code": code
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] === 200) {
            // 存下 jwt
            const jwt = respData["data"]["jwt"]
            localStorage.setItem("jwt", jwt)

            // 跳转到登录页面
            router.replace("/loading")
        } else if (respData["msg"] == "time error") {
            dialog.warning({
                "closable": false,
                "title": "尚未开始",
                "content": "报名尚未开始",
                "positiveText": "确定"
            })
        } else {
            dialog.warning({
                "title": "登录错误",
                "closable": false,
                "content": "服务器错误, 请稍后重试",
                "positiveText": "确定"
            })
        }
    }).catch(function (error) {
        dialog.warning({
            "title": "登录错误",
            "closable": false,
            "content": "服务器错误, 请稍后重试",
            "positiveText": "确定"
        })
    })
}
</script>

<template>
    <div style="margin-top: 50%;">
        <n-space justify="center">
            <n-spin size="large" />
        </n-space>
    </div>

    <div style="text-align: center; margin-top: 30px;">登录中 &nbsp;···</div>
</template>

<style>
</style>
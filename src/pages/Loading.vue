<script setup lang="ts">
import { NSpace, NSpin, useDialog, useMessage } from 'naive-ui';
import Server from "../config/server"
import axios, { Axios, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router';

// 变量定义
const dialog = useDialog()
const router = useRouter()
const message = useMessage()

const jwt = localStorage.getItem("jwt")
if (jwt === "") {
    dialog.error({
        title: "登录错误",
        content: "请重新从微信公众号进入",
        positiveText: "确定"
    })
} else {
    const userInfoUrl = Server.urlPrefix + Server.apiMap["user"]["info"]
    axios.get(userInfoUrl, {
        "headers": {
            "Authorization": "Bearer " + jwt
        }
    }).then(function (response: AxiosResponse) {
        const respData: any = response.data
        if (respData["code"] === 200) {
            // 存储用户信息
            localStorage.setItem("name", respData["data"]["name"])
            localStorage.setItem("college", respData["data"]["college"])
            localStorage.setItem("stu_id", respData["data"]["stu_id"])
            localStorage.setItem("gender", respData["data"]["gender"])
            localStorage.setItem("campus", respData["data"]["campus"])
            localStorage.setItem("status", respData["data"]["status"])
            localStorage.setItem("create_op", respData["data"]["create_op"])
            localStorage.setItem("join_op", respData["data"]["join_op"])
            localStorage.setItem("team_id", respData["data"]["team_id"])
            localStorage.setItem("qq", respData["data"]["contact"]["qq"])
            localStorage.setItem("wechat", respData["data"]["contact"]["wechat"])
            localStorage.setItem("tel", respData["data"]["contact"]["tel"])

            if (respData["data"]["team_id"] != -1) { // 如果这个人已经加入了团队
                // 获取团队信息获取链接
                const getTeamInfoUrl = Server.urlPrefix + Server.apiMap["team"]["info"]
                axios.get(getTeamInfoUrl, {
                    "headers": {
                        "Authorization": "Bearer " + jwt
                    }
                }).then(function (response: AxiosResponse) {
                    const respData: any = response.data
                    localStorage.setItem("team_data", JSON.stringify(respData["data"]))
                }).catch(function (error) {
                    dialog.warning({
                        "title": "登录错误",
                        "content": "服务器错误, 请稍后重试",
                        "positiveText": "确定"
                    })
                })
            } 
            router.replace("/info")
        } else {
            if (respData["msg"] == "jwt error") {
                // jwt 有问题就重新登录
                const oauthUrl = Server.urlPrefix + Server.apiMap["basic"]["oauth"]
                localStorage.removeItem("jwt")

                window.location.replace(oauthUrl)
            } else {
                // 获取用户信息错误
                dialog.warning({
                    "title": "没有用户信息",
                    "content": "前往报名页面",
                    "positiveText": "确定",
                    "onPositiveClick": () => {
                        router.replace("/register")
                    }
                })
            }
        }
    }).catch(function (error) {
        dialog.warning({
            "title": "登录错误",
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

    <div style="text-align: center; margin-top: 30px;">加载信息中 &nbsp;···</div>
</template>

<style>
</style>
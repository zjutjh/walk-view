<script setup lang="ts">
import { NSpace, NSpin, useDialog } from 'naive-ui';
import Server from "../config/server"
import axios, { Axios, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router';

// 变量定义
const dialog = useDialog()
const router = useRouter()

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

axios.get(loginUrl, {
    params: {
        "code": code
    }
}).then(function (response: AxiosResponse) {
    const responseData: any = response.data
    const jwt = responseData["data"]["jwt"]

    localStorage.setItem("jwt", jwt)  // 将 jwt 数据存入本地数据库

    // 接下来获取用户信息
    const userInfoUrl = Server.urlPrefix + Server.apiMap["user"]["info"]
    axios({
        "url": userInfoUrl,
        "method": "get",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).then(function (response: AxiosResponse) {
        const responseData: any = response.data
        const code = responseData["code"]

        if (code != 200) {
            dialog.warning({
                "title": "警告",
                "content": "尚未报名",
                "positiveText": "报名",
                "onPositiveClick": () => {
                    router.push("/register") // 跳转到报名页面
                }
            })
        } else {
            const responseData: any = response.data
            // 存储个人信息
            localStorage.setItem("name", responseData["name"])
            localStorage.setItem("stu_id", responseData["stu_id"])
            localStorage.setItem("gender", responseData["gender"])
            localStorage.setItem("campus", responseData["campus"])
            localStorage.setItem("create_op", responseData["create_op"])
            localStorage.setItem("join_op", responseData["join_op"])
            localStorage.setItem("team_id", responseData["team_id"])
            localStorage.setItem("qq", responseData["contact"]["qq"])
            localStorage.setItem("wechat", responseData["contact"]["wechat"])
            localStorage.setItem("tel", responseData["contact"]["tel"])
            router.push('/info') // 获取到用户信息，跳转到用户信息页面
        }
    }).catch(function (error) {
        dialog.error({
            title: '错误',
            content: '服务器错误，请重新进入',
            positiveText: '确定',
        })
    })
}).catch(function (error) {
    dialog.error({
        title: '错误',
        content: '服务器错误，请重新进入',
        positiveText: '确定',
    })
})
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
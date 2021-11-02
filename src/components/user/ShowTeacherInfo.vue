<script setup lang="ts">
import { NTable, NButton, NCard } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 从本地缓存中读取用户信息
const name = ref(localStorage.getItem("name"))
const gender = computed(() => localStorage.getItem("gender") == "1" ? "男" : "女")
const id = ref(localStorage.getItem("id"))
const tel = ref(localStorage.getItem("tel"))
const qq = ref(localStorage.getItem("qq"))
const wechat = ref(localStorage.getItem("wechat"))

function jumpToSubmitUserInfo() {
    router.replace("/update/teacher")
}
</script>

<template>
    <n-card title="📖 &nbsp; 基本信息" embedded :bordered="false" size="small">
        <n-table :bordered="true" style="margin-top: 10px;" :single-line="false">
            <tbody>
                <tr>
                    <td class="left-item">
                        <strong>姓名</strong>
                    </td>
                    <td class="right-item">{{ name }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>性别</strong>
                    </td>
                    <td class="right-item">{{ gender }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>身份证号</strong>
                    </td>
                    <td class="right-item">{{ id }}</td>
                </tr>
            </tbody>
        </n-table>
    </n-card>

    <n-card title="☎️ &nbsp; 联系方式" embedded :bordered="false" size="small">
        <n-table :bordered="true" :single-line="false">
            <tbody>
                <tr>
                    <td class="left-item">
                        <strong>电话</strong>
                    </td>
                    <td class="right-item">{{ tel }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>微信</strong>
                    </td>
                    <td class="right-item">{{ wechat }}</td>
                </tr>

                <tr>
                    <td class="left-item">
                        <strong>QQ</strong>
                    </td>
                    <td class="right-item">{{ qq }}</td>
                </tr>
            </tbody>
        </n-table>
    </n-card>

    <n-button
        style="margin-top: 20px;  width: 100%;"
        type="primary"
        @click="jumpToSubmitUserInfo"
    >修改信息</n-button>
</template>

<style>
.left-item {
    text-align: center;
    width: 34%;
}
.right-item {
    text-align: center;
}
.right-teammate-item {
    text-align: center;
}
</style>
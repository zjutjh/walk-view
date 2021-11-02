<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import Config from "../../config/server"
import { NCard, NForm, NFormItem, NSpace, NInput, NButton, NSelect, useMessage } from 'naive-ui';
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let campus = ref(null)
let showRouteOptions = ref(false)
let routeOptions = ref<SelectMixedOption[]>()
let formRef: any = ref()

const message = useMessage()
const router = useRouter()
const rules = {
    name: {
        required: true,
        message: '请输入团队名字',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入团队密码',
        trigger: 'blur'
    },
    route: {
        required: true,
        message: '请选择一条路线',
        trigger: ['blur']
    }
}
const campusOptions = [
    {
        label: '朝晖校区',
        value: 'zhaohui'
    },
    {
        label: '屏峰校区',
        value: 'pingfeng'
    },
    {
        label: '莫干山校区',
        value: 'moganshan'
    }
]
const formValue = ref({
    "name": "",
    "password": "",
    "route": null,
})

function updateRouteOptions() {
    if (campus.value === "zhaohui") {
        routeOptions.value = [{
            label: '朝晖全程',
            value: "1"
        }]
    } else if (campus.value === "pingfeng") {
        routeOptions.value = [{
            label: '屏峰半程',
            value: "2"
        }, {
            label: '屏峰全程',
            value: "3"
        }]
    } else if (campus.value === "moganshan") {
        routeOptions.value = [{
            label: '莫干山半程',
            value: "4"
        }, {
            label: '莫干山全程',
            value: "5"
        }]
    }
    if (campus.value !== null)
        showRouteOptions.value = true
    formValue.value.route = null  // 初始化路线选项数据
}

function createTeam() {
    formRef.value.validate((errors: any) => {
        if (!errors) {
            const postData = {
                "name": formValue.value.name,
                "password": formValue.value.password,
                "route": Number(formValue.value.route)
            }

            const createTeamUrl = Config.urlPrefix + Config.apiMap["team"]["create"]
            axios.post(createTeamUrl, postData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(function(response: AxiosResponse){
                const respData: any = response.data
                if (respData["code"] == 200) { // 队伍创建成功
                    localStorage.setItem("team_id", respData["data"]["team_id"])
                    message.success("创建成功")
                    setTimeout(() => router.replace("/loading"))
                } else {
                    message.error(respData["msg"])
                }
            }).catch(function(error){
                message.error("请检查你的网络连接")
            })
        } else {
            message.error('请填写完整数据')
        }
    })
}

function goBack() {
    router.push("/info/team/notjoin")
}
</script>

<template>
    <n-card title="📖 &nbsp 创建团队" embedded :bordered="false">
        <div style="margin-top: 15px;">
            <n-form :model="formValue" :rules="rules" label-placement="top" ref="formRef">
                <n-form-item label="团队名称" path="name">
                    <n-input placeholder="输入名称" v-model:value="formValue.name"></n-input>
                </n-form-item>

                <n-form-item label="团队密码" path="password">
                    <n-input placeholder="输入名称" v-model:value="formValue.password"></n-input>
                </n-form-item>

                <n-form-item label="团队校区">
                    <n-select
                        :on-update="updateRouteOptions()"
                        v-model:value="campus"
                        placeholder="选择校区"
                        :options="campusOptions"
                    ></n-select>
                </n-form-item>

                <n-form-item label="路线选择" path="route">
                    <n-select
                        :disabled="!showRouteOptions"
                        v-model:value="formValue.route"
                        placeholder="选择校区后选择路线"
                        :options="routeOptions"
                    ></n-select>
                </n-form-item>

                <n-space :size="25" style="margin-top: 10px;" :vertical="true">
                    <n-button
                        @click="createTeam"
                        style="width: 100%;"
                        type="primary"
                        attr-type="button"
                    >创建团队</n-button>
                    <n-button @click="goBack" style="width: 100%;" attr-type="button">返回上一步</n-button>
                </n-space>
            </n-form>
        </div>
    </n-card>
</template>

<style>
</style>
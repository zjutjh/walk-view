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
    route: {
        required: true,
        message: '请选择一条路线',
        trigger: ['blur']
    }
}
const allowMatchOptions = [
    {
        label: '是',
        value: "1"
    },
    {
        label: '否',
        value: "0"
    }
]
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

const teamData: any = JSON.parse(<string>localStorage.getItem("team_data"))
const formValue = ref({
    "name": teamData["name"],
    "route": null,
    "allow_match": teamData["allow_match"] ? "1" : "0"
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

function updateTeam() {
    formRef.value.validate((errors: any) => {
        if (!errors) {
            const postData = {
                "name": formValue.value.name,
                "route": Number(formValue.value.route),
                "allow_match": formValue.value.allow_match == "1" ? true : false
            }

            const createTeamUrl = Config.urlPrefix + Config.apiMap["team"]["update"]
            axios.post(createTeamUrl, postData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(function (response: AxiosResponse) {
                const respData: any = response.data
                if (respData["code"] == 200) { // 队伍创建成功
                    message.success("更新成功")
                    setTimeout(() => router.replace("/loading"))
                } else {
                    message.error(respData["msg"])
                }
            }).catch(function (error) {
                message.error("请检查你的网络连接") 
            })
        } else {
            message.error('请填写完整数据')
        }
    })
}

function goBack() {
    router.push("/info/team/teaminfo")
}
</script>

<template>
    <n-card title="📖 &nbsp 修改团队" embedded :bordered="false">
        <div style="margin-top: 15px;">
            <n-form :model="formValue" :rules="rules" label-placement="top" ref="formRef">
                <n-form-item label="团队名称" path="name">
                    <n-input placeholder="输入名称" v-model:value="formValue.name"></n-input>
                </n-form-item>

                <n-form-item label="是否接受随机队员">
                    <n-select
                        v-model:value="formValue.allow_match"
                        :options="allowMatchOptions"
                    ></n-select>
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
                        @click="updateTeam"
                        style="width: 100%;"
                        type="primary"
                        attr-type="button"
                    >更新信息</n-button>
                    <n-button @click="goBack" style="width: 100%;" attr-type="button">返回上一步</n-button>
                </n-space>
            </n-form>
        </div>
    </n-card>
</template>

<style>
</style>
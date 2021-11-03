<script setup lang="ts">
import { NMessageProvider, NCard, NPageHeader } from 'naive-ui'
import Server from "../config/server"
import { ref } from "vue";
import { useRouter } from "vue-router"
import axios, { Axios, AxiosResponse } from "axios";
import {
    NForm,
    NInput,
    NFormItem,
    NButton,
    NRadioGroup,
    NRadioButton,
    useMessage,
} from "naive-ui";


const formRef = ref()
const message = useMessage()
const router = useRouter()
const formValue = ref({
    name: localStorage.getItem("name"),
    gender: -1,
    campus: 5,
    stu_id: "",
    id: localStorage.getItem("id"),
    contact: {
        tel: localStorage.getItem("tel"),
        wechat: localStorage.getItem("wechat"),
        qq: localStorage.getItem("qq"),
    }
})
const rules = ref({
    name: {
        required: true,
        message: "请输入姓名",
        trigger: "blur",
    },
    gender: {
        required: true,
        message: "请选择性别",
        trigger: ["input", "blur"],
    },
    stu_id: {
        required: true,
        message: "请输入学号",
        trigger: ["input", "blur"],
    },
    campus: {
        required: true,
        message: "请选择校区",
        trigger: ["input", "blur"],
    },
    id: {
        required: true,
        message: "请输入身份证号",
        trigger: ["input", "blur"],
    },
    contact: {
        tel: {
            required: true,
            message: "请输入电话号码",
            trigger: ["input", "blur"],
        },
        wechat: {
            required: false,
            message: "请输入微信号",
            trigger: ["input", "blur"],
        },
        qq: {
            required: false,
            message: "请输入QQ号",
            trigger: ["input", "blur"],
        },
    }
})

function goBack() {
    router.replace("/info")
}

function submit() {
    // 对数据进行检查
    formRef.value.validate((errors: any) => {
        if (!errors) {
            // 提交数据
            formValue.value.campus = Number(formValue.value.campus)
            formValue.value.gender = Number(formValue.value.gender)
            const submitStudentUrl = Server.urlPrefix + Server.apiMap["user"]["update"]
            axios.post(submitStudentUrl, formValue.value, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(function (response: AxiosResponse) {
                const responseData: any = response.data
                if (responseData["code"] == 200) {
                    message.success("修改成功")
                    setTimeout(() => router.push("/loading"), 1000) // 跳转到加载信息页面  
                } else {
                    message.error(responseData["msg"])  // 报错信息
                }
            })
        } else {
            message.error("请输入完整");
        }
    });
}
</script>

<template>
    <n-card style="margin: 4% auto; width: 93%;">
        <n-page-header style="margin-bottom: 30px;" title="返回信息页面" @back="goBack"></n-page-header>
        <n-form :model="formValue" :rules="rules" ref="formRef" style="margin: 10px auto 0">
            <n-form-item label="姓名" path="name">
                <n-input placeholder="请输入姓名" v-model:value="formValue.name" />
            </n-form-item>

            <n-form-item label="性别" path="gender">
                <n-radio-group v-model:value="formValue.gender">
                    <n-radio-button value="1">男</n-radio-button>
                    <n-radio-button value="2">女</n-radio-button>
                </n-radio-group>
            </n-form-item>

            <n-form-item label="身份证号" path="id">
                <n-input placeholder="请输入身份证号" v-model:value="formValue.id" />
            </n-form-item>
            <n-form-item label="电话号码" path="contact.tel">
                <n-input placeholder="请输入电话号码" v-model:value="formValue.contact.tel" />
            </n-form-item>
            <n-form-item label="微信号(可选)" path="contact.wechat">
                <n-input placeholder="请输入微信号" v-model:value="formValue.contact.wechat" />
            </n-form-item>
            <n-form-item label="QQ号(可选)" path="contact.qq">
                <n-input placeholder="请输入QQ号" v-model:value="formValue.contact.qq" />
            </n-form-item>
            <n-form-item>
                <n-button
                    @click="submit"
                    attr-type="button"
                    style="margin: auto; width: 100%"
                    type="primary"
                >提交</n-button>
            </n-form-item>
        </n-form>
    </n-card>
</template>
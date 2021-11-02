<script setup lang="ts">
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
import Server from "../../config/server"
import { ref } from "vue";
import { useRouter } from "vue-router"

const formRef = ref()
const message = useMessage()
const router = useRouter()
const formValue = ref({
    name: "",
    gender: -1,
    stu_id: "",
    campus: -1,
    id: "",
    contact: {
        tel: "",
        wechat: "",
        qq: "",
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

function submit() {
    // 对数据进行检查
    formRef.value.validate((errors: any) => {
        if (!errors) {
            // 提交数据
            formValue.value.campus = Number(formValue.value.campus)
            formValue.value.gender = Number(formValue.value.gender)
            const submitStudentUrl = Server.urlPrefix + Server.apiMap["register"]["student"]
            axios.post(submitStudentUrl, formValue.value, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(function (response: AxiosResponse) {
                const responseData: any = response.data
                if (responseData["code"] == 200) {
                    console.log("fuck you ")  // debug
                    message.success("报名成功")
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
    <n-form :model="formValue" :rules="rules" ref="formRef" style="margin: 10px auto 0">
        <n-form-item label="姓名" path="name">
            <n-input placeholder="请输入姓名" v-model:value="formValue.name" />
        </n-form-item>

        <n-form-item label="性别" path="gender">
            <n-radio-group v-model:value="formValue.gender">
                <n-radio-button value="1">男</n-radio-button>
                <n-radio-button value="0">女</n-radio-button>
            </n-radio-group>
        </n-form-item>

        <n-form-item label="校区" path="campus">
            <n-radio-group v-model:value="formValue.campus">
                <n-radio-button value="1">朝晖</n-radio-button>
                <n-radio-button value="2">屏峰</n-radio-button>
                <n-radio-button value="3">莫干山</n-radio-button>
            </n-radio-group>
        </n-form-item>

        <n-form-item label="学号" path="stu_id">
            <n-input placeholder="请输入学号" v-model:value="formValue.stu_id" />
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
            >报名</n-button>
        </n-form-item>
    </n-form>
</template>

<style>
</style>

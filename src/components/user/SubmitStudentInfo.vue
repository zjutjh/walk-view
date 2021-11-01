<script setup lang="ts">
import {
    NCard,
    NForm,
    NInput,
    NFormItem,
    NButton,
    NRadioGroup,
    NRadioButton,
    useMessage,
} from "naive-ui";
import { ref } from "vue";

const formRef = ref();
const message = useMessage();
const formValue = ref({
    name: "",
    gender: 1,
    stu_id: "",
    campus: 1,
    id: "",
    phone: "",
    wechat: "",
    qq: "",
});
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
    phone: {
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

});

function handleValidateClick() {
    console.log(formValue);
    formRef.value.validate((errors: any) => {
        if (!errors) {
            message.success("Valid");
        } else {
            console.log(errors);
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
        <n-form-item label="电话号码" path="phone">
            <n-input placeholder="请输入电话号码" v-model:value="formValue.phone" />
        </n-form-item>
        <n-form-item label="微信号(可选)" path="wechat">
            <n-input placeholder="请输入微信号" v-model:value="formValue.wechat" />
        </n-form-item>
        <n-form-item label="QQ号(可选)" path="qq">
            <n-input placeholder="请输入QQ号" v-model:value="formValue.qq" />
        </n-form-item>
        <n-form-item>
            <n-button
                @click="handleValidateClick"
                attr-type="button"
                style="margin: auto; width: 100%"
                type="primary"
            >报名</n-button>
        </n-form-item>
    </n-form>
</template>

<style>
</style>

<script setup lang="ts">
import {
    NForm,
    NInput,
    NFormItem,
    NButton,
    useMessage,
} from "naive-ui";
import { ref } from "vue";

const formRef = ref();
const message = useMessage();
const formValue = ref({
    name: "",
    stu_id: "",
    id: "",
    phone: "",
});
const rules = ref({
    name: {
        required: true,
        message: "请输入姓名",
        trigger: "blur",
    },
    stu_id: {
        required: true,
        message: "请输入学号",
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
        trigger: ["input"],
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
    <n-form
        :model="formValue"
        :rules="rules"
        ref="formRef"
        style="margin: 10px auto 0"
    >
        <n-form-item label="姓名" path="name">
            <n-input v-model:value="formValue.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="学号" path="grade">
            <n-input placeholder="输入学号" v-model:value="formValue.stu_id" />
        </n-form-item>
        <n-form-item label="身份证号" path="grade">
            <n-input placeholder="输入身份证号" v-model:value="formValue.id" />
        </n-form-item>
        <n-form-item label="电话号码" path="phone">
            <n-input placeholder="电话号码" v-model:value="formValue.phone" />
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

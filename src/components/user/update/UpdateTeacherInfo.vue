<script setup lang="ts">
import Server from '../../../config/Server'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserData } from '../../../utility'
import axios, { AxiosResponse } from 'axios'
import { NForm, NSpace, NInput, NFormItem, NButton, NRadioGroup, NRadioButton, useMessage } from 'naive-ui'

const formRef = ref()
const message = useMessage()
const router = useRouter()
const userData = getUserData()

const formValue = ref({
  name: userData['name'],
  gender: userData['gender'],
  campus: userData['campus'],
  stu_id: userData['stu_id'],
  home: '身份证号',
  id: '',
  contact: {
    tel: userData['contact']['tel'],
    wechat: userData['contact']['wechat'],
    qq: userData['contact']['qq'],
  },
})

const rules = ref({
  name: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur',
  },
  gender: {
    required: true,
    message: '请选择性别',
  },
  stu_id: {
    required: true,
    message: '请输入学号',
    trigger: ['input', 'blur'],
  },
  campus: {
    required: true,
    message: '请选择校区',
    trigger: ['input', 'blur'],
  },
  home: {
    required: true,
    message: '请选择故乡',
    trigger: ['input', 'blur'],
  },
  id: {
    required: true,
    validator(_: any, value: any) {
      if (!value) {
        return new Error('请输入' + formValue.value.home)
      } else if (formValue.value.home == '身份证号') {
        if (
          !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
            value
          )
        ) {
          return new Error(formValue.value.home + '格式不正确')
        }
      } else if (formValue.value.home == '港澳身份证') {
        if (!/^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(value)) {
          return new Error(formValue.value.home + '格式不正确')
        }
      } else if (formValue.value.home == '台湾身份证') {
        if (!/^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(value)) {
          return new Error(formValue.value.home + '格式不正确')
        }
      } else if (formValue.value.home == '台湾身份证') {
        if (
          !/ ^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g|E|e]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/.test(
            value
          )
        ) {
          return new Error(formValue.value.home + '格式不正确')
        }
      }
      return true
    },
    trigger: ['input', 'blur'],
  },
  contact: {
    tel: {
      required: true,
      validator(rule: any, value: any) {
        if (!value) {
          return new Error('请输入电话号码')
        } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
          return new Error('手机号格式不正确')
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
    wechat: {
      required: false,
      message: '请输入微信号',
      trigger: ['input', 'blur'],
    },
    qq: {
      required: false,
      message: '请输入QQ号',
      trigger: ['input', 'blur'],
    },
  },
})

function goBack() {
  router.push('/info/user/showinfo')
}

function submit() {
  // 对数据进行检查
  formRef.value.validate((errors: any) => {
    if (!errors) {
      // 提交数据
      formValue.value.campus = Number(formValue.value.campus)
      formValue.value.gender = Number(formValue.value.gender)
      const submitStudentUrl = Server.urlPrefix + Server.apiMap['user']['update']
      axios
        .post(submitStudentUrl, formValue.value, {
          timeout: 3000,
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
        .then(function (response: AxiosResponse) {
          const responseData: any = response.data
          if (responseData['code'] == 200) {
            message.success('修改成功')
            setTimeout(() => router.push('/loading'), 1000) // 跳转到加载信息页面
          } else {
            message.error(responseData['msg']) // 报错信息
          }
        })
    } else {
      message.error('请正确输入数据')
    }
  })
}
</script>

<template>
  <n-form :model="formValue" :rules="rules" ref="formRef" style="margin: 10px auto 0">
    <n-form-item label="姓名" path="name">
      <n-input placeholder="请输入姓名" v-model:value="formValue.name" />
    </n-form-item>

    <n-form-item label="性别" path="gender">
      <n-radio-group v-model:value="formValue.gender">
        <n-radio-button :value="1">男</n-radio-button>
        <n-radio-button :value="2">女</n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="故乡" path="home">
      <n-radio-group v-model:value="formValue.home">
        <n-radio-button value="身份证号">内陆</n-radio-button>
        <n-radio-button value="港澳身份证">港澳</n-radio-button>
        <n-radio-button value="台湾身份证">台湾</n-radio-button>
        <n-radio-button value="护照">国际</n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="formValue.home" path="id">
      <n-input :placeholder="'请输入' + formValue.home" v-model:value="formValue.id" />
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

    <n-space :vertical="true" :size="25">
      <n-button class="update-info-button" @click="submit" attr-type="button" type="primary">提交</n-button>
      <n-button class="update-info-button" @click="goBack" attr-type="button"> 返回 </n-button>
    </n-space>
  </n-form>
</template>

<style>
.update-info-button {
  margin: auto;
  width: 100%;
}
</style>

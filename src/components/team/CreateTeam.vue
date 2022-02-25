<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'
import {
  FormInst,
  FormItemRule,
  FormRules,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NSpace,
  useMessage,
} from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Config from '../../config/Server'

let routeOptions = ref<SelectMixedOption[]>()
let formRef = ref<FormInst | null>(null)

const message = useMessage()
const router = useRouter()
const rules: FormRules = {
  name: {
    required: true,
    validator(rule: any, value: string) {
      if (!value) {
        return new Error('请输入团队名称')
      } else if (!/^[a-z0-9A-Z\u4e00-\u9fa5]+$/.test(value)) {
        return new Error('只能含有汉字，数字和英文字母')
      }
      return true
    },
    trigger: 'blur',
  },
  slogan: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('请输入口号')
      } else if (value.length > 35) {
        return new Error('口号请不要多于 35 字')
      } else if (!/^[a-z0-9A-Z\u4e00-\u9fa5]+$/.test(value)) {
        return new Error('只能含有汉字，数字和英文字母')
      }
      return true
    },
    trigger: 'blur',
  },
  password: {
    required: true,
    validator(rule: any, value: string) {
      if (!value) {
        return new Error('请输入团队密码')
      } else if (!/^[a-z0-9A-Z]+$/.test(value)) {
        return new Error('只能含有数字和英文字母')
      }
      return true
    },
    trigger: 'blur',
  },
  route: {
    required: true,
    message: '请选择一条路线',
    trigger: ['blur'],
  },
}
const allowMatchOptions = [
  {
    label: '是',
    value: '1',
  },
  {
    label: '否',
    value: '0',
  },
]
const formValue = ref({
  name: '',
  password: '',
  slogan: '',
  route: null,
  allow_match: '0',
})
const showModal = ref(false)

function onPositiveClick() {
  showModal.value = false
  createTeamAPI()
}
function onNegativeClick() {
  showModal.value = false
}

routeOptions.value = [
  {
    label: '朝晖全程',
    value: '1',
  },
  {
    label: '屏峰半程',
    value: '2',
  },
  {
    label: '屏峰全程',
    value: '3',
  },
  {
    label: '莫干山半程',
    value: '4',
  },
  {
    label: '莫干山全程',
    value: '5',
  },
]

routeOptions.value = [
  {
    label: '朝晖全程',
    value: '1',
  },
  {
    label: '屏峰半程',
    value: '2',
  },
  {
    label: '屏峰全程',
    value: '3',
  },
  {
    label: '莫干山半程',
    value: '4',
  },
  {
    label: '莫干山全程',
    value: '5',
  },
]

function createTeam() {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      if (formValue.value.allow_match == '1') {
        showModal.value = true
      } else {
        createTeamAPI()
      }
    } else {
      message.error('请正确输入数据')
    }
  })
}

function createTeamAPI() {
  const postData = {
    name: formValue.value.name,
    password: formValue.value.password,
    slogan: formValue.value.slogan,
    route: Number(formValue.value.route),
    allow_match: formValue.value.allow_match == '1' ? true : false,
  }
  const createTeamUrl = Config.urlPrefix + Config.apiMap['team']['create']
  axios
    .post(createTeamUrl, postData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      timeout: 3000,
    })
    .then(function (response: AxiosResponse) {
      const respData: any = response.data
      if (respData['code'] == 200) {
        // 队伍创建成功
        localStorage.setItem('team_id', respData['data']['team_id'])
        message.success('创建成功')
        setTimeout(() => router.push('/loading'))
      } else {
        message.error(respData['msg'])
      }
    })
    .catch(function (error) {
      message.error('请检查你的网络连接')
    })
}

function goBack() {
  router.push('/info/team/notjoin')
}
</script>

<template>
  <n-card title="📖 &nbsp 创建团队" embedded :bordered="false">
    <div style="margin-top: 15px">
      <n-form :model="formValue" :rules="rules" label-placement="top" ref="formRef">
        <n-form-item label="团队名称" path="name">
          <n-input placeholder="输入名称" v-model:value="formValue.name"></n-input>
        </n-form-item>

        <n-form-item label="团队口号" path="slogan">
          <n-input placeholder="输入口号" v-model:value="formValue.slogan"></n-input>
        </n-form-item>

        <n-form-item label="团队密码" path="password">
          <n-input placeholder="输入密码" v-model:value="formValue.password"></n-input>
        </n-form-item>

        <n-form-item label="是否接受随机队员">
          <n-select v-model:value="formValue.allow_match" :options="allowMatchOptions"></n-select>
        </n-form-item>

        <n-form-item label="路线选择" path="route">
          <n-select
            v-model:value="formValue.route"
            placeholder="请选择路线"
            :options="routeOptions"
          ></n-select>
        </n-form-item>

        <n-space :size="25" style="margin-top: 10px" :vertical="true">
          <n-button @click="createTeam" style="width: 100%" type="primary" attr-type="button"
            >创建团队</n-button
          >
          <n-button @click="goBack" style="width: 100%" attr-type="button">返回上一步</n-button>
        </n-space>

        <n-modal
          v-model:show="showModal"
          :mask-closable="false"
          :closable="false"
          preset="dialog"
          title="是否允许队员随机加入"
          content="随机队伍可能有更多小哥哥小姐姐，但也有可能来者不善，有密码泄露的风险，为了不打扰您的安宁，请考虑关闭此功能"
          positive-text="确认"
          @positive-click="onPositiveClick"
          negative-text="再想想"
          @negative-click="onNegativeClick"
        />
      </n-form>
    </div>
  </n-card>
</template>

<style></style>

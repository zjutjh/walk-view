<script setup lang="ts">
import { NTable, NPopover, NButton, NCard } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserData, parseCampus, parseGender } from '../../utility'

const router = useRouter()
const userData = ref(getUserData())

function jumpToUpdateStudentInfo() {
  router.push('/info/update/student')
}
</script>

<template>
  <n-card title="📖 &nbsp; 基本信息" embedded :bordered="false" size="small">
    <n-table :bordered="true" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item"><strong>姓名</strong></td>
          <td class="right-item">{{ userData['name'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>性别</strong></td>
          <td class="right-item">{{ parseGender(userData['gender']) }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>学院</strong></td>
          <td class="right-item">{{ userData['college'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>学号</strong></td>
          <td class="right-item">{{ userData['stu_id'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>校区</strong></td>
          <td class="right-item">{{ parseCampus(userData['campus']) }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <n-card title="☎️ &nbsp; 联系方式" embedded :bordered="false" size="small">
    <n-table :bordered="true" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item"><strong>电话</strong></td>
          <td class="right-item">{{ userData['contact']['tel'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>微信</strong></td>
          <td class="right-item">{{ userData['contact']['wechat'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>QQ</strong></td>
          <td class="right-item">{{ userData['contact']['qq'] }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <n-card title="📕 &nbsp; 剩余次数" embedded :bordered="false" size="small">
    <template #header-extra>
      <n-popover :width="200" placement="left" trigger="click">
        <template #trigger>
          <n-button size="small" round>帮助</n-button>
        </template>
        <span>
          为了防止有人频繁创建退出队伍，减轻服务器压力，我们加上了对于创建队伍和加入队伍的次数限制，请谅解
        </span>
      </n-popover>
    </template>
    <n-table :bordered="true" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item"><strong>创建团队</strong></td>
          <td class="right-item">{{ userData['create_op'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>加入团队</strong></td>
          <td class="right-item">{{ userData['join_op'] }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <n-button style="margin-top: 20px; width: 100%" type="primary" @click="jumpToUpdateStudentInfo"
    >修改信息</n-button
  >
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

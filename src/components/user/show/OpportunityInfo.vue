<script lang="ts" setup>
import { ref } from 'vue'
import { getUserData } from '../../../utility'
import { NCard, NTable, NPopover, NButton } from 'naive-ui'

const userData = ref(getUserData())
</script>

<template>
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

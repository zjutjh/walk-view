<script lang="ts" setup>
import { ref } from 'vue'
import { getUserData, parseGender, parseCampus } from '../../../utility'
import { NCard, NTable } from 'naive-ui'

const userData = ref(getUserData())
</script>

<template>
  <n-card title="📖 &nbsp; 基本信息" embedded :bordered="false" size="small">
    <n-table :bordered="true" style="margin-top: 10px" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item"><strong>姓名</strong></td>
          <td class="right-item">{{ userData['name'] }}</td>
        </tr>

        <tr>
          <td class="left-item"><strong>性别</strong></td>
          <td class="right-item">{{ parseGender(userData['gender']) }}</td>
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

<script lang="ts" setup>
import { ref } from 'vue'
import { getUserData } from '../../../utility'
import { NCard, NTable } from 'naive-ui';

const userData = ref(getUserData())
</script>

<template>
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

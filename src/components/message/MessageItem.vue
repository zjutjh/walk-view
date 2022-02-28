<script lang="ts" setup>
import { NCard, NButton } from 'naive-ui'
</script>

<template>
  <n-card id="message-item" title="加入通知" embedded>
    <template #header-extra>
      <n-button :type="'primary'" :size="'small'">朕已阅</n-button>
    </template>

    有个家伙刚才通过随机组队功能加入了你的团队, 请赶快联系
  </n-card>
</template>

<style>
#message-item {
  margin-bottom: 10px;
}
</style>

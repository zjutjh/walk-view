<script lang="ts" setup>
import { NCard, NButton } from 'naive-ui'

const props = defineProps<{
  id: number
  message: string
}>()

function deleteMessage() {
  console.log(props.id)
}
</script>

<template>
  <n-card id="message-item" title="系统通知" embedded>
    <template #header-extra>
      <n-button :type="'primary'" :size="'small'" @click="deleteMessage">朕已阅</n-button>
    </template>

    {{ message }}
  </n-card>
</template>

<style>
#message-item {
  margin-bottom: 10px;
}
</style>

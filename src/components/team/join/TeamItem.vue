<script lang="ts" setup>
import { NThing, NTag, NButton } from 'naive-ui'

defineProps<{
  teamId: number
  name: string
  slogan: string
  num: number
}>()
</script>

<template>
  <div id="team-container">
    <n-thing>
      <template #header>{{ name }}</template>

      <template #header-extra>
        <n-tag type="success" :size="'small'"> {{ num }}人 </n-tag>
      </template>

      <template #description>
        {{ slogan }}
      </template>

      <template #action>
        <n-button :type="'primary'" id="join-button" ghost>申请加入</n-button>
      </template>
    </n-thing>
  </div>
</template>

<style>
#team-container {
  border-bottom: thin solid #dadada;
  margin-bottom: 10px;
  padding-bottom: 13px;
  padding-left: 10px;
  padding-right: 15px;
}

#join-button {
  width: 100%;
}
</style>

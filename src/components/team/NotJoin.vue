<script setup lang="ts">
import { NEmpty, NButton, NSpace } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

function jumpToJoin() {
  router.push('/info/team/join');
}

function jumpToCreate() {
  router.push('/info/team/create');
}
</script>

<template>
  <n-empty style="margin-top: 60px" size="large" description="尚未加入团队">
    <template #extra>
      <n-space :size="30" justify="center">
        <n-button
          @click="jumpToJoin"
          type="primary"
          style="margin-top: 40px; margin-bottom: 20px"
          size="small"
          >加入一个</n-button
        >
        <n-button
          @click="jumpToCreate"
          style="margin-top: 40px; margin-bottom: 20px"
          size="small"
          >创建一个</n-button
        >
      </n-space>
    </template>
  </n-empty>
</template>

<style></style>

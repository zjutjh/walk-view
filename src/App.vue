<script setup lang="ts">
import { NDialogProvider, NMessageProvider } from 'naive-ui';
import { RouterView } from 'vue-router';
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view></router-view>
    </n-dialog-provider>
  </n-message-provider>
</template>

<style></style>

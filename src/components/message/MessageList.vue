<script lang="ts" setup>
import { NScrollbar } from 'naive-ui'
import MessageItem from './MessageItem.vue';
</script>

<template>
  <n-scrollbar style="max-height: 550px"> 
    <message-item></message-item>

    <message-item></message-item>

    <message-item></message-item>

    <message-item></message-item>

    <message-item></message-item>
  </n-scrollbar>
</template>

<style></style>

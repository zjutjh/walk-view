<script lang="ts" setup>
import MessageItem from './MessageItem.vue'

const messageData: any = JSON.parse(localStorage.getItem('message_data') as string)
const messageList = messageData['messages']
</script>

<template>
  <message-item
    v-for="message in messageList"
    :id="message['id']"
    :message="message['message']"
  ></message-item>
</template>

<style></style>

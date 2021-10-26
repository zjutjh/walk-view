<script setup lang="ts">
import { NMessageProvider, NCard } from 'naive-ui'
import SubmitUserInfo from "/src/components/user/SubmitUserInfo.vue";

</script>

<template>
    <n-message-provider>
        <n-card title="报名信息 &nbsp; 💻" style="margin: 4% auto; width: 93%;">
            <submit-user-info></submit-user-info>
        </n-card>
    </n-message-provider>
</template>

<style>
</style>

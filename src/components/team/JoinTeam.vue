<script setup lang="ts">
import { NCard, NInput, NButton } from 'naive-ui';
</script>

<template>
    <n-card title="🏊 &nbsp;&nbsp;通过团队码加入团队" :embedded="true" :bordered="false">
        <n-input type="text" placeholder="输入你的团队码" />
        
        <n-button style="margin-top: 25px;width: 100%;" type="primary">查找团队</n-button>
    </n-card>
</template>

<style>
</style>
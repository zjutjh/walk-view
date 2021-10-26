<script setup lang="ts">
import { RouterView } from "vue-router";
import { NMessageProvider, NLoadingBarProvider } from "naive-ui";
</script>

<template>
    <n-loading-bar-provider>
        <n-message-provider>
            <router-view></router-view>
        </n-message-provider>
    </n-loading-bar-provider>
</template>

<style></style>

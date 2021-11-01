<script setup lang="ts">
import Loading from "/src/pages/Loading.vue"
import { NDialogProvider } from "naive-ui";
import { RouterView } from "vue-router";
</script>

<template>
    <n-dialog-provider>
        <router-view></router-view>
    </n-dialog-provider>
</template>

<style>
</style>

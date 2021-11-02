<script setup lang="ts">
import { NTable, NButton } from 'naive-ui';

function jumpToSubmitUserInfo() {

}
</script>

<template>
    <n-table :bordered="true" style="margin-top: 10px;" :single-line="false">
        <tbody>
            <tr>
                <td class="left-item">
                    <strong>姓名</strong>
                </td>
                <td class="right-item">Node Sans</td>
            </tr>

            <tr>
                <td class="left-item">
                    <strong>学号</strong>
                </td>
                <td class="right-item">20200334011</td>
            </tr>

            <td class="left-item">
                <strong>电话</strong>
            </td>

            <td class="right-item">1776956288</td>
        </tbody>
    </n-table>

    <n-button
        style="margin-top: 20px;  width: 100%;"
        type="primary"
        @click="jumpToSubmitUserInfo"
    >修改信息</n-button>
</template>

<style>
.left-item {
    text-align: center;
    width: 40%;
}
.right-item {
    text-align: center;
}
.right-teammate-item {
    text-align: center;
}
</style>
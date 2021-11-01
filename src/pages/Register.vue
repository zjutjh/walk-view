<script setup lang="ts">
import { NMessageProvider, NCard, NTabs, NTabPane, } from 'naive-ui'
import SubmitStudentInfo from "/src/components/user/SubmitStudentInfo.vue";
import SubmitTeacherInfo from "/src/components/user/SubmitTeacherInfo.vue";
</script>

<template>
    <n-message-provider>
        <n-card title="报名信息 &nbsp; 💻" style="margin: 4% auto; width: 93%;">
            <n-tabs default-value="student">
                <n-tab-pane name="student" tab="学生报名">
                    <submit-student-info></submit-student-info>
                </n-tab-pane>

                <n-tab-pane name="teacher" tab="教职工报名">
                    <submit-teacher-info></submit-teacher-info>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </n-message-provider>
</template>

<style>
</style>

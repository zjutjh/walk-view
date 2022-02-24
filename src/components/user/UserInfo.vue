<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { isTeacher } from '../../utility'
import ContactInfo from './ContactInfo.vue'
import OpportunityInfo from './OpportunityInfo.vue'
import StudentBasicInfo from './StudentBasicInfo.vue'
import TeacherBasicInfo from './TeacherBasicInfo.vue'

const router = useRouter()

function jumpToUpdateInfo() {
  if (isTeacher()) {
    router.push('/info/update/teacher')
  } else {
    router.push('/info/update/student')
  }
}
</script>

<template>
  <student-basic-info v-if="!isTeacher()"></student-basic-info>

  <teacher-basic-info v-if="isTeacher()"></teacher-basic-info>

  <contact-info></contact-info>

  <opportunity-info></opportunity-info>

  <n-button style="margin-top: 20px; width: 100%" type="primary" @click="jumpToUpdateInfo">修改信息</n-button>
</template>

<style>
.left-item {
  text-align: center;
  width: 34%;
}
.right-item {
  text-align: center;
}
.right-teammate-item {
  text-align: center;
}
</style>

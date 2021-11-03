<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import MemberMemberCard from './ManageMemberCard.vue';
import { useRouter } from 'vue-router';

// Vue router 对象
const router = useRouter()

// 团队数据
const teamData = ref(JSON.parse(<string>localStorage.getItem("team_data")))

function goBack() {
    router.replace('/info/team/teaminfo')
}
</script>

<template>
    <member-member-card
        style="margin-top: 15px;"
        v-for="member in teamData['member']"
        :name="member['name']"
        :tel="member['contact']['tel']"
        :open-id="member['open_id']"
    >
    </member-member-card>

    <n-button @click="goBack" style="width: 100%; margin-top: 18px;">返回上一步</n-button>
</template>

<style>
</style>
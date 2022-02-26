<script lang="ts" setup>
import { NCard, NScrollbar, NEmpty, NSpin } from 'naive-ui'
import { computed, ref } from 'vue'
import TeamItem from './TeamItem.vue'

const props = defineProps<{
  randomTeamList: any
  isWaiting: boolean
}>()

const hasResult = computed(() => {
  if (props.randomTeamList == null) return false
  else return true
})
</script>

<template>
  <n-card id="list-card-border" :size="'small'">
    <n-empty id="empty-state" v-if="!hasResult && !isWaiting" size="large" description="没有结果" />

    <n-scrollbar v-if="hasResult && !isWaiting" style="max-height: 380px">
      <team-item
        v-for="team in randomTeamList['teams']"
        :team-id="team['id']"
        :name="team['name']"
        :slogan="team['slogan']"
        :num="team['num']"
      />
    </n-scrollbar>

    <div v-if="isWaiting" id="loading-state">
      <n-spin :size="'large'"/>
      <div id="loading-text">加载中</div>
    </div>
  </n-card>
</template>

<style>
#empty-state {
  margin-top: 30px;
  margin-bottom: 20px;
}

#loading-state {
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
}

#loading-text {
  color: rgb(139, 139, 139);
  font-size: small;
  margin-top: 30px;
}
</style>

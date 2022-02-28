<script lang="ts" setup>
import { NCard, NScrollbar, NEmpty, NSpin } from 'naive-ui'
import { computed } from 'vue'
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
  <div>
    <n-empty id="empty-state" v-if="!hasResult && !isWaiting" size="large" description="没有结果" />

    <team-item
      v-if="hasResult && !isWaiting"
      v-for="team in randomTeamList['teams']"
      :team-id="team['id']"
      :name="team['name']"
      :slogan="team['slogan']"
      :num="team['num']"
    />

    <div v-if="isWaiting" id="loading-state">
      <n-spin :size="'large'" />
      <div id="loading-text">加载中</div>
    </div>
  </div>
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

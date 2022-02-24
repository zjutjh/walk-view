<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { NTable, NTag, NSpace, NCard } from 'naive-ui';
const props = defineProps({
  name: String,
  isLeader: Boolean,
  tel: String,
  qq: String,
  campus: Number,
  wechat: String,
});

const qqStr = computed(() => {
  const qqStr = props.qq;
  if (qqStr == '') return '无';
  else return qqStr;
});
const wechatStr = computed(() => {
  const wechatStr = props.wechat;
  if (wechatStr == '') return '无';
  else return wechatStr;
});

const campusName = computed(() => {
  if (props.campus == 1) return '朝晖';
  else if (props.campus == 2) return '屏峰';
  else if (props.campus == 3) return '莫干山';
});
</script>

<template>
  <n-card
    :segmented="{
      content: 'soft',
    }"
    :title="'&nbsp;&nbsp;&nbsp;' + name"
    size="small"
  >
    <template #header-extra>
      <n-space>
        <n-tag
          v-if="campus == 5"
          style="margin-right: 10px"
          size="small"
          type="success"
          >教职工</n-tag
        >
        <n-tag v-else style="margin-right: 10px" size="small" type="warning">{{
          campusName
        }}</n-tag>
        <n-tag
          v-if="isLeader"
          style="margin-right: 10px"
          size="small"
          type="success"
          >队长</n-tag
        >
        <n-tag v-else style="margin-right: 10px" size="small" type="warning"
          >队员</n-tag
        >
      </n-space>
    </template>

    <n-table :bordered="false" :single-line="true">
      <tbody>
        <tr>
          <td>电话</td>
          <td style="text-align: right">{{ tel }}</td>
        </tr>
        <tr>
          <td>QQ</td>
          <td style="text-align: right">{{ qqStr }}</td>
        </tr>
        <tr>
          <td>微信</td>
          <td style="text-align: right">{{ wechatStr }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

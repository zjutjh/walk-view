<script setup lang="ts">
import { NTable, NPopover, NButton, NCard } from 'naive-ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 从本地缓存中读取用户信息
const name = ref(localStorage.getItem('name'));
const gender = computed(() =>
  localStorage.getItem('gender') == '1' ? '男' : '女'
);
const tel = ref(localStorage.getItem('tel'));
const qq = computed(() => {
  const qqStr = localStorage.getItem('qq');
  if (qqStr == '') return '无';
  else return qqStr;
});
const wechat = computed(() => {
  const wechatStr = localStorage.getItem('wechat');
  if (wechatStr == '') return '无';
  else return wechatStr;
});
const joinOp = ref(localStorage.getItem('join_op'));
const createOp = ref(localStorage.getItem('create_op'));

function jumpToUpdateTeacherInfo() {
  router.replace('/update/teacher');
}
</script>

<template>
  <n-card title="📖 &nbsp; 基本信息" embedded :bordered="false" size="small">
    <n-table :bordered="true" style="margin-top: 10px" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item">
            <strong>姓名</strong>
          </td>
          <td class="right-item">{{ name }}</td>
        </tr>

        <tr>
          <td class="left-item">
            <strong>性别</strong>
          </td>
          <td class="right-item">{{ gender }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <n-card title="☎️ &nbsp; 联系方式" embedded :bordered="false" size="small">
    <n-table :bordered="true" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item">
            <strong>电话</strong>
          </td>
          <td class="right-item">{{ tel }}</td>
        </tr>

        <tr>
          <td class="left-item">
            <strong>微信</strong>
          </td>
          <td class="right-item">{{ wechat }}</td>
        </tr>

        <tr>
          <td class="left-item">
            <strong>QQ</strong>
          </td>
          <td class="right-item">{{ qq }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <n-card title="📕 &nbsp; 剩余次数" embedded :bordered="false" size="small">
    <template #header-extra>
      <n-popover :width="200" placement="left" trigger="click">
        <template #trigger>
          <n-button size="small" round>帮助</n-button>
        </template>
        <span
          >为了防止有人频繁创建退出队伍，减轻服务器压力，我们加上了对于创建队伍和加入队伍的次数限制，请谅解</span
        >
      </n-popover>
    </template>
    <n-table :bordered="true" :single-line="false">
      <tbody>
        <tr>
          <td class="left-item">
            <strong>创建团队</strong>
          </td>
          <td class="right-item">{{ createOp }}</td>
        </tr>

        <tr>
          <td class="left-item">
            <strong>加入团队</strong>
          </td>
          <td class="right-item">{{ joinOp }}</td>
        </tr>
      </tbody>
    </n-table>
  </n-card>

  <n-button
    style="margin-top: 20px; width: 100%"
    type="primary"
    @click="jumpToUpdateTeacherInfo"
    >修改信息</n-button
  >
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

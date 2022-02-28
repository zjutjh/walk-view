<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui'

import PasswordJoin from './PasswordJoin.vue'
import RandomMatch from './RandomJoin.vue'
</script>

<template>
  <n-collapse style="margin-top: 15px" default-expanded-names="1" arrow-placement="right" accordion>
    <n-collapse-item title="🏊 &nbsp;&nbsp;通过团队密码加入团队" name="1">
      <password-join></password-join>
    </n-collapse-item>
    <n-collapse-item title="🙈 &nbsp;&nbsp;随机加入" name="2">
      <random-match></random-match>
    </n-collapse-item>
  </n-collapse>
</template>

<style></style>
